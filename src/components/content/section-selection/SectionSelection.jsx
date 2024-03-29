import SectionInfo from './section-info/SectionInfo';
import { data } from './section-info/sectionInfo.data';
import styles from './SectionSelection.module.scss';

const SectionSelection = () => {
	return (
		<>
			<img
				className={styles.logo}
				src='../images/full_logo.svg'
				alt='full_logo'
			/>
			<p className={styles.description}>Powered by using machine learning</p>
			<h2 className={styles.title}>Выберите нужный раздел</h2>
			<div className={styles.block__choice}>
				{data.map(elemInfo => {
					return (
						<SectionInfo
							key={elemInfo.id}
							image={elemInfo.src}
							text={elemInfo.text}
							path={elemInfo.path}
						/>
					);
				})}
			</div>
		</>
	);
};

export default SectionSelection;
