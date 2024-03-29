import { useAddTonalityData } from '../../../hooks/useAddTonalityData';
import { useGetInformationGraf } from '../../../hooks/useGetInformationGraf.js';
import { useThemesRequest } from '../../../hooks/useThemesRequest.js';
import { useVoiceRequest } from '../../../hooks/useVoiceRequest.js';
import styles from './Button.module.scss';

const Button = ({ children, type, buttonFor, setViewCalendar, navigate }) => {
	const { addTonality, dataForRequest } = useAddTonalityData();
	const { addInformationGraf } = useGetInformationGraf();
	const { themesRequest } = useThemesRequest();
	const { voiceRequest } = useVoiceRequest();

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
			) : buttonFor === 'request-graf' || buttonFor === 'topic-analysis' ? (
				<button
					className={styles.button}
					type={type}
					style={{
						width: 'calc(144 / 1440 * 100vw)',
						height: 'calc(56 / 1440 * 100vw)',
					}}
					onClick={() => {
						if (buttonFor === 'topic-analysis') {
							themesRequest({
								index: dataForRequest.index,
								min_data: dataForRequest.min_data,
								max_data: dataForRequest.max_data,
							});
						} else {
							addTonality({
								index: dataForRequest.index,
								min_data: dataForRequest.min_data,
								max_data: dataForRequest.max_data,
							});
						}
					}}
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
							// index: 2,
							// min_data: '1705266000',
							// max_data: '1705846629',
							// query_str: 'data',
							index: dataForRequest.index,
							// min_data: '1705266000',
							// max_data: '1705846629',
							min_data: dataForRequest.min_data,
							max_data: dataForRequest.max_data,
							query_str: dataForRequest.query_str,
							post: dataForRequest.post,
							repost: dataForRequest.repost,
							SMI: dataForRequest.SMI,
						})
					}
				>
					{children}
				</button>
			) : buttonFor === 'navigate' ? (
				<button
					className={styles.button}
					type={type}
					onClick={() => navigate('/')}
				>
					{children}
				</button>
			) : buttonFor === 'voice-graf' ? (
				<button
					className={styles.button}
					type={type}
					style={{
						width: 'calc(144 / 1440 * 100vw)',
						height: 'calc(56 / 1440 * 100vw)',
					}}
					onClick={() => {
						console.log('proshel');
						voiceRequest({
							index: dataForRequest.index,
							min_data: dataForRequest.min_data,
							max_data: dataForRequest.max_data,
							query_str: dataForRequest.query_str,
						});
					}}
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
