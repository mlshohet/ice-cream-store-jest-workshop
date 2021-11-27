import React from 'react';
import Col from 'react-bootstrap/Col';

const ToppingOption = ({ name, imagePath }) => {
	return (
		<Col xs={12} md={6} sm={4} lg={3} style={{ textAlign: 'center' }} >
			{<img 
				src={`http://localhost:3030${imagePath}`} 
				alt={`${name} topping`}
				style={{width: '75%'}}
			/>}
		</Col>
	);
}

export default ToppingOption;