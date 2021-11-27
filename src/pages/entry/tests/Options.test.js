import { render, screen } from '@testing-library/react';
import Options from '../Options';
import ScoopOptions from '../ScoopOptions';

test('displays image for each scoop option from server', () => {
	render(<Options optionType=""scoops />);

	// Find all images
	const scoopImages = screen.getAllByRole('img', { name: /scoop$/i });
	expect(scoopImages).toHaveLength(2);

	// Confirm alt text of images
	const altText = scoopImages.map(element => element.alt);
	//Mutable types have to use toEqual, not toBe
	expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
})

