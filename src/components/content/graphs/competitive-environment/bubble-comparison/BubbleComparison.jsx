import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { transformBubbleData } from '../../../../../utils/convertFields';
import styles from './BubbleComparison.module.scss';

const BubbleComparison = ({ one, isViewSource, activeSubcategory }) => {
	const { second_graph } = useSelector(state => state.competitiveData);

	console.log(second_graph);

	const [dummyState, setDummyState] = useState(0);

	useEffect(() => {
		if (dummyState !== 1) setDummyState(prev => prev + 1); //HELP: ПОТОМУ ЧТО СРАЗУ НЕ ПОЯВЛЯЕТСЯ ГРАФИК, ПРИХОДИТСЯ ДЕЛАТЬ РЕРЕНДЕРИНГ ПРИНУДИТЕЛЬНО ЧТОБЫ ОН ПОЯВИЛСЯ
	}, [dummyState]);

	const options = {
		accessibility: {
			enabled: false, //HELP: Отключаем модуль доступности
		},
		chart: {
			type: 'packedbubble',
			height: '100%',
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
				maxSize: '80%',
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
		// series: convertDataForSplitBubble(first_graph),
		series: one
			? transformBubbleData(
					second_graph[0],
					activeSubcategory === 'SMI' ? true : false,
				)
			: transformBubbleData(
					second_graph[1],
					activeSubcategory === 'SMI' ? true : false,
				),
	};

	return (
		<>
			<HighchartsReact
				highcharts={Highcharts}
				options={options}
				containerProps={{ style: { width: '100%', height: '100%' } }}
			/>
			<div
				className={styles.block__sources}
				style={isViewSource ? { display: 'flex' } : { display: 'none' }}
			>
				{!one &&
					second_graph.map(elem => (
						<p key={Math.random()}>{elem.index_name}</p>
					))}
			</div>
		</>
	);
};

export default BubbleComparison;
