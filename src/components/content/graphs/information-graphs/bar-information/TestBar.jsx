import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from 'react';
import styles from './BarInformation.module.scss';

const TestBar = () => {
	const startYear = 1960;
	const endYear = 2018;
	const nbr = 20;
	const [dataset, setDataset] = useState(null);
	const [chart, setChart] = useState(null);
	const [inputValue, setInputValue] = useState(startYear);
	const [isPlaying, setIsPlaying] = useState(false);

	const fetchDataset = async () => {
		const response = await fetch(
			'https://demo-live-data.highcharts.com/population.json',
		);
		const data = await response.json();
		console.log(data);
		setDataset(data);
	};

	const getData = year => {
		const output = Object.entries(dataset)
			.map(country => {
				const [countryName, countryData] = country;
				return [countryName, Number(countryData[year])];
			})
			.sort((a, b) => b[1] - a[1]);
		return [output[0], output.slice(1, nbr)];
	};

	const getSubtitle = () => {
		const population = (getData(inputValue)[0][1] / 1000000000).toFixed(2);
		return (
			`<span style="font-size: 80px">${inputValue}</span>` +
			`<br>` +
			`<span style="font-size: 22px">Всего: <b>: ${population}</b> миллиарда</span>`
		);
	};

	useEffect(() => {
		fetchDataset();
	}, []);

	useEffect(() => {
		if (dataset) {
			setChart(
				Highcharts.chart('container', {
					accessibility: {
						enabled: false, // Отключаем модуль доступности
					},
					chart: {
						animation: {
							duration: 500,
						},
						marginRight: 50,
					},
					title: {
						text: 'World population by country',
						align: 'left',
					},
					subtitle: {
						useHTML: true,
						text: getSubtitle(),
						floating: true,
						align: 'right',
						verticalAlign: 'middle',
						y: -80,
						x: -100,
					},

					legend: {
						enabled: false,
					},
					xAxis: {
						type: 'category',
					},
					yAxis: {
						opposite: true,
						tickPixelInterval: 150,
						title: {
							text: null,
						},
					},
					plotOptions: {
						series: {
							animation: false,
							groupPadding: 0,
							pointPadding: 0.1,
							borderWidth: 0,
							colorByPoint: true,
							dataSorting: {
								enabled: true,
								matchByName: true,
							},
							type: 'bar',
							dataLabels: {
								enabled: true,
							},
						},
					},
					series: [
						{
							type: 'bar',
							name: startYear,
							data: getData(startYear)[1],
						},
					],
					responsive: {
						rules: [
							{
								condition: {
									maxWidth: 550,
								},
								chartOptions: {
									xAxis: {
										visible: false,
									},
									subtitle: {
										x: 0,
									},
									plotOptions: {
										series: {
											dataLabels: [
												{
													enabled: true,
													y: 8,
												},
												{
													enabled: true,
													format: '{point.name}',
													y: -8,
													style: {
														fontWeight: 'normal',
														opacity: 0.7,
													},
												},
											],
										},
									},
								},
							},
						],
					},
				}),
			);
		}
	}, [dataset]);

	const pause = () => {
		setIsPlaying(false);
		clearTimeout(chart.sequenceTimer);
		chart.sequenceTimer = undefined;
	};

	const update = increment => {
		if (increment) {
			setInputValue(prevValue => parseInt(prevValue, 10) + increment);
		}

		if (inputValue >= endYear) {
			pause();
		}

		chart.update(
			{
				subtitle: {
					text: getSubtitle(),
				},
			},
			false,
			false,
			false,
		);

		chart.series[0].update({
			name: inputValue,
			data: getData(inputValue)[1],
		});
	};

	const play = () => {
		setIsPlaying(true);
		chart.sequenceTimer = setInterval(() => {
			update(1);
		}, 500);
	};

	const handleButtonClick = () => {
		if (isPlaying) {
			pause();
		} else {
			play();
		}
	};

	const handleRangeInputClick = () => {
		update();
	};

	return (
		<div className={styles.highcharts_figure}>
			<button id='play-pause-button' onClick={handleButtonClick}>
				{isPlaying ? 'Пауза' : 'Воспроизвести'}
			</button>
			<div id='container'>
				<input
					id='play-range'
					type='range'
					min={startYear}
					max={endYear}
					value={inputValue}
					onChange={e => setInputValue(e.target.value)}
					onClick={handleRangeInputClick}
				/>
				<HighchartsReact highcharts={Highcharts} />
			</div>
		</div>
	);
};

export default TestBar;
