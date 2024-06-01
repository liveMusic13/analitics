import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useState } from 'react';
import BubbleComparison from './bubble-comparison/BubbleComparison';
import BubbleLineComparison from './bubble-line-comparison/BubbleLineComparison';
import LineDynamic from './line-dynamic/LineDynamic';
import styles from './СompetitiveEnvironment.module.scss';

const СompetitiveEnvironment = () => {
	const [activeButton, setActiveButton] = useState('dynamic');
	const [activeSubcategory, setActiveSubcategory] = useState('Socmedia');
	const [isViewSource, setIsViewSource] = useState(true);

	const handleClick = button => {
		setActiveButton(button);
	};

	const handleClickSubcategory = button => {
		setActiveSubcategory(button);
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
							activeButton === 'dynamic' ? styles.activeButton : styles.button
						}
						onClick={() => handleClick('dynamic')}
					>
						Динамика
					</button>
					<button
						className={
							activeButton === 'bubble' ? styles.activeButton : styles.button
						}
						onClick={() => handleClick('bubble')}
					>
						Сравнение в СМИ и Соцмедиа
					</button>
					<button
						className={
							activeButton === 'bubble-line'
								? styles.activeButton
								: styles.button
						}
						onClick={() => handleClick('bubble-line')}
					>
						Сравнение позитива и негатива
					</button>
				</div>

				<div className={styles.block__subcategory}>
					<button
						className={
							activeSubcategory === 'SMI'
								? styles.activeSubcategory
								: styles.button
						}
						disabled={activeButton === 'dynamic' ? true : false}
						onClick={() =>
							activeButton === 'dynamic'
								? undefined
								: handleClickSubcategory('SMI')
						}
					>
						SMI
					</button>
					<button
						className={
							activeSubcategory === 'Socmedia'
								? styles.activeSubcategory
								: styles.button
						}
						disabled={activeButton === 'dynamic' ? true : false}
						onClick={() =>
							activeButton === 'dynamic'
								? undefined
								: handleClickSubcategory('Socmedia')
						}
					>
						Socmedia
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
				{activeButton === 'dynamic' ? (
					<LineDynamic isViewSource={isViewSource} />
				) : activeButton === 'bubble' ? (
					<>
						<BubbleComparison
							isViewSource={isViewSource}
							one={true}
							activeSubcategory={activeSubcategory}
						/>
						<BubbleComparison
							isViewSource={isViewSource}
							one={false}
							activeSubcategory={activeSubcategory}
						/>
					</>
				) : (
					<>
						<BubbleLineComparison
							isViewSource={isViewSource}
							activeSubcategory={activeSubcategory}
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default СompetitiveEnvironment;
