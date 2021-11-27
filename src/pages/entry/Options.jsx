import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScoopOption from './ScoopOption';
import Row from 'react-bootstrap/Row';

const Options = ({ optionType }) => {
	const [items, setItems] = useState([]);
	// optionType is 'scoops' or 'toppings'
	useEffect(() => {
		axios.get(`http://localhost:3030/${optionType}`)
		.then(response => setItems(response.data))
		.catch(err => {
			throw new Error(err.message)
		});
	}, [optionType]);

	// TODO: replace `null` with ToppingOption
	const ItemComponent = optionType === 'scoops' 
		? ScoopOption
		: null;

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