import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';

test('update scoop subtotal when scoops change', async () => {
	render(<Options optionType="scoops" />);

	// total should start at $0.0
	const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
	expect(scoopsSubtotal).toHaveTextContent('0.00');

	//update vanilla scoop to 1 and check the subtotal
	const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
	userEvent.clear(vanillaInput);
	userEvent.type(vanillaInput, '1');
	expect(scoopsSubtotal).toHaveTextContent('2.00');

	//update chocolate scoops to 2 and check the subtotal
	const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });
	userEvent.clear(chocolateInput);
	userEvent.type(chocolateInput, '2');
	expect(scoopsSubtotal).toHaveTextContent('6.00');
});

test('update topping subtotals when topings are chosen', async () => {
	render(<Options optionType="toppings" />);

	//total should start at 0
	const toppingsSubtotal = screen.getByText('Toppings total: $', { exact: false });
	expect(toppingsSubtotal).toHaveTextContent('0.00');

	// add cherries and check subtotal
	const cherriesCheckbox = await screen.findByRole('checkbox', { name: "Cherries" });
	userEvent.click(cherriesCheckbox);
	expect(toppingsSubtotal).toHaveTextContent('1.50');

	//add hot fudge and check subtotal
	const hotFudgeCheckbox = await screen.findByRole('checkbox', { name: "Hot fudge" });
	userEvent.click(hotFudgeCheckbox);
	expect(toppingsSubtotal).toHaveTextContent('3.00');

	//remove hot fudge and check subtotal
	userEvent.click(hotFudgeCheckbox);
	expect(toppingsSubtotal).toHaveTextContent('1.50');
});

describe('grand total', () => {
	test('grand total updates properly if scoop is added', async () => {
		//render(<Options optionType="scoops" />);
		render(<OrderEntry />);

		const grandTotal = await screen.findByRole('heading', { name: /grand total: \$/i });

		// check if grand total is initially 0
		expect(grandTotal).toHaveTextContent('0.00');
		
		const vanillaScoopInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });

		// simulate user event for vanilla scoop

		userEvent.clear(vanillaScoopInput);
		userEvent.type(vanillaScoopInput, '1');

		// check the grand total
		expect(grandTotal).toHaveTextContent('2.00');
	});

	test('grand total updates properly if topping is added', async () => {
		render(<OrderEntry />);

		const grandTotal = await screen.findByRole('heading', { name: /grand total: \$/i });
		const toppingCherriesInput = await screen.findByRole('checkbox', { name: "Cherries" });

		// simulate user event for topping
		userEvent.click(toppingCherriesInput);

		// check the grand total
		expect(grandTotal).toHaveTextContent("1.50");
	});
	
	test('grand total updates properly if topping is added first', async () => {
		render(<OrderEntry />);
		
		const grandTotal = await screen.findByRole('heading', { name: /grand total: \$/i });

		// find all scoop inputs
		const allScoopInputs = await screen.findAllByRole('spinbutton');
	
		//set to default value
		allScoopInputs.forEach(scoopInput => {
			scoopInput.value = 0;
		});

		const toppingCherriesInput = await screen.findByRole('checkbox', { name: "Cherries" });
		
		
		//find a topping and select it
		
		userEvent.click(toppingCherriesInput);

		//check grand total
		expect(grandTotal).toHaveTextContent('1.50');
	});
	
	test('grand total updates properly if item is removed', async () => {
		render(<OrderEntry />);

		const grandTotal = await screen.findByRole('heading', { name: /grand total: \$/i });

		const vanillaScoop = await screen.findByRole('spinbutton', { name: "Vanilla" });
		const cherriesTopping = await screen.findByRole('checkbox', { name: "Cherries" });

		// simulate user input for adding vanilla scoop and cherries topping

		userEvent.clear(vanillaScoop);
		userEvent.type(vanillaScoop, '1');
		userEvent.click(cherriesTopping);

		expect(grandTotal).toHaveTextContent('3.50');

		// uncheck the cherries topping
		userEvent.click(cherriesTopping);

		expect(grandTotal).toHaveTextContent('2.00');

	});
});





