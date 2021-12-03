import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const ScoopOption = ({ name, imagePath, updateItemCount }) => {
	const [inputValid, setInputValid] = useState(true);

	const handleChange = (event) => {
		event.preventDefault();
		updateItemCount(name, event.target.value);

		const currentValueFloat = parseFloat(event.target.value);
		const valid = currentValueFloat >= 0 && 
			currentValueFloat <= 10 &&
			Math.floor(currentValueFloat) === currentValueFloat;

		setInputValid(valid);
	}

	return (
		<Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
			<img
				src={`http://localhost:3030${imagePath}`}
				alt={`${name} scoop`}
				style={{width: '75%'}}
			/>
			<Form.Group
				controlId={`${name}-count`}
				as={Row}
				style={{marginTop: '10px'}}
			>
				<Form.Label
					column xs="6"
					style={{ textAlign: 'right' }}
				>
					{name}
				</Form.Label>
				<Col xs="5" style={{ textAlign: 'left' }}>
					<Form.Control
						isInvalid={!inputValid}
						type="number"
						defaultValue={0}
						onChange={handleChange}
					/>
				</Col>
			</Form.Group>
		</Col>
	);
}

export default ScoopOption;