import styles from './Content.module.scss';

const Content = ({ children }) => {
	return <div className={styles.wrapper_content}>{children}</div>;
};

export default Content;
