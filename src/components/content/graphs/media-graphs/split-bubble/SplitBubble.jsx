// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import { useSelector } from 'react-redux';
// // import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
// import { convertDataForSplitBubble } from '../../../../../utils/convertFields';

// const SplitBubble = ({ isViewSource }) => {
// 	const { first_graph } = useSelector(state => state.dataMedia);

// 	const concatData = first_graph.negative_smi.concat(first_graph.positive_smi);
// // '#006400'
// // else if (d.data.name === 'Негативные') {
// // 	return '#8B0000';
// 	const options = {
// 		accessibility: {
// 			enabled: false, //HELP: Отключаем модуль доступности
// 		},
// 		chart: {
// 			type: 'packedbubble',
// 			height: '50%',
// 		},
// 		title: {
// 			text: null,
// 		},
// 		tooltip: {
// 			useHTML: true,
// 			pointFormat: '<b>{point.name}:</b> {point.value}',
// 		},
// 		plotOptions: {
// 			packedbubble: {
// 				minSize: '10%',
// 				maxSize: '80%',
// 				zMin: 0,
// 				zMax: 1000,
// 				layoutAlgorithm: {
// 					gravitationalConstant: 0.05,
// 					splitSeries: true,
// 					seriesInteraction: false,
// 					dragBetweenSeries: true,
// 					parentNodeLimit: true,
// 				},
// 				dataLabels: {
// 					enabled: true,
// 					format: '{point.name}',
// 					filter: {
// 						property: 'y',
// 						operator: '>',
// 						value: 250,
// 					},
// 					style: {
// 						color: 'black',
// 						textOutline: 'none',
// 						fontWeight: 'normal',
// 					},
// 				},
// 			},
// 		},
// 		series: convertDataForSplitBubble(first_graph),
// 	};

// 	return (
// 		<>
// 			{/* <TransformWrapper wrapperClass={styles.test1}>
// 					<TransformComponent wrapperClass={styles.test}> */}
// 			<HighchartsReact
// 				highcharts={Highcharts}
// 				options={options}
// 				containerProps={{ style: { width: '100%', height: '100%' } }}
// 			/>
// 			{/* </TransformComponent>
// 				</TransformWrapper> */}
// 			{/* <div
// 				className={styles.block__sources}
// 				style={isViewSource ? { display: 'flex' } : { display: 'none' }}
// 			>
// 				{concatData.map(name => (
// 					<p key={Math.random()}>{name.name}</p>
// 				))}
// 			</div> */}
// 		</>
// 	);
// };

// export default SplitBubble;

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
import { convertDataForSplitBubble } from '../../../../../utils/convertFields';

const SplitBubble = ({ isViewSource }) => {
	const { first_graph } = useSelector(state => state.dataMedia);

	// Преобразуем данные и добавляем цвета
	const seriesData = convertDataForSplitBubble(first_graph).map(
		(series, index) => {
			// Список цветов, который можно настроить
			const colors = ['#8B0000', '#006400'];

			return {
				...series,
				color: colors[index % colors.length], // Задаем цвет каждой серии
			};
		},
	);

	const options = {
		accessibility: {
			enabled: false,
		},
		chart: {
			type: 'packedbubble',
			height: '45%',
		},
		title: {
			text: null,
		},
		tooltip: {
			useHTML: true,
			pointFormat: '<b>{point.name}:</b> {point.value}',
		},
		plotOptions: {
			packedbubble: {
				minSize: '10%',
				maxSize: '50%',
				zMin: 0,
				zMax: 1000,
				layoutAlgorithm: {
					gravitationalConstant: 0.05,
					splitSeries: true,
					seriesInteraction: false,
					dragBetweenSeries: true,
					parentNodeLimit: true,
				},
				dataLabels: {
					enabled: true,
					format: '{point.name}',
					filter: {
						property: 'y',
						operator: '>',
						value: 250,
					},
					style: {
						color: 'black',
						textOutline: 'none',
						fontWeight: 'normal',
					},
				},
			},
		},
		series: seriesData,
	};

	return (
		<>
			<HighchartsReact
				highcharts={Highcharts}
				options={options}
				containerProps={{ style: { width: '100%', height: '100%' } }}
			/>
		</>
	);
};

export default SplitBubble;
