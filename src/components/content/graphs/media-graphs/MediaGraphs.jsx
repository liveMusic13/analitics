import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useState } from 'react';
import BubbleChart from './bubble-chart/BubbleChart';
import styles from './MediaGraphs.module.scss';
import SplitBubble from './split-bubble/SplitBubble';

const MediaGraphs = () => {
	const [activeButton, setActiveButton] = useState('automakers');
	const [isViewSplitBubble, setIsViewSplitBubble] = useState(true);
	const [isViewSource, setIsViewSource] = useState(true);

	const handleClick = button => {
		setActiveButton(button);
		if (button === 'automakers') {
			setIsViewSplitBubble(true);
		} else {
			setIsViewSplitBubble(false);
		}
	};

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
							activeButton === 'automakers'
								? styles.activeButton
								: styles.button
						}
						onClick={() => handleClick('automakers')}
					>
						Крупнейшие автопроизводители
					</button>
					<button
						className={
							activeButton === 'grade' ? styles.activeButton : styles.button
						}
						onClick={() => handleClick('grade')}
					>
						Оценка технологических IPO
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
				{/* {isViewRadial ? (
      <RadialBar isViewSource={isViewSource} />
    ) : (
      <Sankey isViewSource={isViewSource} />
    )} */}
				{isViewSplitBubble ? (
					<SplitBubble isViewSource={isViewSource} />
				) : (
					<BubbleChart isViewSource={isViewSource} />
				)}
			</div>
		</div>
	);
};

export default MediaGraphs;
