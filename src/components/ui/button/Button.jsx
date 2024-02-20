import { useAddTonalityData } from '../../../hooks/useAddTonalityData';
import { useGetInformationGraf } from '../../../hooks/useGetInformationGraf.js';
import styles from './Button.module.scss';

const Button = ({ children, type, buttonFor, setViewCalendar }) => {
	const { addTonality, dataForRequest } = useAddTonalityData();
	const { addInformationGraf } = useGetInformationGraf();

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
					onClick={() =>
						addTonality({
							index: dataForRequest.index,
							min_data: dataForRequest.min_data,
							max_data: dataForRequest.max_data,
						})
					}
				>
					{children}
				</button>
			) : buttonFor === 'information-graf' ? (
				<button
					className={styles.button}
					type={type}
					style={{
						width: 'calc(144 / 1440 * 100vw)',
						height: 'calc(56 / 1440 * 100vw)',
					}}
					onClick={() =>
						addInformationGraf({
							index:
								'skillfactory_zaprosy_na_obuchenie_08_11_2023_14_11_2023_655335f',
							min_data: '1699391103',
							max_data: '1699951756',
							query_str: 'карта',
						})
					}
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
