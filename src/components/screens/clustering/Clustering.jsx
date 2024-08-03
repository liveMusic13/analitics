import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useCheckIsGraf } from '../../../hooks/useCheckIsGraf';
import Content from '../../content/Content';
import Layout from '../../layout/Layout';
import LeftMenuActive from '../../left-menu/left-menu-active/LeftMenuActive';
import LeftMenu from '../../left-menu/LeftMenu';
import styles from './Clustering.module.scss';

const Clustering = () => {
	const { pathname } = useLocation();
	const isActiveMenu = useSelector(store => store.isActiveMenu);
	useCheckIsGraf();

	return (
		<Layout>
			{pathname !== '/' && isActiveMenu.isActiveMenu ? (
				<LeftMenuActive />
			) : (
				<LeftMenu />
			)}

			<Content>
				<div className={styles.block__pageName}>
					<h3 className={styles.pageName__title}>Конкуренты</h3>
				</div>
				<iframe
					src='https://projector.tensorflow.org/'
					width='100%'
					height='100%'
					style={{ border: 'none', marginTop: 'calc(30/1000*100vh)' }}
					title='TensorFlow Projector'
				></iframe>
			</Content>
		</Layout>
	);
};

export default Clustering;
