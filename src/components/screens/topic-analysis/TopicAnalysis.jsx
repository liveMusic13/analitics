import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useCheckIsGraf } from '../../../hooks/useCheckIsGraf';
import Content from '../../content/Content';
import BeforeSearch from '../../content/before-search/BeforeSearch';
import TableAnalysis from '../../content/graphs/table-analysis/TableAnalysis';
import Layout from '../../layout/Layout';
import LeftMenu from '../../left-menu/LeftMenu';
import LeftMenuActive from '../../left-menu/left-menu-active/LeftMenuActive';
import Button from '../../ui/button/Button';
import CustomCalendar from '../../ui/custom-calendar/CustomCalendar';
import DataForSearch from '../../ui/data-for-search/DataForSearch';
import Loader from '../../ui/loader/Loader';
import styles from './TopicAnalysis.module.scss';

const TopicAnalysis = () => {
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
					<h3 className={styles.pageName__title}>Анализ тематик</h3>
				</div>
				<div className={styles.block__configureSearch}>
					<DataForSearch />
					<CustomCalendar />
					<Button buttonFor='topic-analysis'>Запуск</Button>
				</div>
				{isLoader && <Loader />}
				{isGraph.isGraph ? (
					<TableAnalysis />
				) : (
					<BeforeSearch title='Анализ тематик' />
				)}
			</Content>
		</Layout>
	);
};

export default TopicAnalysis;
