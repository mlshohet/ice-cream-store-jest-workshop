import Options from './Options';
import { useOrderDetails } from '../../contexts/OrderDetails';

const OrderEntry = ({ setOrderPhase }) => {
	const [orderDetails] = useOrderDetails();

	const total = orderDetails.totals.grandTotal;

	return (
		<div>
			<Options optionType="scoops" />
			<Options optionType="toppings" />
			<h2 style={{ margin: '50px 0 50px 0' }}>
				Grand total: {total}
			</h2>
			<button onClick={ setOrderPhase }>
				Place your order
			</button>
		</div>
	);
}

export default OrderEntry;