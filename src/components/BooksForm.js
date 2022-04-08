import React, { useRef } from 'react';
import classes from './BooksForm.module.css';

const BooksForm = (props) => {
	const titleInputRef = useRef();
	const authorsInputRef = useRef();
	const languageInputRef = useRef();
	const isbnDateInputRef = useRef();

	const formSubmitHandler = (event) => {
		event.preventDefault();
		props.fetchBooks({
			title: titleInputRef.current.value,
			authors: authorsInputRef.current.value,
			language: languageInputRef.current.value,
			isbn: isbnDateInputRef.current.value,
		});
	};

	return (
		<div className={classes['form-wrapper']}>
			<div>
				<h2>Search books</h2>
			</div>
			<form onSubmit={formSubmitHandler} className={classes.form}>
				<div className={classes['form-group']}>
					<label htmlFor='title-input'>Title: </label>
					<input type='text' ref={titleInputRef} id='title-input'></input>
				</div>
				<div className={classes['form-group']}>
					<label htmlFor='title-input'>Authors: </label>
					<input type='text' ref={authorsInputRef} id='title-input'></input>
				</div>
				<div className={classes['form-group']}>
					<label htmlFor='title-input'>Language: </label>
					<input ref={languageInputRef} id='title-input'></input>
				</div>
				<div className={classes['form-group']}>
					<label htmlFor='title-input'>ISBN number: </label>
					<input type='text' ref={isbnDateInputRef} id='title-input'></input>
				</div>
				<div className={classes.controls}>
					<button type='submit'>Search</button>
				</div>
			</form>
		</div>
	);
};

export default BooksForm;
