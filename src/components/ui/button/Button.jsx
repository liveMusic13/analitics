import styles from './Button.module.scss';

const Button = ({ children, type }) => {
	return (
		<button className={styles.button} type={type}>
			{children}
		</button>
	);
};

export default Button;
