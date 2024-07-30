import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useCheckIsGraf } from '../../../hooks/useCheckIsGraf';
import BeforeSearch from '../../content/before-search/BeforeSearch';
import Content from '../../content/Content';
import СompetitiveEnvironment from '../../content/graphs/competitive-environment/СompetitiveEnvironment';
import Layout from '../../layout/Layout';
import LeftMenuActive from '../../left-menu/left-menu-active/LeftMenuActive';
import LeftMenu from '../../left-menu/LeftMenu';
import Button from '../../ui/button/Button';
import CustomCalendar from '../../ui/custom-calendar/CustomCalendar';
import DataForSearch from '../../ui/data-for-search/DataForSearch';
import Loader from '../../ui/loader/Loader';
import styles from './Competitive.module.scss';

const Competitive = () => {
	const { pathname } = useLocation();
	const isActiveMenu = useSelector(store => store.isActiveMenu);
	const { isLoader } = useSelector(state => state.loadStatus);
	const isGraph = useSelector(state => state.isGraph);
	useCheckIsGraf();

	return (
		<Layout>
			{isLoader && <div className={styles.background__loader}></div>}
			{pathname !== '/' && isActiveMenu.isActiveMenu ? (
				<LeftMenuActive />
			) : (
				<LeftMenu />
			)}

			<Content>
				<div className={styles.block__pageName}>
					<h3 className={styles.pageName__title}>Конкуренты</h3>
				</div>
				<div className={styles.block__configureSearch}>
					<DataForSearch multi={true} />
					<CustomCalendar multi={true} />
					<Button buttonFor='competitive'>Запуск</Button>
				</div>
				{isLoader && <Loader />}
				{isGraph.isGraph ? (
					<СompetitiveEnvironment />
				) : (
					<BeforeSearch title='Конкуренты' />
				)}
			</Content>
		</Layout>
	);
};

export default Competitive;
