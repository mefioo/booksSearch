import React from 'react';
import Overlay from './Overlay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import classes from './ErrorModal.module.css';

const ErrorModal = (props) => {
	const closeErrorHandler = () => {
        props.closeError()
    };

	return (
		<Overlay>
			<div className={classes.error}>
				<div className={classes.exit}>
					<FontAwesomeIcon
						onClick={closeErrorHandler}
						className={classes.icon}
						icon={faXmark}
					/>
				</div>
				<h2>Ups...</h2>
				<p>Something went wrong and we could not fullfil your request. Please contact the administrator.</p>
			</div>
		</Overlay>
	);
};

export default ErrorModal;
