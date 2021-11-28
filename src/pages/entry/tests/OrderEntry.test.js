import { render, screen, waitFor } from '../../../test-utils/testing-library-utils';
import OrderEntry from '../OrderEntry';
// These are imported to override handlers to test errors
import { rest } from 'msw';
import { server } from '../../../mocks/server';

test('errors for scoops and toppings routes', async () => {
	// Overiding the mock call to cause an error
	server.resetHandlers(
		rest.get('http://localhost:3030/scoops', (req, res, ctx) => 
			res(ctx.status(500))
		),
		rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
			res(ctx.status(500))
		)
	);

	//render the component
	render(<OrderEntry />);

	// Alerts are async. They come from the axios promise
	
	await waitFor(async () => {
		const alerts = await screen.findAllByRole('alert');

		// Check how many alerts are there
		expect(alerts).toHaveLength(2);
	});
});




