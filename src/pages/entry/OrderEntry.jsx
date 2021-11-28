import Options from './Options';
import OrderSummary from '../summary/OrderSummary';

const OrderEntry = () => {

	return (
		<div>
			<Options optionType="scoops" />
			<Options optionType="toppings" />
			<OrderSummary />
		</div>
	);
}

export default OrderEntry;