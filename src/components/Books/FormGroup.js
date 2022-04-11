import React, { useEffect, useState } from 'react';
import classes from './FormGroup.module.css';
import ISO6391 from 'iso-639-1';

const FormGroup = (props) => {
	const [value, setValue] = useState('');

	const changeInputHandler = (event) => {
		if (event.target.value.length > 0) {
			if (
				!event.target.value[event.target.value.length - 1].match(
					/^[\s\p{L} 0-9-:.,()]+$/u
				)
			) {
				event.target.value = event.target.value.slice(0, -1);
			}
		}
		setValue(event.target.value);
	};

	const changeOptionHandler = (event) => {
		if (event.target.value === '---') {
			setValue('');
		} else {
			const code = ISO6391.getCode(event.target.value);
			setValue(code);
		}
	};

	useEffect(() => {
		props.changeInput(value);
	}, [props, value]);

	let input = '';
	if (props.type === 'select') {
		const options = ISO6391.getAllNames().map((lang) => (
			<option key={lang} value={lang}>
				{lang}
			</option>
		));
		input = (
			<select
				disabled={!props.show}
				onChange={changeOptionHandler}
				id={props.id}
			>
				<option>---</option>
				{options}
			</select>
		);
	} else {
		input = (
			<input
				onChange={changeInputHandler}
				type={props.type}
				id='input'
				value={value}
			></input>
		);
	}

	return (
		<div className={classes['form-group']}>
			<label htmlFor='input'>{props.labelText}</label>
			{input}
		</div>
	);
};

export default FormGroup;
