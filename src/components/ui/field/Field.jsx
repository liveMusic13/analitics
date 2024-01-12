import { useState } from 'react';
import styles from './Field.module.scss';

const Field = ({ type, placeholder, register, id, label, auth }) => {
	const [isViewPassword, setIsViePassword] = useState(false);

	return (
		<>
			{auth ? (
				<div className={styles.block__input}>
					<label className={styles.label} htmlFor={id}>
						{label}
					</label>
					<input
						className={styles.input}
						{...register(
							id,
							id === 'email'
								? {
										required: true,
										pattern: {
											value:
												/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
											message: 'Некорректный формат почты',
										},
									}
								: {
										required: true,
									},
						)}
						type={isViewPassword ? 'text' : type}
						id={id}
						placeholder={placeholder}
					/>

					{label === 'Пароль' && (
						<button
							className={styles.button__view}
							onClick={() => setIsViePassword(!isViewPassword)}
						>
							<img
								src='./images/icons/input_button/view_password.svg'
								alt='view_password'
							/>
						</button>
					)}
				</div>
			) : (
				<input className={styles.input} type='text' placeholder={placeholder} />
			)}
		</>
	);
};

export default Field;
