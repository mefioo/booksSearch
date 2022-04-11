import BooksForm from './components/Books/BooksForm';
import './App.css';
import { Fragment, useCallback, useEffect, useReducer, useState } from 'react';
import BooksList from './components/Books/BooksList';
import LoadingModal from './components/UI/LoadingModal';
import ErrorModal from './components/UI/ErrorModal';
import API_KEY from './to-ignore';

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
		case 'CLEAR_ITEMS':
			return initialState;
		default:
			return initialState;
	}
};

function App() {
	const [booksState, dispatchBooks] = useReducer(booksReducer, initialState);
	const [apiLink, setApiLink] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const searchBooks = useCallback(
		(startIndex) => {
			const fetchData = async (startIndex) => {
				setIsLoading(true);
				try {
					const fullLink = `${apiLink}&startIndex=${startIndex}`;
					const response = await fetch(fullLink);

					if (!response.ok) {
						throw new Error(response.status);
					}

					const data = await response.json();

					if (data.totalItems === 0) {
						dispatchBooks({ type: 'CLEAR_ITEMS' });
					} else {
						let items = [];
						data.items.forEach((item) => {
							const title = item.volumeInfo ? item.volumeInfo.title : '';
							const cover = item.volumeInfo
								? item.volumeInfo.imageLinks
									? item.volumeInfo.imageLinks.thumbnail
									: ''
								: '';
							const description = item.volumeInfo
								? item.volumeInfo.description
								: '';
							items.push({ title, cover, description });
						});
						let type = '';
						if (startIndex === 0) {
							type = 'SET_ITEMS';
						} else {
							type = 'ADD_ITEMS';
						}
						dispatchBooks({
							type: type,
							items: items,
							totalItems: data.totalItems,
						});
					}
					setIsLoading(false);
				} catch (err) {
					setIsLoading(false);
					setIsError(true);
				}
			};

			fetchData(startIndex);
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
		const titleSearch = title !== '' ? `+intitle:${title}` : '';
		const authorSearch = authors !== '' ? `+inauthor:${authors}` : '';
		const isbnSearch = isbn !== '' ? `+isbn:${isbn}` : '';
		const languageSearch = language !== '' ? ` &langRestrict=${language}` : '';

		if (!(title === '' && authors === '' && isbn === '')) {
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
		} else {
			setApiLink('');
			dispatchBooks({ type: 'CLEAR_ITEMS' });
		}
	};

	const errorCloseHandler = () => {
		setIsError(false);
	};

	return (
		<Fragment>
			{isLoading && <LoadingModal />}
			{isError && <ErrorModal closeError={errorCloseHandler} />}
			<div className='app-wrapper'>
				<div className='header'>
					<p>Books App</p>
				</div>
				<BooksForm fetchBooks={changeLink} />
				<BooksList data={booksState.items} />
			</div>
		</Fragment>
	);
}

export default App;
