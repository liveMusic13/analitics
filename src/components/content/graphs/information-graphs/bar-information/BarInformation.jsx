// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import { useEffect, useRef, useState } from 'react';
// import { useSelector } from 'react-redux';
// import {
// 	convertDateFormat,
// 	convertTimestamp,
// } from '../../../../../utils/convertTimestamp';
// import styles from './BarInformation.module.scss';

// //TODO: РАЗОБРАТЬСЯ ПОЧЕМУ КОГДА АНИМАЦИЯ ДОХОДИТ ДО КОНЦА, ТО ГРАФИКИ ВОЗВРАЩАЮТСЯ К СТАРТОВЫМ ЗНАЧЕНИЯМ. ПРОБЛЕМА СВЯЗАНА С ОБНОВЛЕНИЕМ ДАННЫХ ДЛЯ ГРАФИКА

// const data = {
// 	usa: {
// 		1960: '8996973',
// 		1961: '8996973',
// 		1962: '9351441',
// 		1963: '9543205',
// 		1964: '9744781',
// 		1965: '9956320',
// 		1966: '10174836',
// 	},
// 	russian: {
// 		1960: '89969737',
// 		1961: '91694107',
// 		1962: '93514417',
// 		1963: '95432057',
// 		1964: '97447817',
// 		1965: '99563207',
// 		1966: '101748367',
// 	},
// 	belarus: {
// 		1960: '9969737',
// 		1961: '9694107',
// 		1962: '9351441',
// 		1963: '9543205',
// 		1964: '9744787',
// 		1965: '9956327',
// 		1966: '101748367',
// 	},
// 	china: {
// 		1960: '196973700',
// 		1961: '269410700',
// 		1962: '335144100',
// 		1963: '654320500',
// 		1964: '974478700',
// 		1965: '995632700',
// 		1966: '1017483670',
// 	},
// };

// const BarInformation = ({ isViewSource }) => {
// 	const { dynamicdata_audience } = useSelector(
// 		state => state.informationGraphData,
// 	);
// 	const chartComponent = useRef(null);

// 	console.log(convertDateFormat(convertTimestamp(1706760780)));
// 	// Получить первый объект
// 	let firstObjectKey = Object.keys(data)[0];
// 	let firstObjectValue = data[firstObjectKey];
// 	// Получить первую пару ключ-значение внутри первого объекта
// 	let firstPairKey = Object.keys(firstObjectValue)[0];
// 	let firstPairValue = firstObjectValue[firstPairKey];

// 	console.log(firstObjectKey, firstObjectValue); // выводит "usa" и его значение
// 	console.log(
// 		firstPairKey,
// 		convertDateFormat(convertTimestamp(firstPairValue)),
// 	); // выводит "1960" и его значение

// 	const nbr = 4;
// 	const startYear = 1960;
// 	const endYear = 1966;
// 	const [currentYear, setCurrentYear] = useState(startYear);
// 	const [isPlaying, setIsPlaying] = useState(false);

// 	useEffect(() => {
// 		const FLOAT = /^-?\d+\.?\d*$/;

// 		Highcharts.Fx.prototype.textSetter = function () {
// 			let startValue = this.start.replace(/ /g, ''),
// 				endValue = this.end.replace(/ /g, ''),
// 				currentValue = this.end.replace(/ /g, '');

// 			if ((startValue || '').match(FLOAT)) {
// 				startValue = parseInt(startValue, 10);
// 				endValue = parseInt(endValue, 10);
// 				currentValue = Highcharts.numberFormat(
// 					Math.round(startValue + (endValue - startValue) * this.pos),
// 					0,
// 				);
// 			}

// 			this.elem.endText = this.end;

// 			this.elem.attr(this.prop, currentValue, null, true);
// 		};

// 		Highcharts.SVGElement.prototype.textGetter = function () {
// 			const ct = this.text.element.textContent || '';
// 			return this.endText ? this.endText : ct.substring(0, ct.length / 2);
// 		};

// 		Highcharts.wrap(
// 			Highcharts.Series.prototype,
// 			'drawDataLabels',
// 			function (proceed) {
// 				const attr = Highcharts.SVGElement.prototype.attr,
// 					chart = this.chart;

// 				if (chart.sequenceTimer) {
// 					this.points.forEach(point =>
// 						(point.dataLabels || []).forEach(
// 							label =>
// 								(label.attr = function (hash) {
// 									if (
// 										hash &&
// 										hash.text !== undefined &&
// 										chart.isResizing === 0
// 									) {
// 										const text = hash.text;

// 										delete hash.text;

// 										return this.attr(hash).animate({ text });
// 									}
// 									return attr.apply(this, arguments);
// 								}),
// 						),
// 					);
// 				}

// 				const ret = proceed.apply(
// 					this,
// 					Array.prototype.slice.call(arguments, 1),
// 				);

// 				this.points.forEach(p =>
// 					(p.dataLabels || []).forEach(d => (d.attr = attr)),
// 				);

// 				return ret;
// 			},
// 		);
// 	}, [Highcharts]);

// 	// const getData = year => {
// 	// 	if (!data) {
// 	// 		return [[], []];
// 	// 	}

// 	// 	const output = Object.entries(data)
// 	// 		.map(country => {
// 	// 			const [countryName, countryData] = country;
// 	// 			console.log(country);
// 	// 			return [countryName, Number(countryData[year])];
// 	// 		})
// 	// 		.sort((a, b) => b[1] - a[1]);
// 	// 	console.log([output[0], output.slice(0, nbr)]);
// 	// 	return [output[0], output.slice(0, nbr)];
// 	// };

// 	const getData = year => {
// 		if (!data) {
// 			return [[], []];
// 		}

// 		const output = Object.entries(data)
// 			.map(country => {
// 				const [countryName, countryData] = country;
// 				// console.log(country);
// 				return [countryName, Number(countryData[year])];
// 			})
// 			.sort((a, b) => b[1] - a[1]);
// 		console.log([output[0], output.slice(0, nbr)]);
// 		return [output[0], output.slice(0, nbr)];
// 	};

// 	const getSubtitle = () => {
// 		const population = (getData(currentYear)[0][1] / 1000000000).toFixed(2);
// 		return `<span style="font-size: 80px">${currentYear}</span>
//         <br>
//         <span style="font-size: 22px">
//             Total: <b>: ${population}</b> billion
//         </span>`;
// 	};

// 	const options = {
// 		accessibility: {
// 			enabled: false, // Отключаем модуль доступности
// 		},
// 		chart: {
// 			animation: {
// 				duration: 500,
// 			},
// 			marginRight: 50,
// 		},
// 		title: {
// 			text: 'World population by country',
// 			align: 'left',
// 		},
// 		subtitle: {
// 			useHTML: true,
// 			text: getSubtitle(),
// 			floating: true,
// 			align: 'right',
// 			verticalAlign: 'middle',
// 			y: 80,
// 			x: -100,
// 		},
// 		legend: {
// 			enabled: false,
// 		},
// 		xAxis: {
// 			type: 'category',
// 		},
// 		yAxis: {
// 			opposite: true,
// 			tickPixelInterval: 150,
// 			title: {
// 				text: null,
// 			},
// 		},
// 		plotOptions: {
// 			series: {
// 				animation: false,
// 				groupPadding: 0,
// 				pointPadding: 0.1,
// 				borderWidth: 0,
// 				colorByPoint: true,
// 				dataSorting: {
// 					enabled: true,
// 					matchByName: true,
// 				},
// 				type: 'bar',
// 				dataLabels: {
// 					enabled: true,
// 				},
// 			},
// 		},
// 		series: [
// 			{
// 				type: 'bar',
// 				name: startYear,
// 				data: getData(startYear)[1],
// 			},
// 		],
// 		responsive: {
// 			rules: [
// 				{
// 					condition: {
// 						maxWidth: 550,
// 					},
// 					chartOptions: {
// 						xAxis: {
// 							visible: false,
// 						},
// 						subtitle: {
// 							x: 0,
// 						},
// 						plotOptions: {
// 							series: {
// 								dataLabels: [
// 									{
// 										enabled: true,
// 										y: 8,
// 									},
// 									{
// 										enabled: true,
// 										format: '{point.name}',
// 										y: -8,
// 										style: {
// 											fontWeight: 'normal',
// 											opacity: 0.7,
// 										},
// 									},
// 								],
// 							},
// 						},
// 					},
// 				},
// 			],
// 		},
// 	};

// 	const pause = () => {
// 		setIsPlaying(false);
// 		clearInterval(chartComponent.current.chart.sequenceTimer);
// 		chartComponent.current.chart.sequenceTimer = undefined;
// 	};

// 	const update = increment => {
// 		if (increment) {
// 			setCurrentYear(prev => parseInt(prev, 10) + increment);
// 		}
// 		if (parseInt(currentYear, 10) >= endYear) {
// 			pause();
// 		}

// 		chartComponent.current.chart.update(
// 			{
// 				subtitle: {
// 					text: getSubtitle(),
// 				},
// 			},
// 			false,
// 			false,
// 			false,
// 		);

// 		chartComponent.current.chart.series[0].update({
// 			name: currentYear,
// 			data: getData(currentYear)[1],
// 		});
// 	};

// 	const play = () => {
// 		setIsPlaying(true);
// 		chartComponent.current.chart.sequenceTimer = setInterval(() => {
// 			setCurrentYear(prevYear =>
// 				prevYear < endYear ? prevYear + 1 : prevYear,
// 			);
// 		}, 500); // Изменяет год каждые 500 мс
// 	};

// 	const togglePlay = () => {
// 		if (isPlaying) {
// 			pause();
// 		} else {
// 			if (currentYear === endYear) setCurrentYear(startYear);
// 			play();
// 		}
// 	};

// 	useEffect(() => {
// 		update();
// 	}, [currentYear]);

// 	return (
// 		<div className={styles.wrapper_bar}>
// 			<div className={styles.block__button}>
// 				<button className={styles.button__play} onClick={togglePlay}>
// 					{isPlaying ? '\u2758 \u2758' : '\u25B6'}
// 				</button>
// 				<input
// 					className={styles.range}
// 					type='range'
// 					value={currentYear}
// 					min={startYear}
// 					max={endYear}
// 					onChange={event => setCurrentYear(Number(event.target.value))}
// 				/>
// 			</div>
// 			<HighchartsReact
// 				ref={chartComponent}
// 				highcharts={Highcharts}
// 				options={options}
// 			/>
// 			<div
// 				className={styles.block__sources}
// 				style={isViewSource ? { display: 'flex' } : { display: 'none' }}
// 			>
// 				{Object.keys(dynamicdata_audience).map(key => (
// 					<p key={Math.random()}>{key}</p>
// 				))}
// 			</div>
// 		</div>
// 	);
// };

// export default BarInformation;

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
	convertDateFormat,
	convertTimestamp,
} from '../../../../../utils/convertTimestamp';
import styles from './BarInformation.module.scss';

//TODO: РАЗОБРАТЬСЯ ПОЧЕМУ КОГДА АНИМАЦИЯ ДОХОДИТ ДО КОНЦА, ТО ГРАФИКИ ВОЗВРАЩАЮТСЯ К СТАРТОВЫМ ЗНАЧЕНИЯМ. ПРОБЛЕМА СВЯЗАНА С ОБНОВЛЕНИЕМ ДАННЫХ ДЛЯ ГРАФИКА

const BarInformation = ({ isViewSource }) => {
	const { dynamicdata_audience } = useSelector(
		state => state.informationGraphData,
	);
	const chartComponent = useRef(null);

	const data = convertDataFormat(dynamicdata_audience);

	// Получить первый объект
	let firstObjectKey = Object.keys(data)[0];
	let firstObjectValue = data[firstObjectKey];
	// Получить первую пару ключ-значение внутри первого объекта
	let firstPairKey = Object.keys(firstObjectValue)[0];
	let firstPairValue = firstObjectValue[firstPairKey];
	console.log(firstObjectValue);

	// Получить последний объект
	let lastObjectKey = Object.keys(data)[Object.keys(data).length - 1];
	let lastObjectValue = data[lastObjectKey];

	// Получить последнюю пару ключ-значение внутри последнего объекта
	let lastPairKey =
		Object.keys(lastObjectValue)[Object.keys(lastObjectValue).length - 1];
	let lastPairValue = lastObjectValue[lastPairKey];

	const nbr = 20;
	const startStep = 0;
	const endStep = Object.keys(data[firstObjectKey]).length - 1;
	const [currentStep, setCurrentStep] = useState(startStep);
	const [isPlaying, setIsPlaying] = useState(false);

	// const data = {
	// 	usa: [
	// 		{ year: 1960, value: '8996973' },
	// 		{ year: 1961, value: '8996973' },
	// 		{ year: 1962, value: '9351441' },
	// 		{ year: 1963, value: '9543205' },
	// 		{ year: 1964, value: '9744781' },
	// 		{ year: 1965, value: '9956320' },
	// 		{ year: 1966, value: '10174836' },
	// 	],
	// 	russian: [
	// 		{ year: 1960, value: '89969737' },
	// 		{ year: 1961, value: '91694107' },
	// 		{ year: 1962, value: '93514417' },
	// 		{ year: 1963, value: '95432057' },
	// 		{ year: 1964, value: '97447817' },
	// 		{ year: 1965, value: '99563207' },
	// 		{ year: 1966, value: '101748367' },
	// 	],
	// 	belarus: [
	// 		{ year: 1960, value: '9969737' },
	// 		{ year: 1961, value: '9694107' },
	// 		{ year: 1962, value: '9351441' },
	// 		{ year: 1963, value: '9543205' },
	// 		{ year: 1964, value: '9744787' },
	// 		{ year: 1965, value: '9956327' },
	// 		{ year: 1966, value: '101748367' },
	// 	],
	// 	china: [
	// 		{ year: 1960, value: '196973700' },
	// 		{ year: 1961, value: '269410700' },
	// 		{ year: 1962, value: '335144100' },
	// 		{ year: 1963, value: '654320500' },
	// 		{ year: 1964, value: '974478700' },
	// 		{ year: 1965, value: '995632700' },
	// 		{ year: 1966, value: '1017483670' },
	// 	],
	// };

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

	const getData = index => {
		if (!data) {
			return [[], []];
		}

		const output = Object.entries(data)
			.map(country => {
				const [countryName, countryData] = country;
				return [countryName, Number(countryData[index].value)];
			})
			.sort((a, b) => b[1] - a[1]);
		return [output[0], output.slice(0, nbr)];
	};

	function convertDataFormat(oldData) {
		const newData = {};

		for (const country in oldData) {
			newData[country] = Object.entries(oldData[country]).map(
				([year, value]) => ({
					year: parseInt(year, 10),
					value: value,
				}),
			);
		}

		return newData;
	}

	const getSubtitle = () => {
		// const population = (getData(currentStep)[0][1] / 1000000000).toFixed(2);
		const population = getData(currentStep)[0][1];
		return `<span style="font-size: 2rem">${convertDateFormat(
			convertTimestamp(firstObjectValue[currentStep].year),
		)}</span>
        <br>
        <span style="font-size: 22px">
            Total: <b>: ${population}</b>
        </span>`;
	};

	const options = {
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
			y: 80,
			x: -100,
		},
		legend: {
			enabled: false,
		},
		xAxis: {
			type: 'category',
		},
		yAxis: {
			type: 'datetime',
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
				name: startStep,
				data: getData(startStep)[1],
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
		clearInterval(chartComponent.current.chart.sequenceTimer);
		chartComponent.current.chart.sequenceTimer = undefined;
	};

	const update = increment => {
		if (increment) {
			setCurrentStep(prev => parseInt(prev, 10) + increment);
		}
		if (parseInt(currentStep, 10) >= endStep) {
			pause();
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
			name: currentStep,
			data: getData(currentStep)[1],
		});
	};

	const play = () => {
		setIsPlaying(true);
		chartComponent.current.chart.sequenceTimer = setInterval(() => {
			setCurrentStep(prevYear =>
				prevYear < endStep ? prevYear + 1 : prevYear,
			);
		}, 500); // Изменяет год каждые 500 мс
	};

	const togglePlay = () => {
		if (isPlaying) {
			pause();
		} else {
			if (currentStep === endStep) setCurrentStep(startStep);
			play();
		}
	};

	useEffect(() => {
		update();
	}, [currentStep]);

	return (
		<div className={styles.wrapper_bar}>
			<div className={styles.block__button}>
				<button className={styles.button__play} onClick={togglePlay}>
					{isPlaying ? '\u2758 \u2758' : '\u25B6'}
				</button>
				<input
					className={styles.range}
					type='range'
					value={currentStep}
					min={startStep}
					max={endStep}
					onChange={event => setCurrentStep(Number(event.target.value))}
				/>
			</div>
			<HighchartsReact
				ref={chartComponent}
				highcharts={Highcharts}
				options={options}
			/>
			<div
				className={styles.block__sources}
				style={isViewSource ? { display: 'flex' } : { display: 'none' }}
			>
				{Object.keys(dynamicdata_audience).map(key => (
					<p key={Math.random()}>{key}</p>
				))}
			</div>
		</div>
	);
};

export default BarInformation;
