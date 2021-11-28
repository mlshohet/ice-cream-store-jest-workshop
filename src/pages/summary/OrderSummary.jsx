import { useOrderDetails } from '../../contexts/OrderDetails';

const OrderSummary = () => {
	const [orderDetails] = useOrderDetails();

	const total = orderDetails.totals.grandTotal;

	return (
		<h2>Grand total: {total}</h2>
	);
};

export default OrderSummary;