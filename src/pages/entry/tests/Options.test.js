import { render, screen } from '@testing-library/react';
import Options from '../Options';

test('displays image for each scoop option from server', async () => {
	render(<Options optionType="scoops" />);

	// Find all images for scoop
	const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
	expect(scoopImages).toHaveLength(2);

	// Confirm alt text of images
	const altText = scoopImages.map(element => element.alt);
	//Mutable types have to use toEqual, not toBe
	expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('display of images for each topping option from server', async () => {
	render(<Options optionType="toppings" />);

	//Find all images for topping options
	const toppingImages = await screen.findAllByRole('img', { name: /topping$/i });
	expect(toppingImages).toHaveLength(3);

	//Confirm alt text of images
	const altText = toppingImages.map(element => element.alt);
	expect(altText).toEqual(
		[
			'Cherries topping',
			'M&Ms topping',
			'Hot fudge topping',
		]
	);
});

