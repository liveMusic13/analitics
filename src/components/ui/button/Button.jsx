import { useAddTonalityData } from '../../../hooks/useAddTonalityData';
import styles from './Button.module.scss';

const Button = ({ children, type, buttonFor, setViewCalendar }) => {
	const { addTonality, dataForRequest } = useAddTonalityData();

	return (
		<>
			{buttonFor === 'calendar' ? (
				<button
					className={styles.button}
					type={type}
					style={{ width: 'calc(151 / 1440 * 100vw)' }}
					onClick={() => setViewCalendar(false)}
				>
					{children}
				</button>
			) : buttonFor === 'request-graf' ? (
				<button
					className={styles.button}
					type={type}
					style={{
						width: 'calc(144 / 1440 * 100vw)',
						height: 'calc(56 / 1440 * 100vw)',
					}}
					onClick={() => addTonality(dataForRequest)}
				>
					{children}
				</button>
			) : (
				<button className={styles.button} type={type}>
					{children}
				</button>
			)}
		</>
	);
};

export default Button;
