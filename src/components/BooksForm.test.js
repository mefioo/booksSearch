import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BooksForm from './BooksForm';
import BooksList from './BooksList';

describe('BooksForm component', () => {
	test('renders proper content', () => {
		render(<BooksForm />);

		const title = screen.getByText('Search books', { exact: true });
		expect(title).toBeInTheDocument();
        const form = screen.getByRole('form');
		expect(form).toBeInTheDocument();
        const input = screen.getAllByRole('textbox');
		expect(input).toHaveLength(1);
	});

	test('renders all inputs after clicking on a button', () => {
		render(<BooksForm />);

		const button = screen.getByRole('button');
		userEvent.click(button);

		const textInputs = screen.getAllByRole('textbox');
		const selectInput = screen.getAllByRole('combobox');
		const numberInput = screen.getAllByRole('combobox');
		expect(textInputs).toHaveLength(2);
		expect(selectInput).toHaveLength(1);
		expect(numberInput).toHaveLength(1);
	});

	test('renders disabled select input after clicking on a button', () => {
		render(<BooksForm />);

		const button = screen.getByRole('button');
		userEvent.click(button);

		const selectInput = screen.getByRole('combobox');
		expect(selectInput).toHaveAttribute('disabled');
	});
});
