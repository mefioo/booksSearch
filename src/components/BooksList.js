import React from 'react';
import BookItem from './BookItem';
import classes from './BooksList.module.css';

const BooksList = (props) => {
	let content = 'No items.';

	if (Object.keys(props.data).length !== 0) {
		content = [];
		console.log(props.data);
		props.data.forEach((item, index) => {
			const title = item.volumeInfo ? item.volumeInfo.title : '';
			const cover = item.volumeInfo
				? item.volumeInfo.imageLinks
					? item.volumeInfo.imageLinks.thumbnail
					: ''
				: '';
			const description = item.volumeInfo ? item.volumeInfo.description : '';
			content.push(
				<BookItem
					key={index}
					title={title}
					cover={cover}
					description={description}
					authors={item.volumeInfo.authors}
					isbn={item.volumeInfo.industryIdentifiers}
				/>
			);
		});
	}

	return (
		<div className={classes['list-wrapper']}>
			<ul>{content}</ul>
		</div>
	);
};

export default BooksList;
