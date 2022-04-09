import React, { Fragment } from 'react';
import Overlay from './Overlay';
import classes from './LoadingModal.module.css';

const LoadingModal = () => {
	return (
		<Fragment>
			<Overlay>
				<div className={classes['lds-ring']}>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</Overlay>
		</Fragment>
	);
};

export default LoadingModal;
