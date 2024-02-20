import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useRef, useState } from 'react';

const BarInformation = () => {
	const chartComponent = useRef(null);
	const inputRangeRef = useRef(null);
	const buttonRef = useRef(null);

	let sequenceTimer;
	const nbr = 4;
	const startYear = 1960;
	const endYear = 1966;
	const [currentYear, setCurrentYear] = useState(startYear);
	const [isPlaying, setIsPlaying] = useState(false);

	const data = {
		usa: {
			1960: '8996973',
			1961: '8996973',
			1962: '9351441',
			1963: '9543205',
			1964: '9744781',
			1965: '9956320',
			1966: '10174836',
		},
		russian: {
			1960: '89969737',
			1961: '91694107',
			1962: '93514417',
			1963: '95432057',
			1964: '97447817',
			1965: '99563207',
			1966: '101748367',
		},
		belarus: {
			1960: '9969737',
			1961: '9694107',
			1962: '9351441',
			1963: '9543205',
			1964: '9744787',
			1965: '9956327',
			1966: '101748367',
		},
		china: {
			1960: '196973700',
			1961: '269410700',
			1962: '335144100',
			1963: '654320500',
			1964: '974478700',
			1965: '995632700',
			1966: '1017483670',
		},
	};

	useEffect(() => {
		const FLOAT = /^-?\d+\.?\d*$/;

		Highcharts.Fx.prototype.textSetter = function () {
			let startValue = this.start.replace(/ /g, ''),
				endValue = this.end.replace(/ /g, ''),
				currentValue = this.end.replace(/ /g, '');

			if ((startValue || '').match(FLOAT)) {
				startValue = parseInt(startValue, 10);
				endValue = parseInt(endValue, 10);
				currentValue = Highcharts.numberFormat(
					Math.round(startValue + (endValue - startValue) * this.pos),
					0,
				);
			}

			this.elem.endText = this.end;

			this.elem.attr(this.prop, currentValue, null, true);
		};

		Highcharts.SVGElement.prototype.textGetter = function () {
			const ct = this.text.element.textContent || '';
			return this.endText ? this.endText : ct.substring(0, ct.length / 2);
		};

		Highcharts.wrap(
			Highcharts.Series.prototype,
			'drawDataLabels',
			function (proceed) {
				const attr = Highcharts.SVGElement.prototype.attr,
					chart = this.chart;

				if (chart.sequenceTimer) {
					this.points.forEach(point =>
						(point.dataLabels || []).forEach(
							label =>
								(label.attr = function (hash) {
									if (
										hash &&
										hash.text !== undefined &&
										chart.isResizing === 0
									) {
										const text = hash.text;

										delete hash.text;

										return this.attr(hash).animate({ text });
									}
									return attr.apply(this, arguments);
								}),
						),
					);
				}

				const ret = proceed.apply(
					this,
					Array.prototype.slice.call(arguments, 1),
				);

				this.points.forEach(p =>
					(p.dataLabels || []).forEach(d => (d.attr = attr)),
				);

				return ret;
			},
		);
	}, [Highcharts]);

	const getData = year => {
		if (!data) {
			return [[], []];
		}

		const output = Object.entries(data)
			.map(country => {
				const [countryName, countryData] = country;
				return [countryName, Number(countryData[year])];
			})
			.sort((a, b) => b[1] - a[1]);
		return [output[0], output.slice(0, nbr)];
	};

	const getSubtitle = () => {
		const population = (getData(currentYear)[0][1] / 1000000000).toFixed(2);
		return `<span style="font-size: 80px">${currentYear}</span>
        <br>
        <span style="font-size: 22px">
            Total: <b>: ${population}</b> billion
        </span>`;
	};

	const options = {
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
			y: 80,
			x: -100,
		},
		legend: {
			enabled: false,
		},
		// xAxis: {
		// 	// categories: ['Africa', 'America', 'Asia', 'Europe'],
		// 	categories: getObjectNames(data),
		// 	title: {
		// 		text: null,
		// 	},
		// 	lineWidth: 1,
		// },
		xAxis: {
			type: 'category',
		},
		// yAxis: {
		// 	min: 0,
		// 	title: {
		// 		text: 'Population (millions)',
		// 		align: 'high',
		// 	},
		// 	labels: {
		// 		overflow: 'justify',
		// 	},
		// 	gridLineWidth: 1,
		// 	opposite: true,
		// },
		yAxis: {
			opposite: true,
			tickPixelInterval: 150,
			title: {
				text: null,
			},
		},
		// plotOptions: {
		// 	bar: {
		// 		borderRadius: '50%',
		// 		dataLabels: {
		// 			enabled: true,
		// 		},
		// 		groupPadding: 0.1,
		// 	},
		// },
		// series: [
		// 	{
		// 		name: 'Year 1990',
		// 		data: [631, 727, 3202, 721],
		// 	},
		// 	{
		// 		name: 'Year 2000',
		// 		data: [814, 841, 3714, 726],
		// 	},
		// 	{
		// 		name: 'Year 2018',
		// 		data: [1276, 1007, 4561, 746],
		// 	},
		// ],
		// series: transformData(data),
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
	};

	const pause = () => {
		setIsPlaying(false);
		clearTimeout(chartComponent.current.chart.sequenceTimer);
		chartComponent.current.chart.sequenceTimer = undefined;
	};

	const update = increment => {
		if (increment) {
			// setCurrentYear(prevYear => prevYear + increment);
			inputRangeRef.current.value =
				parseInt(inputRangeRef.current.value, 10) + increment;
		}
		if (currentYear >= endYear) {
			setIsPlaying(false);
		}

		chartComponent.current.chart.update(
			{
				subtitle: {
					text: getSubtitle(),
				},
			},
			false,
			false,
			false,
		);

		chartComponent.current.chart.series[0].update({
			name: inputRangeRef.current.value,
			data: getData(inputRangeRef.current.value)[1],
		});
	};

	const play = () => {
		setIsPlaying(true);
		chartComponent.current.chart.sequenceTimer = setInterval(() => {
			// setCurrentYear(prevYear => (prevYear < endYear ? prevYear + 1 : endYear));
			update(1);
		}, 500); // Изменяет год каждые 500 мс
	};

	const togglePlay = () => {
		if (chartComponent.current.chart.sequenceTimer) {
			pause();
		} else {
			play();
		}
	};

	useEffect(() => {
		if (isPlaying) {
			const timer = setInterval(() => {
				setCurrentYear(prevYear =>
					prevYear < endYear ? prevYear + 1 : endYear,
				);
			}, 1000);
			console.log(currentYear);
			return () => clearInterval(timer); // Очищает таймер при остановке воспроизведения
		}

		if (chartComponent.current.chart) {
			chartComponent.current.chart.sequenceTimer = sequenceTimer;
		}
	}, [isPlaying]);

	return (
		<div style={{ width: '100%' }}>
			<button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
			<input
				ref={inputRangeRef}
				type='range'
				value={currentYear}
				min={startYear}
				max={endYear}
				onChange={event => {
					setCurrentYear(event.target.value);
					update();
				}}
			/>
			<HighchartsReact
				ref={chartComponent}
				highcharts={Highcharts}
				options={options}
			/>
		</div>
	);
};

export default BarInformation;
