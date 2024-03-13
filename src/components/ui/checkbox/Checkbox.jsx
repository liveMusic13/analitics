import { useState } from 'react';
import styles from './Checkbox.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { actions as dataForRequestAction } from '../../../store/data-for-request/dataForRequest.slice.js';

const Checkbox = ({ id, text }) => {
	const dispatch = useDispatch();
	const value = useSelector(state => state.dataForRequest);

	return (
		<div className={styles.block__option}>
			<input
				type='checkbox'
				id={id}
				value={value[id]}
				className={styles.check}
				onChange={() => dispatch(dataForRequestAction.currentCheckBox(id))}
			/>
			<label htmlFor={id} className={styles.option}>
				{text}
			</label>
		</div>
	);
};

export default Checkbox;
