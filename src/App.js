import BooksForm from './components/BooksForm';
import './App.css';
import { useCallback, useEffect, useReducer, useState } from 'react';
import BooksList from './components/BooksList';

const API_KEY = '&key=AIzaSyCmJ4mYkXCw6SaIBuCAPx-MqlnpXyEpGek';
const BASE = 'https://www.googleapis.com/books/v1/volumes?q=';
const ITEMS_AMOUNT = 10;

const initialState = { itemsShown: 0, totalItems: 0, items: [] };

const booksReducer = (state, action) => {
	switch (action.type) {
		case 'SET_ITEMS':
			return {
				items: action.items,
				itemsShown: action.items.length,
				totalItems: action.totalItems,
			};
		case 'ADD_ITEMS':
			return {
				items: state.items.concat(action.items),
				itemsShown: state.items.concat(action.items).length,
				totalItems: action.totalItems,
			};
		default:
			return initialState;
	}
};

function App() {
	const [booksState, dispatchBooks] = useReducer(booksReducer, initialState);
	const [apiLink, setApiLink] = useState('');

	const searchBooks = useCallback(
		(startIndex) => {
			const fetchData = async (startIndex) => {
				const fullLink = `${apiLink}&startIndex=${startIndex}`;
				const response = await fetch(fullLink);

				const data = await response.json();

				if (startIndex === 0) {
					dispatchBooks({
						type: 'SET_ITEMS',
						items: data.items,
						totalItems: data.totalItems,
					});
				} else {
					dispatchBooks({
						type: 'ADD_ITEMS',
						items: data.items,
						totalItems: data.totalItems,
					});
				}
			};

			if (apiLink !== '') {
				fetchData(startIndex);
			}
		},
		[apiLink]
	);

	useEffect(() => {
		const scrollHandler = () => {
			if (
				window.innerHeight + window.scrollY >= document.body.offsetHeight &&
				booksState.itemsShown < booksState.totalItems
			) {
				searchBooks(booksState.itemsShown);
			}
		};
		window.addEventListener('scroll', scrollHandler);

		return () => window.removeEventListener('scroll', scrollHandler);
	}, [booksState, searchBooks]);

	useEffect(() => {
		if (apiLink !== '') {
			searchBooks(0);
		}
	}, [apiLink, searchBooks]);

	const changeLink = (data) => {
		const { title, authors, language, isbn } = data;
		const titleSearch = `+intitle:${title}`;
		const authorSearch = authors !== '' ? `+inauthor:${authors}` : '';
		const languageSearch = language !== '' ? `&langRestrict=${language}` : '';
		const isbnSearch = isbn !== '' ? `+isbn:${isbn}` : '';

		const link =
			BASE +
			titleSearch +
			authorSearch +
			isbnSearch +
			languageSearch +
			'&maxResults=' +
			ITEMS_AMOUNT +
			'&orderBy=newest' +
			API_KEY;

		setApiLink(link);
	};

	return (
		<div className='app-wrapper'>
			<div className='header'>
				<p>Books App</p>
			</div>
			<BooksForm fetchBooks={changeLink} />
			<BooksList data={booksState.items} />
		</div>
	);
}

export default App;
