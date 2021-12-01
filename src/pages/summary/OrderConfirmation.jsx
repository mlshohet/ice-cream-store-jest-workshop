import { useState, useEffect } from 'react';
import axios from 'axios';
import AlertBanner from '../common/AlertBanner';

const OrderConfirmation = ({ setOrderPhase }) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(false);

	useEffect(() => {
		axios.post('http://localhost:3030/order')
		.then(response => setData(response.data))
		.catch(err => setError(true));
	}, []);

	if (error) {
		return <AlertBanner />
	}

	return data ? (
			<div style={{ margin: "50px", textAlign: "center" }}>
				<h1>Thank you!</h1>
				<h2>Your order number is {data.orderNumber}</h2>
				<button onClick={setOrderPhase}>
					Create new order
				</button>
			</div> 
		) : <div><h1>Loading...</h1></div>
};

export default OrderConfirmation;