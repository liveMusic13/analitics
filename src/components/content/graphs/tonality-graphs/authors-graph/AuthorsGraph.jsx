import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import sunburst from 'highcharts/modules/sunburst';
import { useSelector } from 'react-redux';
import { addThreeCircle } from '../../../../../utils/threeCircle';
import styles from './AuthorsGraph.module.scss';

sunburst(Highcharts);

const AuthorsGraph = ({ isViewSource }) => {
	const userTonalityData = useSelector(state => state.userTonalityData);
	const negative = userTonalityData.tonality_hubs_values.negative_hubs;
	const positive = userTonalityData.tonality_hubs_values.positive_hubs;

	const text = () => {
		return (
			<>
				{userTonalityData.negative_authors_values.map(author => (
					<p key={Math.random() + Math.random()}>
						{author.author_data[0].fullname}
					</p>
				))}
				{userTonalityData.positive_authors_values.map(author => (
					<p key={Math.random() + Math.random()}>
						{author.author_data[0].fullname}
					</p>
				))}
			</>
		);
	};

	let childrenNegative = addThreeCircle(
		userTonalityData.negative_authors_values,
		userTonalityData.positive_authors_values,
		negative,
		positive,
	)[0];
	let childrenPositive = addThreeCircle(
		userTonalityData.negative_authors_values,
		userTonalityData.positive_authors_values,
		negative,
		positive,
	)[1];

	const transformData = data => {
		const { negative, positive } = data;

		const positiveColor = '#006400'; // Цвет для позитивных данных
		const negativeColor = '#8B0000'; // Цвет для негативных данных

		const transformedData = [
			{
				id: 'root',
				parent: '',
				name: 'Тональность авторов',
			},
			{
				id: 'negative',
				parent: 'root',
				name: 'Negative',
				color: negativeColor,
			},
			{
				id: 'positive',
				parent: 'root',
				name: 'Positive',
				color: positiveColor,
			},
			...negative.flatMap((item, index) => {
				let childrenObjects = [];

				for (let key in childrenNegative) {
					if (key === item.name) {
						childrenObjects.push(childrenNegative[key]);
					}
				}
				childrenObjects = childrenObjects.flat();

				return [
					{
						id: `negative.${index + 1}`,
						parent: 'negative',
						name: item.name,
						value: item.values,
					},
					...childrenObjects.map(child => ({
						...child,
						parent: `negative.${index + 1}`,
					})),
				];
			}),
			...positive.flatMap((item, index) => {
				let childrenObjects = [];

				for (let key in childrenPositive) {
					if (key === item.name) {
						childrenObjects.push(childrenPositive[key]);
					}
				}
				childrenObjects = childrenObjects.flat();

				return [
					{
						id: `positive.${index + 1}`,
						parent: 'positive',
						name: item.name,
						value: item.values,
					},
					...childrenObjects.map(child => ({
						...child,
						parent: `positive.${index + 1}`,
					})),
				];
			}),
		];

		return transformedData;
	};

	const receivedData = {
		negative: [
			{ name: 'vk.com', values: 5, color: 'hsl(0, 100%, 50%)' },
			{ name: 'banki.ru', values: 1, color: 'hsl(180, 100%, 50%)' },
		],
		positive: [
			{ name: 'privatbankrf.ru', values: 1, color: 'hsl(0, 100%, 50%)' },
			{ name: 'otzovik.com', values: 1, color: 'hsl(180, 100%, 50%)' },
		],
	};

	// Преобразуем полученные данные
	const data = transformData(receivedData);

	// Опции Highcharts
	const options = {
		accessibility: {
			enabled: false, // Отключаем модуль доступности
		},
		chart: {
			height: '56%',
		},
		colors: ['transparent'].concat(Highcharts.getOptions().colors),
		title: {
			text: null,
		},
		subtitle: {
			text: null,
		},
		series: [
			{
				type: 'sunburst',
				data: data,
				name: 'Root',
				allowDrillToNode: true,
				borderRadius: 3,
				cursor: 'pointer',
				dataLabels: {
					format: '{point.name}',
					filter: {
						property: 'innerArcLength',
						operator: '>',
						value: 16,
					},
				},
				levels: [
					{
						level: 1,
						levelIsConstant: false,
						dataLabels: {
							filter: {
								property: 'outerArcLength',
								operator: '>',
								value: 64,
							},
						},
					},
					{
						level: 2,
						colorByPoint: true,
					},
					{
						level: 3,
						colorVariation: {
							key: 'brightness',
							to: -0.5,
						},
					},
					{
						level: 4,
						colorVariation: {
							key: 'brightness',
							to: 0.5,
						},
					},
				],
				point: {
					events: {
						mouseOver: function () {
							const point = this;
							this.graphic.element.addEventListener('dblclick', function () {
								if (point.options && point.options.url) {
									window.open(point.options.url, '_blank');
								}
							});
						},
					},
				},
			},
		],
		tooltip: {
			headerFormat: '',
			pointFormat:
				'Источник - <b>{point.name}</b><br>Количество сообщений - <b>{point.value}</b>',
		},
	};

	const transformedData = transformData({ negative, positive });

	return (
		<>
			<HighchartsReact
				highcharts={Highcharts}
				options={{
					...options,
					series: [{ ...options.series[0], data: transformedData }],
				}}
				containerProps={{ style: { width: '100%', height: '98%' } }}
			/>

			<div
				className={styles.block__sources}
				style={isViewSource ? { display: 'flex' } : { display: 'none' }}
			>
				{/* <p key={Math.random()}>'elem.name'</p> */}
				{text()}
			</div>
		</>
	);
};

export default AuthorsGraph;
