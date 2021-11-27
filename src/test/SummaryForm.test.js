import { render, screen, fireEvent } from '@testing-library/react';
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
	fireEvent.click(checkbox);
	expect(checkbox).toBeChecked();
	expect(submitButton).not.toBeDisabled();

	// check if button disabled after second check
	fireEvent.click(checkbox);
	expect(checkbox).not.toBeChecked();
	expect(submitButton).toBeDisabled();
});




