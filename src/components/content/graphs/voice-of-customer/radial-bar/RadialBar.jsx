import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import { useSelector } from 'react-redux';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import {
	getCategoryData,
	getSeriesData,
} from '../../../../../utils/convertFields';
import styles from './RadialBar.module.scss';
import './TransformStyle.scss';

HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);

const RadialBar = ({ isViewSource }) => {
	const { data } = useSelector(state => state.dataVoice);

	Highcharts.setOptions({
		colors: ['rgb(255, 191, 0)', 'rgb(255, 0, 0)', 'rgb(128, 255, 0)'], //HELP: ГЕНЕРИРУЮ МАССИВ СЛУЧАЙНЫХ ЦВЕТОВ
	});

	const options = {
		accessibility: {
			enabled: false, //HELP: Отключаем модуль доступности
		},
		title: {
			text: null,
		},
		chart: {
			type: 'column',
			inverted: true,
			polar: true,
		},
		tooltip: {
			outside: true,
			formatter: function () {
				return `<b>${this.series.name}</b><br/>${this.x}: ${this.y}`;
			},
		},
		pane: {
			size: '85%',
			innerSize: '5%',
			endAngle: 270,
		},
		xAxis: {
			tickInterval: 1,
			labels: {
				align: 'right',
				useHTML: true,
				allowOverlap: true,
				step: 1,
				y: 3,
				style: {
					fontSize: '0.7rem',
				},
			},
			lineWidth: 0,
			gridLineWidth: 0,
			categories: getCategoryData(data.second_graph_data),
		},
		yAxis: {
			lineWidth: 0,
			tickInterval: 25,
			reversedStacks: false,
			endOnTick: true,
			showLastLabel: true,
			gridLineWidth: 0,
		},
		plotOptions: {
			column: {
				stacking: 'normal',
				borderWidth: 0,
				pointPadding: 0,
				groupPadding: 0.15,
				borderRadius: '50%',
			},
		},
		series: getSeriesData(data.second_graph_data),
	};

	return (
		<>
			<TransformWrapper>
				<TransformComponent>
					<HighchartsReact
						highcharts={Highcharts}
						options={options}
						containerProps={{ style: { width: '100%', height: '100%' } }}
					/>
				</TransformComponent>
			</TransformWrapper>

			<div
				className={styles.block__sources}
				style={isViewSource ? { display: 'flex' } : { display: 'none' }}
			>
				{[
					...new Set(
						data.second_graph_data.map(item => (
							<p key={Math.random()}>{item.hub}</p>
						)),
					),
				]}
			</div>
		</>
	);
};

export default RadialBar;
