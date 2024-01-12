import styles from './SectionInfo.module.scss';

const SectionInfo = ({ image, text }) => {
	return (
		<div className={styles.block__sectionInfo}>
			<img src={image} alt={text} />
			<p>{text}</p>
		</div>
	);
};

export default SectionInfo;
