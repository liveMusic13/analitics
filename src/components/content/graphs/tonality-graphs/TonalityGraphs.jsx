import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { convertValuesToValue } from '../../../../utils/convertFields';
import styles from './TonalityGraphs.module.scss';
import AuthorsGraph from './authors-graph/AuthorsGraph';
import Mentions from './mentions/Mentions';

const TonalityGraphs = () => {
	const userTonalityData = useSelector(state => state.userTonalityData);
	const [data, setData] = useState(
		convertValuesToValue(userTonalityData.tonality_hubs_values.negative_hubs),
	);
	const [activeButton, setActiveButton] = useState('negative');
	const [isViewSource, setIsViewSource] = useState(true);
	const [isViewAuthors, setIsViewAuthors] = useState(false);

	const handleClick = button => {
		setActiveButton(button);
		if (button === 'tonality') {
			setIsViewAuthors(true);
		} else {
			setIsViewAuthors(false);
		}
	};

	useEffect(() => {
		if (activeButton === 'negative') {
			setData(
				convertValuesToValue(
					userTonalityData.tonality_hubs_values.negative_hubs,
				),
			);
		} else if (activeButton === 'positive') {
			setData(
				convertValuesToValue(
					userTonalityData.tonality_hubs_values.positive_hubs,
				),
			);
		} else {
			setData(
				convertValuesToValue(
					//HELP: Мне данные не нужны в авторах, поэтому просто ставлю это значение, чтобы ошибки не возникало
					userTonalityData.tonality_hubs_values.positive_hubs,
				),
			);
		}
	}, [activeButton]);

	const saveDiagramAsPDF = () => {
		const input = document.getElementById('graph-for-download'); // замените 'myDiagram' на id вашего элемента с диаграммой

		html2canvas(input).then(canvas => {
			const imgData = canvas.toDataURL('image/png');
			const pdf = new jsPDF();
			const width = pdf.internal.pageSize.getWidth(); //TODO: ПРОТЕСТИТЬ ЧТО ВСЕ РАБОТАЕТ ЗДЕСЬ
			const height = pdf.internal.pageSize.getHeight();
			pdf.addImage(imgData, 'PNG', 0, 0, width, height);
			// pdf.addImage(imgData, 'PNG', 0, 0);
			pdf.save('download.pdf');
		});
	};

	return (
		<div className={styles.block__graph}>
			<div className={styles.block__title}>
				<div className={styles.block__buttons}>
					<button
						className={
							activeButton === 'negative' ? styles.activeButton : styles.button
						}
						onClick={() => handleClick('negative')}
					>
						Негативные упоминания (
						{userTonalityData.tonality_values.negative_count})
					</button>
					<button
						className={
							activeButton === 'positive' ? styles.activeButton : styles.button
						}
						onClick={() => handleClick('positive')}
					>
						Позитивные упоминания (
						{userTonalityData.tonality_values.positive_count})
					</button>
					<button
						className={
							activeButton === 'tonality' ? styles.activeButton : styles.button
						}
						onClick={() => handleClick('tonality')}
					>
						Тональность авторов (
						{userTonalityData.negative_authors_values.length +
							userTonalityData.positive_authors_values.length}
						)
					</button>
				</div>
				<div className={styles.block__settings}>
					<button
						className={styles.button__description}
						onClick={() => setIsViewSource(!isViewSource)}
					>
						Скрыть / показать пояснения к графику
					</button>
					<button
						className={styles.button__settings}
						onClick={saveDiagramAsPDF}
					>
						<img src='../images/icons/setting/upload_active.svg' alt='icon' />
					</button>
				</div>
			</div>
			<div className={styles.container__graph} id='graph-for-download'>
				{isViewAuthors ? (
					<AuthorsGraph data={data} isViewSource={isViewSource} />
				) : (
					<Mentions isViewSource={isViewSource} data={data} setData={setData} />
				)}
			</div>
		</div>
	);
};

export default TonalityGraphs;
