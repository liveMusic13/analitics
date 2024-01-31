import { Link } from 'react-router-dom';
import styles from './SectionInfo.module.scss';

const SectionInfo = ({ image, text, path }) => {
	return (
		<Link to={path} className={styles.block__sectionInfo}>
			<img src={image} alt={text} />
			<p>{text}</p>
		</Link>
	);
};

export default SectionInfo;
