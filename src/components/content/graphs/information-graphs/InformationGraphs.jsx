import * as am5 from '@amcharts/amcharts5';
import * as am5hierarchy from '@amcharts/amcharts5/hierarchy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import styles from './InformationGraphs.module.scss';

const InformationGraphs = () => {
	const [chart, setChart] = useState(null);
	const informationGraphData = useSelector(state => state.informationGraphData);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (chart) {
				chart.dispose();
			}

			const root = am5.Root.new('chartdiv');
			root.setThemes([am5themes_Animated.new(root)]);

			const container = root.container.children.push(
				am5.Container.new(root, {
					width: am5.percent(100),
					height: am5.percent(100),
					layout: root.verticalLayout,
				}),
			);

			const series = container.children.push(
				am5hierarchy.ForceDirected.new(root, {
					downDepth: 1,
					initialDepth: 2,
					topDepth: 1,
					valueField: 'value',
					categoryField: 'name',
					childDataField: 'children',
				}),
			);

			series.outerCircles.template.states.create('disabled', {
				fillOpacity: 0.5,
				strokeOpacity: 0,
				strokeDasharray: 0,
			});

			series.outerCircles.template.states.create('hoverDisabled', {
				fillOpacity: 0.5,
				strokeOpacity: 0,
				strokeDasharray: 0,
			});

			series.nodes.template.events.on('dblclick', function (ev) {
				var data = ev.target.dataItem.dataContext;
				var url = data.url;
				window.open(url);
			});

			// series.data.setAll([
			// 	{
			// 		name: 'Root',
			// 		value: 0,
			// 		children: informationGraphData.values.map(author => {
			// 			return {
			// 				name: author.author.fullname,
			// 				url: author.author.url,
			// 				type: 'values',
			// 				...(author.reposts.length === 0
			// 					? { value: author.author.audienceCount }
			// 					: {
			// 							children: author.reposts.map(repost => ({
			// 								name: repost.fullname,
			// 								value: repost.audienceCount,
			// 								url: repost.url,
			// 								type: 'reposts'
			// 							})),
			// 						}),
			// 			};
			// 		}),
			// 	},
			// ]);

			let data = informationGraphData.values;
			let rootData = {
				name: 'Root',
				value: 0,
				children: [],
			};

			for (let i = 0; i < data.length; i++) {
				let node = {
					name: data[i].author.fullname,
					url: data[i].author.url,
					type: 'values',
					value: data[i].author.audienceCount,
					children: [],
				};

				if (data[i].reposts && data[i].reposts.length !== 0) {
					node.children = data[i].reposts.map(repost => ({
						name: repost.fullname,
						value: repost.audienceCount,
						url: repost.url,
						type: 'reposts',
					}));
				}

				if (i === 0) {
					rootData.children.push(node);
				} else {
					let parent = rootData;
					while (
						parent.children &&
						parent.children.length !== 0 &&
						parent.children[0].type === 'values'
					) {
						parent = parent.children[0];
					}
					parent.children.push(node);
				}
			}

			series.data.setAll([rootData]);

			series.set('selectedDataItem', series.dataItems[0]);

			setChart(root);
		}, 0);
		return () => {
			clearTimeout(timer);
			if (chart) {
				chart.dispose();
			}
		};
	}, []);

	return (
		<TransformWrapper className={styles.test}>
			<TransformComponent>
				<div id='chartdiv' className={styles.chartdiv}></div>
			</TransformComponent>
		</TransformWrapper>
	);
};

export default InformationGraphs;
