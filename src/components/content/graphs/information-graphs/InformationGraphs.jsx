import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useState } from 'react';
import styles from './InformationGraphs.module.scss';
import BarInformation from './bar-information/BarInformation';
import Bubbles from './bubbles/Bubbles';
import ScatterChart from './scatter-chart/ScatterChart';

const InformationGraphs = () => {
	const [activeButton, setActiveButton] = useState('dissemination');
	const [isViewSource, setIsViewSource] = useState(true);

	const saveDiagramAsPDF = () => {
		const input = document.getElementById('graph-for-download'); // замените 'myDiagram' на id вашего элемента с диаграммой

		html2canvas(input).then(canvas => {
			const imgData = canvas.toDataURL('image/png');
			const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
			const pageWidth = pdf.internal.pageSize.getWidth();
			const pageHeight = pdf.internal.pageSize.getHeight();

			let imgWidth = canvas.width;
			let imgHeight = canvas.height;
			let ratio = imgWidth / imgHeight;

			let width, height;
			if (pageWidth / pageHeight > ratio) {
				height = pageHeight;
				width = height * ratio;
			} else {
				width = pageWidth;
				height = width / ratio;
			}

			pdf.addImage(imgData, 'PNG', 0, 0, width, height);
			pdf.save('download.pdf');
		});
	};

	return (
		<div className={styles.block__graph}>
			<div className={styles.block__title}>
				<div className={styles.block__buttons}>
					<button
						className={
							activeButton === 'dissemination'
								? styles.activeButton
								: styles.button
						}
						onClick={() => setActiveButton('dissemination')}
					>
						Граф распространения информации
					</button>
					<button
						className={
							activeButton === 'firstTwenty'
								? styles.activeButton
								: styles.button
						}
						onClick={() => setActiveButton('firstTwenty')}
					>
						Динамика распространения
					</button>
					<button
						className={
							activeButton === 'dynamics' ? styles.activeButton : styles.button
						}
						onClick={() => setActiveButton('dynamics')}
					>
						Динамика по авторам
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
				{activeButton === 'firstTwenty' ? (
					<BarInformation isViewSource={isViewSource} />
				) : activeButton === 'dissemination' ? (
					<Bubbles isViewSource={isViewSource} />
				) : (
					<ScatterChart isViewSource={isViewSource} />
				)}
			</div>
		</div>
	);
};

export default InformationGraphs;
