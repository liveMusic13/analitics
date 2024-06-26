import * as am5 from '@amcharts/amcharts5';
import * as am5hierarchy from '@amcharts/amcharts5/hierarchy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import styles from './Bubbles.module.scss';

const Bubbles = ({ isViewSource }) => {
	const [chart, setChart] = useState(null);
	const informationGraphData = useSelector(state => state.informationGraphData);
	console.log(informationGraphData.values[0]);
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
				am5hierarchy.Tree.new(root, {
					singleBranchOnly: false,
					downDepth: 1,
					initialDepth: 5,
					topDepth: 0,
					valueField: 'value',
					categoryField: 'name',
					childDataField: 'children',
					orientation: 'vertical',
				}),
			);

			series.nodes.template.events.on('dblclick', function (ev) {
				var data = ev.target.dataItem.dataContext;
				var url = data.url;
				window.open(url);
			});

			series.data.setAll([
				{
					name: informationGraphData.values[0].author.fullname,
					url: informationGraphData.values[0].author.url + '',
					value: 0,
					children: informationGraphData.values.map(author => {
						return {
							name: author.author.fullname,
							url: author.author.url,
							type: 'values',
							...(author.reposts.length === 0
								? { value: author.author.audienceCount }
								: {
										children: author.reposts.map(repost => ({
											name: repost.fullname,
											value: repost.audienceCount,
											url: repost.url,
											type: 'reposts',
										})),
									}),
						};
					}),
				},
			]);
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
		// <>
		<TransformWrapper>
			<TransformComponent>
				<div id='chartdiv' className={styles.chartdiv}></div>
			</TransformComponent>
		</TransformWrapper>
		// <div
		// 	className={styles.block__sources}
		// 	style={isViewSource ? { display: 'flex' } : { display: 'none' }}
		// >
		// 	{informationGraphData.values.map(author => {
		// 		return <p key={Math.random()}>{author.author.fullname}</p>;
		// 	})}
		// </div>
		// </>
	);
};

export default Bubbles;
