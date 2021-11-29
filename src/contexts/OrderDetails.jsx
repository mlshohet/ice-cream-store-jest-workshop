import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { pricePerItem } from '../constants';
import { formatCurrency } from '../utils';

const OrderDetails = createContext();

// create custom hook that checks if inside a Provider

export const useOrderDetails = () => {
	const context = useContext(OrderDetails);

	if(!context) {
		throw new Error('useOrderDetails must be used inside a provider');
	}

	return context;
};

// util fucntion to calc the totals
// uses Maps

const calculateSubtotal = (optionType, optionCounts) => {
	let optionCount = 0;
	for(const count of optionCounts[optionType].values()) {
		optionCount += count;
	}

	return optionCount * pricePerItem[optionType];
}

export const OrderDetailsProvider = props => {
	const [optionCounts, setOptionCounts] = useState({
		scoops: new Map(),
		toppings: new Map(),
	});
	const zeroCurrency = formatCurrency(0);

	const [totals, setTotals] = useState({
		scoopsSubtotal: zeroCurrency,
		toppingsSubtotal: zeroCurrency,
		grandTotal: zeroCurrency,
	});

	useEffect(() => {
		const scoopsSubtotal = calculateSubtotal("scoops", optionCounts);
		const toppingsSubtotal = calculateSubtotal("toppings", optionCounts);
		const grandTotal = scoopsSubtotal + toppingsSubtotal;
		setTotals({
			scoops: formatCurrency(scoopsSubtotal),
			toppings: formatCurrency(toppingsSubtotal),
			grandTotal: formatCurrency(grandTotal),
		});
	}, [optionCounts]);

	const value = useMemo(() => {
		// getter: object containing option counts for scoops and toppings
		// and the subtotals and totals
		//setter: update option count

		const updateItemCount = (itemName, newItemCount, optionType) => {
			const newOptionCounts = { ...optionCounts };

			// update option counts for this item
			const optionCountsMap = optionCounts[optionType];
			optionCountsMap.set(itemName, parseInt(newItemCount));

			setOptionCounts(newOptionCounts);
		}

		const resetOrder = (totals) => {
			setOptionCounts({ scoops: new Map(), toppings: new Map() });
			setTotals({ 
				scoopsSubtotal: zeroCurrency,
				toppingsSubtotal: zeroCurrency,
				grandTotal: zeroCurrency,
			});
		}

		return [{ ...optionCounts , totals }, updateItemCount, resetOrder];
	}, [optionCounts, totals, zeroCurrency]);

	return <OrderDetails.Provider value={value} { ...props } />
}