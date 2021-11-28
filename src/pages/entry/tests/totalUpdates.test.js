import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
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





