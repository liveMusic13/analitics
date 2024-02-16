import { useState } from 'react';
import styles from './Checkbox.module.scss';

const Checkbox = ({ id, text }) => {
	const [value, setValue] = useState(false);
	console.log(value);

	return (
		<div className={styles.block__option}>
			<input
				type='checkbox'
				id={id}
				value={value}
				className={styles.check}
				onChange={() => setValue(!value)}
			/>
			<label htmlFor={id} className={styles.option}>
				{text}
			</label>
		</div>
	);
};

export default Checkbox;
