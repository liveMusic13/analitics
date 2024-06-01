import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
import { convertDataForLineDynamic } from '../../../../../utils/convertFields';
import styles from './LineDynamic.module.scss';

const LineDynamic = ({ isViewSource }) => {
	const { first_graph } = useSelector(state => state.competitiveData);

	const options = {
		accessibility: {
			enabled: false, //HELP: Отключаем модуль доступности
		},
		chart: {
			zoomType: 'xy',
			type: 'spline',
			scrollablePlotArea: {
				minWidth: 600,
				scrollPositionX: 1,
			},
		},
		title: {
			text: null,
		},
		subtitle: {
			text: null,
		},
		xAxis: {
			title: {
				text: 'Time',
			},
			type: 'datetime',
			labels: {
				overflow: 'justify',
			},
		},
		yAxis: {
			title: {
				text: 'Count',
			},
			minorGridLineWidth: 0,
			gridLineWidth: 0,
			alternateGridColor: null,
		},
		// tooltip: {
		// 	valueSuffix: ' m/s',
		// },
		plotOptions: {
			spline: {
				lineWidth: 4,
				states: {
					hover: {
						lineWidth: 5,
					},
				},
				marker: {
					enabled: false,
				},
				pointInterval: 3600000, // one hour
				pointStart: Date.UTC(2020, 3, 15, 0, 0, 0),
			},
		},

		series: convertDataForLineDynamic(first_graph),
		navigation: {
			menuItemStyle: {
				fontSize: '10px',
			},
		},
	};
	console.log(convertDataForLineDynamic(first_graph));
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
				{convertDataForLineDynamic(first_graph).map(elem => (
					<p key={Math.random()}>{elem.name}</p>
				))}
			</div>
		</>
	);
};

export default LineDynamic;
