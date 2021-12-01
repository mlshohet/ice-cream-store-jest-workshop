import SummaryForm from './SummaryForm';
import { useOrderDetails } from '../../contexts/OrderDetails';

const OrderSummary = ({ setOrderPhase }) => {
	const [orderDetails, , resetOrder] = useOrderDetails();

	const scoops = orderDetails.scoops;
	const toppings = orderDetails.toppings;
	const total = orderDetails.grandTotal;

	const scoopsArr = Array.from(scoops);
	return (
		<div>
			<ul>
			<h1>Scoops:</h1>
			{
				scoopsArr.map(item => 
					<li key={item[0]}>
						{item[0]} - {item[1]}
					</li>
				)
			}
			{
				toppings.size !== 0 && <h1>Toppings</h1>
			}
			</ul>
			<SummaryForm setOrderPhase={setOrderPhase} resetOrder={resetOrder}/>
		</div>
	)
};

export default OrderSummary;