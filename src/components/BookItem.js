import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import React from 'react';
import classes from './BookItem.module.css';

const BookItem = (props) => {
	let description = props.description;
	if (description) {
		description = description.slice(0, description.indexOf(' ', 250));
	}

	return (
		<li className={classes['book-item']}>
			<div className={classes.photo}>
				{props.cover ? (
					<img src={props.cover} />
				) : (
					<FontAwesomeIcon icon={faEyeSlash} />
				)}
			</div>
			<div className={classes['book-info']}>
				<h3>{props.title}</h3>
				<p>{description} ...</p>
			</div>
		</li>
	);
};

export default BookItem;
