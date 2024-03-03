import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useRef } from 'react';
import styles from './ScatterChart.module.scss';

const ScatterChart = ({ isViewSource }) => {
	const chartComponent = useRef(null);

	console.log(Highcharts);

	Highcharts.setOptions({
		colors: [
			'rgba(5,141,199,0.5)',
			'rgba(80,180,50,0.5)',
			'rgba(237,86,27,0.5)',
		],
	});

	const data = [
		{
			name: 'Basketball',
			id: 'basketball',
			marker: {
				symbol: 'circle',
			},
		},
		{
			name: 'Triathlon',
			id: 'triathlon',
			marker: {
				symbol: 'circle',
			},
		},
		{
			name: 'Volleyball',
			id: 'volleyball',
			marker: {
				symbol: 'circle',
			},
		},
	];

	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	data.forEach(s => {
		const data = [];
		for (let i = 0; i < 60; i++) {
			// Добавляем 10 случайных пар значений для каждого вида спорта
			const date = new Date(); // Получаем текущую дату
			date.setHours(getRandomInt(0, 23)); // Устанавливаем случайный час
			date.setMinutes(getRandomInt(0, 59)); // Устанавливаем случайную минуту
			const weight = getRandomInt(50, 100); // Случайный вес в диапазоне от 50 до 100
			data.push([date.getTime(), weight]); // Добавляем время в миллисекундах и вес
		}
		s.data = data;
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
			text: 'Динамика по авторам',
			align: 'center',
		},
		xAxis: {
			type: 'datetime',
			title: {
				text: 'Дата / время',
			},
			// labels: {
			// 	format: '{value}',
			// },
			labels: {
				formatter: function () {
					return Highcharts.dateFormat('%e %b, %H:%M', this.value); // Форматируем метки оси X
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
			pointFormat: 'Height: {point.x} m <br/> Weight: {point.y} kg',
		},
		series: data,
	};

	return (
		<>
			<HighchartsReact
				ref={chartComponent}
				highcharts={Highcharts}
				options={options}
				containerProps={{ style: { width: '100%' } }}
			/>
			<div
				className={styles.block__sources}
				style={isViewSource ? { display: 'flex' } : { display: 'none' }}
			>
				{/* {informationGraphData.values.map(author => {
					return <p key={Math.random()}>{author.author.fullname}</p>;
				})} */}
				<p>sdfsdf</p>
			</div>
		</>
	);
};
export default ScatterChart;
