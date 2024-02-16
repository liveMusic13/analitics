import { useDispatch } from 'react-redux';
import { $axios } from '../../../api.js';
import { useAddTonalityData } from '../../../hooks/useAddTonalityData';
import { useGetInformationGraf } from '../../../hooks/useGetInformationGraf.js';
import { actions as informationGrafDataAction } from '../../../store/information-graf-data/informationGrafData.slice.js';
import { actions as isGraphAction } from '../../../store/is-graph/isGraph.slice.js';
import styles from './Button.module.scss';

const Button = ({ children, type, buttonFor, setViewCalendar }) => {
	const { addTonality, dataForRequest } = useAddTonalityData();
	const { addInformationGraf } = useGetInformationGraf();

	const dispatch = useDispatch();
	const test = async () => {
		const responce = await $axios.get(
			'/information_graph?index=rosbank_01.02.2024-07.02.2024&min_date=1706760780&max_date=1707218189',
		);
		console.log(responce);

		dispatch(informationGrafDataAction.addInformationGraphData(responce.data));
		dispatch(isGraphAction.activeGraph(''));
	};

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
					// onClick={() =>
					// 	addInformationGraf({
					// 		index: 'rosbank_01.02.2024-07.02.2024',
					// 		min_data: '1706760780',
					// 		max_data: '1707218189',
					// 		query_str: 'карта',
					// 	})
					// }
					onClick={test}
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
