import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('order phases for happy path', async () => {
	//render app
	render(<App />);

	// add ice cream scoops and toppings
	const vanillaScoop = await screen.findByRole('spinbutton', { name: "Vanilla" });
	//const cherryTopping = await screen.findByRole('checkbox', { name: "Cherries" });

	userEvent.clear(vanillaScoop);
	userEvent.type(vanillaScoop, '2');
	//userEvent.click(cherryTopping);

	// find and click order button on order entry page

	const orderButton = await screen.findByRole('button', { name: "Place your order" });

	userEvent.click(orderButton);

	// check if summary info is correct based on order

	const scoopsSection = await screen.findByRole('heading', { name: /scoops/i});
	expect(scoopsSection).toBeInTheDocument();
	const toppingsSection = await screen.queryByRole('heading',{ name: /toppings/i });
	expect(toppingsSection).not.toBeInTheDocument();

	// accept terms and conditions and click button to confirm order
	const checkbox = await screen.findByRole('checkbox', { name: "I agree to Terms and Conditions" });
	const confirmButton = await screen.findByRole('button', { name: "Confirm order" });
	userEvent.click(checkbox);
	expect(checkbox).toBeChecked();
	userEvent.click(confirmButton);

	// check if Loading shows up and is gone
	
	const loadingText = await screen.findByRole('heading', { name: /loading.../i });
	expect(loadingText).toBeInTheDocument();

	//check if it's gone

	const thankYouHeader = await screen.findByRole('heading', { name: /thank you!/i});
	expect(thankYouHeader).toBeInTheDocument();
	

	const notLoading = await screen.queryByText(/loading.../i);
	expect(notLoading).not.toBeInTheDocument();

	// confirm order numer on confirmation page

	await waitFor( async() => {
		const orderNumber = await screen.getByText("Your order number is 123456");
	});

	// click new order button on confirmation page
	const newOrderButton = await screen.findByRole('button', { name: "Create new order" });
	userEvent.click(newOrderButton);

	// check if scoops and toppings subtotals have been reset
	const allScoops = await screen.findAllByRole("spinbutton");
	const allToppings = await screen.findAllByRole("checkbox");

	allScoops.map(item => expect(item).toHaveTextContent(""));
	allToppings.map(item => expect(item).not.toBeChecked());

	// do we need to await anything to avoid test errors?
});







