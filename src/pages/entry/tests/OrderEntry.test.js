import { render, screen, waitFor } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
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

test('Order button disabled when there are 0 scoops', async () => {
	render(<OrderEntry setOrderPhase={jest.fn()}/>);

	await waitFor (async () => {
		const orderButton = await screen.findByRole("button", { name: /place your order/i });
		//console.log(orderButton);
		expect(orderButton).toBeInTheDocument();
		expect(orderButton).toBeDisabled();

		// find Vanilla scoop and set it to 1
		const vanillaScoop = await screen.findByRole("spinbutton", { name: "Vanilla" });
		userEvent.clear(vanillaScoop);
		userEvent.type(vanillaScoop, '1');
		expect(orderButton).not.toBeDisabled();

		//set Vanilla scoop back to 0
		userEvent.clear(vanillaScoop);
		userEvent.type(vanillaScoop, '0');
		expect(orderButton).toBeDisabled();
	});

	// await for the scoop heading to load
	await screen.findByRole("heading", { name: /scoops/i });
});

test('total does not update on invalid input', async () => {
	render(<OrderEntry setOrderPhase={jest.fn()}/>);

	//giving invalid input of -1 scoops
	const vanillaScoop = await screen.findByRole("spinbutton", { name: "Vanilla" });
	userEvent.clear(vanillaScoop);
	userEvent.type(vanillaScoop, "-1");

	//checking if total did not update
	const grandTotal = await screen.findByText(/grand total: /i, { exact: false });
	expect(grandTotal).toHaveTextContent("0.00");
});




