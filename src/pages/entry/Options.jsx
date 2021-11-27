import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';
import AlertBanner from '../common/AlertBanner';
import Row from 'react-bootstrap/Row';

const Options = ({ optionType }) => {
	const [items, setItems] = useState([]);
	const [error, setError] = useState(false);

	// optionType is 'scoops' or 'toppings'
	useEffect(() => {
		axios.get(`http://localhost:3030/${optionType}`)
		.then(response => setItems(response.data))
		.catch(err => setError(true));
	}, [optionType]);

	if (error) {
		return <AlertBanner />
	};

	const ItemComponent = optionType === 'scoops' 
		? ScoopOption
		: ToppingOption;

	const optionItems = items.map(item => 
		<ItemComponent
			key={item.name}
			name={item.name}
			imagePath={item.imagePath}
		/>
	)
	return <Row>
		{ optionItems }
	</Row>
}

export default Options;