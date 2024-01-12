import styles from './Layout.module.scss';

const Layout = ({ children, justifyContent }) => {
	return (
		<div className={styles.wrapper} style={{ justifyContent: justifyContent }}>
			{children}
		</div>
	);
};

export default Layout;
