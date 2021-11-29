import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import OrderEntry from './pages/entry/OrderEntry';
import OrderSummary from './pages/summary/OrderSummary';
import OrderConfirmation from './pages/summary/OrderConfirmation';
import { OrderDetailsProvider } from './contexts/OrderDetails';

function App() {
	const [orderPhase, setOrderPhase] = useState(3);

	return (
	    <Container>
	      <OrderDetailsProvider >
	        {orderPhase === 3 && <OrderEntry setOrderPhase={() => setOrderPhase(1)} />}
	        {orderPhase === 1 && <OrderSummary setOrderPhase={() => setOrderPhase(2)} />}
	        { orderPhase === 2 && <OrderConfirmation setOrderPhase={() => setOrderPhase(3)} /> }
	      </OrderDetailsProvider>
	     
	    </Container>
    );
}

export default App;
