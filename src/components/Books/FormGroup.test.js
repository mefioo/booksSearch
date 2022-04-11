import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import FormGroup from './FormGroup';

describe('FormGroup component', () => {
	test('renders proper label', () => {
		render(<FormGroup changeInput={() => {}} labelText='Dummy label' />);

		const label = screen.getByText('Dummy label', { exact: true });
		expect(label).toBeInTheDocument();
	});

	test('renders text input when type is not "text"', () => {
		render(<FormGroup type='text' changeInput={() => {}} />);

		const input = screen.getByRole('textbox');
		expect(input).toBeInTheDocument();
	});

	test('renders text input when type is "select"', () => {
		render(<FormGroup type='select' changeInput={() => {}} />);

		const input = screen.queryByRole('textbox');
		expect(input).not.toBeInTheDocument();
	});

	test('renders select when type is "select"', () => {
		render(<FormGroup type='select' changeInput={() => {}} />);

		const select = screen.getByRole('combobox');
		expect(select).toBeInTheDocument();
	});

	test('renders select when type is "text"', () => {
		render(<FormGroup type='text' changeInput={() => {}} />);

		const select = screen.queryByRole('combobox');
		expect(select).not.toBeInTheDocument();
	});

	test('renders number input when type is number', () => {
		render(<FormGroup type='number' changeInput={() => {}} />);

		const number = screen.queryByRole('spinbox');
		expect(number).not.toBeInTheDocument();
	});

	test('renders disabled select when should be disabled', () => {
		render(<FormGroup type='select' show={false} changeInput={() => {}} />);

		const select = screen.getByRole('combobox');
		expect(select).toHaveAttribute('disabled');
	});

	test('renders disabled select when should be enabled', () => {
		render(<FormGroup type='select' show={true} changeInput={() => {}} />);

		const select = screen.getByRole('combobox');
		expect(select).not.toHaveAttribute('disabled');
	});

	test('does not let type in disallowed characters in text input', () => {
		render(<FormGroup type='text' changeInput={() => {}} />);

		const input = screen.getByRole('textbox');
		fireEvent.change(input, { target: { value: '/' } });
		expect(input.value).toBe('');
	});

	test('calls function when input is changed', () => {
		const handleChange = jest.fn();
		render(<FormGroup type='textbox' changeInput={handleChange} />);

		const input = screen.getByRole('textbox');
		fireEvent.change(input, { target: { value: 'a' } });
		expect(handleChange).toBeCalled();
	});

	test('call function to translate full language name to iso-639-1 format', () => {
		const handleChange = jest.fn();
		render(<FormGroup type='select' show={true} changeInput={() => {}} />);

		const select = screen.getByRole('combobox');
		select.onchange = handleChange;
		fireEvent.change(select, { target: { value: 'English' } });
		expect(select.onchange).toBeCalledTimes(1);
	});
});
