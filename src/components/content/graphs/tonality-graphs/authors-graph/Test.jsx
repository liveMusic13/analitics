import * as d3 from 'd3';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { truncateDescription } from '../../../../../utils/descriptionLength';
import { addThreeCircle } from '../../../../../utils/threeCircle';
import styles from './AuthorsGraph.module.scss';

const AuthorsGraphTest = ({ isViewSource }) => {
	const SIZE = 1400;
	const RADIUS = SIZE / 2;

	const userTonalityData = useSelector(state => state.userTonalityData);
	const negative = userTonalityData.tonality_hubs_values.negative_hubs;
	const positive = userTonalityData.tonality_hubs_values.positive_hubs;
	const [tooltipContent, setTooltipContent] = useState({ name: '', value: '' });
	const [deletedData, setDeletedData] = useState(['']);

	// const data1 = {
	// 	negative: userTonalityData.negative_authors_values,
	// 	positive: userTonalityData.positive_authors_values,
	// };
	// const blob = new Blob([JSON.stringify(data1)], { type: 'application/json' });
	// const url = URL.createObjectURL(blob);
	// const link = document.createElement('a');
	// link.href = url;
	// link.download = 'data1.json';
	// link.click();

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

	const data = {
		name: 'Авторы',
		children: [
			{
				name: 'Негативные',
				children: [
					...negative.map(elem => {
						let childrenObjects = [];

						for (let key in childrenNegative) {
							if (key === elem.name) {
								childrenObjects.push(childrenNegative[key]);
							}
						}
						childrenObjects = childrenObjects.flat();
						return {
							name: elem.name,
							color: elem.color,
							children: childrenObjects,
						};
					}),
				],
			},
			{
				name: 'Позитивные',
				children: [
					...positive.map(elem => {
						let childrenObjects = [];

						for (let key in childrenPositive) {
							if (key === elem.name) {
								childrenObjects.push(childrenPositive[key]);
							}
						}
						childrenObjects = childrenObjects.flat();
						return {
							name: elem.name,
							color: elem.color,
							children: childrenObjects,
						};
					}),
				],
			},
		],
	};

	const svgRef = useRef(null);
	const [viewBox, setViewBox] = useState('0,0,0,0');

	const partition = data =>
		d3.partition().size([2 * Math.PI, RADIUS])(
			d3
				.hierarchy(data)
				.sum(d => d.value)
				.sort((a, b) => b.value - a.value),
		);

	const color = d3.scaleOrdinal(
		d3.quantize(d3.interpolateRainbow, data.children.length + 1),
	);

	const format = d3.format(',d');

	const arc = d3
		.arc()
		.startAngle(d => d.x0)
		.endAngle(d => d.x1)
		.padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
		.padRadius(RADIUS / 2)
		.innerRadius(d => d.y0)
		.outerRadius(d => d.y1 - 2);

	const getAutoBox = () => {
		if (!svgRef.current) {
			return '';
		}

		const { x, y, width, height } = svgRef.current.getBBox();

		return [x, y, width, height].toString();
	};

	useEffect(() => {
		setViewBox(getAutoBox());
	}, []);

	const getColor = d => {
		if (d.data.color) {
			return d.data.color; // Возвращает цвет из данных
		} else {
			if (d.data.name === 'Позитивные') {
				return '#006400';
			} else if (d.data.name === 'Негативные') {
				return '#8B0000';
			} else {
				while (d.depth > 1) d = d.parent;
				return color(d.data.name);
			}
		}
	};

	const getTextTransform = d => {
		const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
		const y = (d.y0 + d.y1) / 2;
		return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
	};

	const root = partition(data);

	useEffect(() => {
		const items = [];

		// Обходим данные и добавляем объекты в массив
		data.children.forEach(child => {
			child.children.forEach(grandChild => {
				items.push({
					name: grandChild.name,
					color: grandChild.color, // Добавляем цвет
				});
			});
		});

		// Обновляем состояние
		setDeletedData(items);
	}, []);

	return (
		<div className={styles.wrapper_graf}>
			<TransformWrapper>
				<TransformComponent>
					<svg
						width='calc(940 / 1440 * 100vw)'
						height='calc(400 / 1440 * 100vw)'
						viewBox={viewBox}
						ref={svgRef}
					>
						<g fillOpacity={0.6}>
							{root
								.descendants()
								.filter(d => d.depth)
								.map((d, i) => (
									<path
										key={`${d.data.name}-${i}`}
										style={{ cursor: d.data.url ? 'pointer' : 'default' }}
										fill={getColor(d)}
										d={arc(d)}
										onMouseOver={() => {
											setTooltipContent({
												value: `Value: ${d.value}`,
												name: `Name: ${d.data.name}`,
											});
											d3.select(this).style('fill', 'lightblue');
										}}
										onMouseOut={() => {
											setTooltipContent({ name: '', value: '' });
											d3.select(this).style('fill', getColor(d));
										}}
										onClick={() => {
											if (d.data.url) window.open(d.data.url, '_blank');
										}}
									>
										<text>
											{d
												.ancestors()
												.map(d => d.data.name)
												.reverse()
												.join('/')}
											\n${format(d.value)}
										</text>
									</path>
								))}
						</g>
						<g
							pointerEvents='none'
							textAnchor='middle'
							// fontSize={'0.7rem'}
							fontFamily='sans-serif'
						>
							{root
								.descendants()
								.filter(
									d => d.depth && ((d.y0 + d.y1) / 2) * (d.x1 - d.x0) > 10,
								)
								.map((d, i) => (
									<text
										key={`${d.data.name}-${i}`}
										transform={getTextTransform(d)}
										dy='0.35em'
										style={{ fontSize: '0.9rem' }}
									>
										{truncateDescription(d.data.name, 15)}
									</text>
								))}
						</g>
						<text
							x='0%' // Позиционируем текст в центре SVG по горизонтали
							y='0%' // Позиционируем текст в центре SVG по вертикали
							textAnchor='middle' // Центрируем текст относительно его позиции
							dy='.3em' // Смещаем текст немного вниз, чтобы центр текста был в точности в центре SVG
							fontSize={'1.8rem'}
						>
							Тональность авторов
						</text>
					</svg>
				</TransformComponent>
			</TransformWrapper>
			<div
				className={styles.block__sources}
				style={isViewSource ? { opacity: 1 } : { opacity: 0 }}
			>
				{deletedData.map((entry, index) => (
					<p key={`deleted-${index}`} style={{ color: entry.color }}>
						{entry.name}
					</p>
				))}
			</div>
			<div className={styles.tooltip}>
				<p>{tooltipContent.name}</p>
				<p>{tooltipContent.value}</p>
			</div>
		</div>
	);
};

export default AuthorsGraphTest;

// const x = [
// 	{
// 		author_data: [
// 			{
// 				age: '',
// 				author_type: 'Сообщество',
// 				count_texts: 1,
// 				fullname: "Новости банков: кредиты, ипотека, вклады, №578т",
// 				sex: '',
// 				texts: [],
// 				url: "http://vk.com/club220859586"
// 			}
// 		]
// 	},
// 	{
// 		author_data: [
// 			{
// 				age: '',
// 				author_type: 'Сообщество',
// 				count_texts: 1,
// 				fullname: "asdf171080",
// 				sex: '',
// 				texts: [],
// 				url: "http://www.banki.ru/profile/?UID=4214807"
// 			}
// 		]
// 	}
// ]
