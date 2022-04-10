import React, { useEffect, useState } from 'react';
import classes from './BooksForm.module.css';
import FormGroup from './FormGroup';

const BooksForm = (props) => {
	const [isExtended, setIsExtended] = useState(false);
	const [title, setTitle] = useState('');
	const [authors, setAuthors] = useState('');
	const [language, setLanguage] = useState('');
	const [isbn, setIsbn] = useState('');

	const changeTitleHandler = (val) => {
		setTitle(val);
	};

	const changeAuthorsHandler = (val) => {
		setAuthors(val);
	};

	const changeLanguageHandler = (val) => {
		setLanguage(val);
	};

	const changeIsbnHandler = (val) => {
		setIsbn(val);
	};

	const formSubmitHandler = (event) => {
		event.preventDefault();
	};

	useEffect(() => {
		const id = setTimeout(() => {
			props.fetchBooks({
				title,
				authors,
				language,
				isbn,
			});
		}, 1000);
		return () => {
			clearTimeout(id);
		};
	}, [title, authors, language, isbn, props]);

	const buttonContent = isExtended
		? 'Hide advanced search'
		: 'Show advanced search';

	const searchClickHandler = () => {
		setIsExtended(!isExtended);
	};

	const showLanguageOption =
		title === '' && authors === '' && isbn === '' ? false : true;

	return (
		<div className={classes['form-wrapper']}>
			<div>
				<h2>Search books</h2>
			</div>
			<form role='form' onSubmit={formSubmitHandler} className={classes.form}>
				<FormGroup
					labelText='Title: '
					changeInput={changeTitleHandler}
					type='text'
					id='title'
				/>
				{isExtended && (
					<FormGroup
						labelText='Authors: '
						changeInput={changeAuthorsHandler}
						type='text'
						id='authors'
					/>
				)}
				{isExtended && (
					<FormGroup
						labelText='Language: '
						changeInput={changeLanguageHandler}
						type='select'
						id='language'
						show={showLanguageOption}
					/>
				)}
				{isExtended && (
					<FormGroup
						labelText='ISBN number: '
						changeInput={changeIsbnHandler}
						type='number'
						id='isbn'
					/>
				)}
				<div className={classes.controls}>
					<button type='button' onClick={searchClickHandler}>
						{buttonContent}
					</button>
				</div>
			</form>
		</div>
	);
};

export default BooksForm;
