import React from 'react';
import BookItem from './BookItem';
import classes from './BooksList.module.css';

const BooksList = (props) => {
	let content = 'No items.';

	if (Object.keys(props.data).length !== 0) {
		content = props.data.map((item, index) => (
			<BookItem
				key={index}
				title={item.title}
				cover={item.cover}
				description={item.description}
			/>
		));
	}

	return (
		<div className={classes['list-wrapper']}>
			<ul>{content}</ul>
		</div>
	);
};

export default BooksList;
