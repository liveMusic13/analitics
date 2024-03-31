import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsSankey from 'highcharts/modules/sankey';
import { useSelector } from 'react-redux';
import {
	concatData,
	convertDataToSankeyFormat,
} from '../../../../../utils/convertFields';
import { generateColorsForObjects } from '../../../../../utils/generateColors';
import styles from './Sankey.module.scss';

HighchartsSankey(Highcharts);

const Sankey = ({ isViewSource }) => {
	const { data } = useSelector(state => state.dataVoice);
	console.log(data);
	const { nodes, links } = convertDataToSankeyFormat(concatData(data), data);

	// Генерация цветов для узлов
	const colors = generateColorsForObjects(nodes);

	// Присвоение цветов узлам
	for (let i = 0; i < nodes.length; i++) {
		nodes[i].color = colors[i];
	}

	console.log('nodes', nodes);
	console.log('links', links);

	const options = {
		title: {
			text: null,
		},
		accessibility: {
			enabled: false, //HELP: Отключаем модуль доступности
		},
		tooltip: {
			headerFormat: null,
			pointFormat:
				'{point.fromNode.name} \u2192 {point.toNode.name}: {point.weight:.2f} count',
			nodeFormat: '{point.name}: {point.sum:.2f} count',
		},
		series: [
			{
				keys: ['from', 'to', 'weight'],
				nodes: nodes,
				data: links,
				type: 'sankey',
			},
		],
	};

	return (
		<>
			<HighchartsReact
				highcharts={Highcharts}
				options={options}
				containerProps={{ style: { width: '100%', height: '100%' } }}
			/>
			<div
				className={styles.block__sources}
				style={isViewSource ? { display: 'flex' } : { display: 'none' }}
			>
				{[
					...new Set(
						concatData(data).map(item => <p key={Math.random()}>{item.hub}</p>),
					),
				]}
			</div>
		</>
	);
};

export default Sankey;
