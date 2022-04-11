import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorModal from './ErrorModal';

describe('ErrorModal component', () => {
	test('renders content properly', () => {
		render(<ErrorModal />);

		const header = screen.getByText('Ups...');
		expect(header).toBeInTheDocument();

		const content = screen.getByText('Something went wrong', { exact: false });
		expect(content).toBeInTheDocument();

		const close = screen.getByRole('img');
		expect(close).toBeInTheDocument();
	});

	test('calls function after exit click', () => {
		const closeError = jest.fn();
		render(<ErrorModal closeError={closeError} />);

		const close = screen.getByRole('img').firstChild;

		userEvent.click(close);
		expect(closeError).toBeCalledTimes(1);
	});
});
