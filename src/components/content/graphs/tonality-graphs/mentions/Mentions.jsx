import { useCallback, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from 'recharts';
import { useCheckWidth } from '../../../../../hooks/useCheckWidth';
import styles from './Mentions.module.scss';

const renderActiveShape = props => {
	const RADIAN = Math.PI / 180;
	const {
		cx,
		cy,
		midAngle,
		innerRadius,
		outerRadius,
		startAngle,
		endAngle,
		fill,
		payload,
		percent,
		value,
	} = props;
	const sin = Math.sin(-RADIAN * midAngle);
	const cos = Math.cos(-RADIAN * midAngle);
	const sx = cx + (outerRadius + 10) * cos;
	const sy = cy + (outerRadius + 10) * sin;
	const mx = cx + (outerRadius + 30) * cos;
	const my = cy + (outerRadius + 30) * sin;
	const ex = mx + (cos >= 0 ? 1 : -1) * 22;
	const ey = my;
	const textAnchor = cos >= 0 ? 'start' : 'end';

	return (
		<g>
			<text
				x={cx}
				y={cy}
				dy={8}
				textAnchor='middle'
				fill={fill}
				fontSize={'0.95rem'}
			>
				{payload.name}
			</text>
			<Sector
				cx={cx}
				cy={cy}
				innerRadius={innerRadius}
				outerRadius={outerRadius}
				startAngle={startAngle}
				endAngle={endAngle}
				fill={fill}
			/>
			<Sector
				cx={cx}
				cy={cy}
				startAngle={startAngle}
				endAngle={endAngle}
				innerRadius={outerRadius + 6}
				outerRadius={outerRadius + 10}
				fill={fill}
			/>
			<path
				d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
				stroke={fill}
				fill='none'
			/>
			<circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
			<text
				x={ex + (cos >= 0 ? 1 : -1) * 12}
				y={ey}
				textAnchor={textAnchor}
				fill='#333'
			>{`Количество: ${value}`}</text>
			<text
				x={ex + (cos >= 0 ? 1 : -1) * 12}
				y={ey}
				dy={18}
				textAnchor={textAnchor}
				fill='#999'
			>
				{`(Процент: ${(percent * 100).toFixed(2)}%)`}
			</text>
		</g>
	);
};

const Mentions = ({ isViewSource, data, setData }) => {
	const { windowSize } = useCheckWidth();

	const innerRadius = windowSize.width * 0.055; // 5% от ширины экрана
	const outerRadius = windowSize.width * 0.101; // 9% от ширины экрана

	const [activeIndex, setActiveIndex] = useState(0);
	const [deletedData, setDeletedData] = useState([]);
	const onPieEnter = useCallback(
		(_, index) => {
			setActiveIndex(index);
		},
		[setActiveIndex],
	);

	const onPieClick = useCallback(() => {
		if (activeIndex !== null) {
			const newData = [...data];
			const deletedItem = newData.splice(activeIndex, 1)[0];
			setDeletedData(prevDeletedData => [...prevDeletedData, deletedItem]);
			setData(newData);
			setActiveIndex(null);
		}
	}, [activeIndex, data, setDeletedData, setActiveIndex]);

	const handleRestoreClick = index => {
		const restoredItem = deletedData[index];
		setDeletedData(prevDeletedData =>
			prevDeletedData.filter((_, i) => i !== index),
		);
		setData(prevData => [...prevData, restoredItem]);
	};

	return (
		<>
			<ResponsiveContainer width='100%' height='100%'>
				<PieChart>
					<Pie
						activeIndex={activeIndex}
						activeShape={props => {
							return renderActiveShape(props);
						}}
						data={data}
						cx='50%'
						cy='50%'
						innerRadius={innerRadius}
						outerRadius={outerRadius}
						fill='#8884d8'
						dataKey='value'
						onMouseEnter={onPieEnter}
						onClick={onPieClick}
					>
						{data.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={entry.color} />
						))}
					</Pie>
				</PieChart>
			</ResponsiveContainer>

			<div
				className={styles.block__sources}
				style={isViewSource ? { opacity: 1 } : { opacity: 0 }}
			>
				{deletedData.map((entry, index) => (
					<p
						key={`deleted-${index}`}
						onClick={() => handleRestoreClick(index)}
						style={{ cursor: 'pointer', color: entry.color }}
					>
						{entry.name}
					</p>
				))}
			</div>
		</>
	);
};

export default Mentions;
