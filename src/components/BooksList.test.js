import { render, screen } from '@testing-library/react';
import BooksList from './BooksList';

const dummyData = [
	{
		voulmeInfo: {
			title: 'Dummy title',
			imageLinks: { thumbnail: 'dummy url' },
			description: 'Some dummy description',
		},
	},
];

describe('BooksList component', () => {
	test('renders list', () => {
		render(<BooksList data={[]} />);

		const list = screen.getByRole('list');
		expect(list).toBeInTheDocument();
	});

	test('informs about empty list', () => {
		render(<BooksList data={[]} />);

		const empty = screen.getByText('No items.', { exact: true });
		expect(empty).toBeInTheDocument();
	});

	test('renders items when full list', () => {
		render(<BooksList data={dummyData} />);

		const items = screen.getAllByRole('listitem');
		expect(items).toHaveLength(1);
	});
});
