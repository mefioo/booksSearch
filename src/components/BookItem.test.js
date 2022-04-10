import { render, screen } from '@testing-library/react';
import BookItem from './BookItem';

describe('BookItem component', () => {
	test('renders proper content', () => {
		render(<BookItem title='Dummy title' authors='Dummy author' />);

		const item = screen.getByRole('listitem');
		expect(item).toBeInTheDocument();

		const title = screen.getByText('Dummy title', { exact: true });
		expect(title).toBeInTheDocument();
	});

	test('renders description when no description provided', () => {
		render(<BookItem description='' />);

		const description = screen.getByText('...', { exact: true });
		expect(description).toBeInTheDocument();
	});

	test('renders description when proper description provided', () => {
		render(<BookItem description='Dummy description ' />);

		const description = screen.getByText('Dummy description ...', {
			exact: true,
		});
		expect(description).toBeInTheDocument();
	});

	test('renders photo when correct url provided', () => {
		const src = 'https://www.googleapis.com/books/v1/volumes/gR6ezgEACAAJ';
		render(<BookItem cover={src} />);

		const photo = screen.getByRole('img');
		expect(photo).toHaveAttribute('src', src);
	});

	test('does not render photo when url not provided', () => {
		render(<BookItem cover='' />);

		const photo = screen.queryByRole('img');
		expect(photo).not.toBeInTheDocument();
	});
});
