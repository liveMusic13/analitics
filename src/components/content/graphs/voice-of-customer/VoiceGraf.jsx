import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { concatData } from '../../../../utils/convertFields';
import styles from './VoiceGraf.module.scss';
import RadialBar from './radial-bar/RadialBar';
import Sankey from './sankey/Sankey';

const VoiceGraf = () => {
	const [activeButton, setActiveButton] = useState('graf_one');
	const [isViewRadial, setIsViewRadial] = useState(true);
	const [isViewSource, setIsViewSource] = useState(true);

	const { data } = useSelector(state => state.dataVoice);

	const handleClick = button => {
		setActiveButton(button);
		if (button === 'graf_one') {
			setIsViewRadial(true);
		} else {
			setIsViewRadial(false);
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

	concatData(data);

	return (
		<div className={styles.block__graph}>
			<div className={styles.block__title}>
				<div className={styles.block__buttons}>
					<button
						className={
							activeButton === 'graf_one' ? styles.activeButton : styles.button
						}
						onClick={() => handleClick('graf_one')}
					>
						График 1 - Распределение по источникам
					</button>
					<button
						className={
							activeButton === 'graf_two' ? styles.activeButton : styles.button
						}
						onClick={() => handleClick('graf_two')}
					>
						График 2 - Распределение по типам упоминаний
					</button>
				</div>
				<div className={styles.block__settings}>
					{/* <button
						className={styles.button__description}
						onClick={() => setIsViewSource(!isViewSource)}
					>
						Скрыть / показать пояснения к графику
					</button> */}
					<button
						className={styles.button__settings}
						onClick={saveDiagramAsPDF}
					>
						<img src='../images/icons/setting/upload_active.svg' alt='icon' />
					</button>
				</div>
			</div>
			<div className={styles.container__graph} id='graph-for-download'>
				{isViewRadial ? (
					<RadialBar isViewSource={isViewSource} />
				) : (
					<Sankey isViewSource={isViewSource} />
				)}
			</div>
		</div>
	);
};

export default VoiceGraf;
