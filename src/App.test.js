import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App component', () => {
	test('renders proper content', () => {
		render(<App />);

		const linkElement = screen.getByText('Books App');
		expect(linkElement).toBeInTheDocument();
	});
});
