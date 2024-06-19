import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { generateColorsForObjects } from '../../../../../utils/generateColors';

const ScatterChart = ({ isViewSource }) => {
	const chartComponent = useRef(null);
	const informationGraphData = useSelector(state => state.informationGraphData);

	Highcharts.setOptions({
		colors: generateColorsForObjects(informationGraphData.values), //HELP: ГЕНЕРИРУЮ МАССИВ СЛУЧАЙНЫХ ЦВЕТОВ
	});

	const newData = informationGraphData?.values?.map(author => {
		return {
			name: author.author.fullname,
			id: author.author.fullname,
			marker: { symbol: 'circle' },
			url: author.author.url,
			data: [
				{
					x: Number(author.author.timeCreate),
					y: author.author.audienceCount,
					url: author.author.url, //HELP: ЗАКИДЫВАЕМ URL И NAME В DATA ЧТОБЫ МОЖНО БЫЛО ПРИ КЛИКЕ ПЕРЕЙТИ ПО ССЫЛКЕ И ПРИ HOVER УВИДЕТЬ ИНФУ
					name: author.author.fullname,
				},
			],
		};
	});

	const options = {
		accessibility: {
			enabled: false, // Отключаем модуль доступности
		},
		chart: {
			type: 'scatter',
			zoomType: 'xy',
		},
		title: {
			text: null,
		},
		xAxis: {
			type: 'datetime',
			title: {
				text: 'Дата / время',
			},
			labels: {
				formatter: function () {
					return Highcharts.dateFormat('%a %e %b %Y, %H:%M', this.value * 1000); // Форматируем метки оси X
				},
			},
			startOnTick: true,
			endOnTick: true,
			showLastLabel: true,
		},
		yAxis: {
			title: {
				text: 'Аудитория',
			},
			labels: {
				format: '{value}',
			},
		},
		legend: {
			enabled: true,
		},
		plotOptions: {
			series: {
				cursor: 'pointer',
				point: {
					events: {
						click: function () {
							window.open(this.options.url, '_blank');
						},
					},
				},
			},
			scatter: {
				marker: {
					radius: 2.5,
					symbol: 'circle',
					states: {
						hover: {
							enabled: true,
							lineColor: 'rgb(100,100,100)',
						},
					},
				},
				states: {
					hover: {
						marker: {
							enabled: false,
						},
					},
				},
				jitter: {
					x: 0.005,
				},
			},
		},
		tooltip: {
			formatter: function () {
				const url = this.point.options.url;
				const yDate = this.point.y;
				const name = this.point.options.name;
				return `Источник: ${url}<br/> Автор: ${name}<br/> Аудитория: ${yDate}`;
			},
		},
		series: newData,
	};

	return (
		// <>
		<HighchartsReact
			ref={chartComponent}
			highcharts={Highcharts}
			options={options}
			containerProps={{ style: { width: '100%' } }}
		/>
		/* <div
				className={styles.block__sources}
				style={isViewSource ? { display: 'flex' } : { display: 'none' }}
			>
				{informationGraphData?.values?.map(author => {
					return <p key={Math.random()}>{author.author.fullname}</p>;
				})}
			</div>
		</> */
	);
};
export default ScatterChart;
