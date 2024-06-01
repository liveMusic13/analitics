import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
import { convertDataForBubbleLine } from '../../../../../utils/convertFields';
import styles from './BubbleLineComparison.module.scss';

const BubbleLineComparison = ({ isViewSource, activeSubcategory }) => {
	const { third_graph } = useSelector(state => state.competitiveData);

	// console.log(
	// 	convertDataForBubbleLine(third_graph[0], activeSubcategory),
	// 	convertDataForBubbleLine(third_graph[1], activeSubcategory),
	// );
	// console.log(third_graph);

	const options = {
		chart: {
			type: 'bubble',
			plotBorderWidth: 1,
			zoomType: 'xy',
		},
		legend: {
			enabled: true,
		},
		title: {
			text: null,
		},
		subtitle: {
			text: null,
		},
		accessibility: {
			enabled: false, //HELP: Отключаем модуль доступности
		},
		xAxis: {
			type: 'datetime',
			dateTimeLabelFormats: {
				day: '%e. %b %Y',
				month: "%e. %b '%Y",
				year: '%Y',
			},
			gridLineWidth: 1,
			title: {
				text: 'Data',
			},
			accessibility: {
				enabled: false,
			},
		},
		yAxis: {
			startOnTick: false,
			endOnTick: false,
			title: {
				text: 'Rating',
			},
			labels: {
				format: '{value}',
			},
			maxPadding: 0.2,
			accessibility: {
				enabled: false,
			},
		},
		tooltip: {
			useHTML: true,
			headerFormat: '<table>',
			pointFormat:
				'<tr><th colspan="2"><h3>{point.source}</h3></th></tr>' +
				// '<tr><th>Rating:</th><td>{point.x}</td></tr>' +
				'<tr><th>Rating:</th><td>{point.y}</td></tr>' +
				'<tr><th>Size:</th><td>{point.z}</td></tr>',
			footerFormat: '</table>',
			followPointer: true,
		},
		plotOptions: {
			bubble: {
				minSize: 0.1, // Минимальный размер пузырька
				maxSize: 20,
			},
			series: {
				cursor: 'pointer',
				point: {
					events: {
						click: function () {
							window.open(this.options.url, '_blank');
						},
					},
				},
				dataLabels: {
					enabled: true,
					format: '{point.name}',
				},
			},
		},
		series: [
			// {
			// 	data: one
			// 		? convertDataForBubbleLine(third_graph[0], activeSubcategory)
			// 		: convertDataForBubbleLine(third_graph[1], activeSubcategory),
			// 	colorByPoint: false,
			// },
			{
				name: third_graph[0].index_name,
				data: convertDataForBubbleLine(third_graph[0], activeSubcategory),
				color: 'rgba(223, 83, 83, .5)', // Цвет для первой серии
			},
			{
				name: third_graph[1].index_name,
				data: convertDataForBubbleLine(third_graph[1], activeSubcategory),
				color: 'rgba(119, 152, 191, .5)', // Цвет для второй серии
			},
		],
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
				{third_graph.map(elem => (
					<p key={Math.random()}>{elem.index_name}</p>
				))}
			</div>
		</>
	);
};

export default BubbleLineComparison;
