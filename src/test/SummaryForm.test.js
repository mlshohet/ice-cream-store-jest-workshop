import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SummaryForm from '../pages/summary/SummaryForm';

test("if checkbox is unchecked by default", () => {
	render(<SummaryForm />);
	
	const checkbox = screen.getByRole("checkbox", { name: "I agree to Terms and Conditions"});
	expect(checkbox).not.toBeChecked();
	const submitButton = screen.getByRole("button", { name: "Confirm order"});
	expect(submitButton).toBeDisabled();
});

test("if checking checkbox enables the button and checking again disables the button", () => {
	render(<SummaryForm />);

	const checkbox = screen.getByRole("checkbox", { name: "I agree to Terms and Conditions"});
	const submitButton = screen.getByRole("button", { name: "Confirm order" });

	// check if button enabled after first check
	userEvent.click(checkbox);
	expect(checkbox).toBeChecked();
	expect(submitButton).not.toBeDisabled();

	// check if button disabled after second check
	userEvent.click(checkbox);
	expect(checkbox).not.toBeChecked();
	expect(submitButton).toBeDisabled();
});

test('popover response to hover', async () => {
	render(<SummaryForm />);

	//popover starts hidden
	const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
	expect(nullPopover).not.toBeInTheDocument();

	//popover appears when mouseover the checkbox label
	const termsAndConditions = screen.getByText(/terms and conditions/i);
	userEvent.hover(termsAndConditions);

	const popover = screen.getByText(/no ice cream will actually be delivered/i);
	expect(popover).toBeInTheDocument(); // best practice for readability

	//popover disappears when mouse out of checkbox label
	userEvent.unhover(termsAndConditions);
	await waitForElementToBeRemoved(() => 
		screen.queryByText(/no ice cream will actually be delivered/i)
	);
});




