import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useCheckIsGraf } from '../../../hooks/useCheckIsGraf';
import Content from '../../content/Content';
import BeforeSearch from '../../content/before-search/BeforeSearch';
import TableAnalytics from '../../content/graphs/table-analytics/TableAnalytics';
import Layout from '../../layout/Layout';
import LeftMenu from '../../left-menu/LeftMenu';
import LeftMenuActive from '../../left-menu/left-menu-active/LeftMenuActive';
import Button from '../../ui/button/Button';
import CustomCalendar from '../../ui/custom-calendar/CustomCalendar';
import DataForSearch from '../../ui/data-for-search/DataForSearch';
import Field from '../../ui/field/Field';
import Loader from '../../ui/loader/Loader';
import styles from './AiAnalytics.module.scss';

const AiAnalytics = () => {
	const { pathname } = useLocation();
	const isActiveMenu = useSelector(store => store.isActiveMenu);
	const { isLoader } = useSelector(state => state.loadStatus);
	const isGraph = useSelector(state => state.isGraph);
	const { get } = useSelector(state => state.aiData);
	useCheckIsGraf();

	return (
		<Layout>
			{isLoader && <div className={styles.background__loader}></div>}
			{pathname !== '/' && isActiveMenu.isActiveMenu ? (
				<LeftMenuActive />
			) : (
				<LeftMenu />
			)}
			<Content graph={true}>
				<div className={styles.block__pageName}>
					<h3 className={styles.pageName__title}>ИИ Анализ</h3>
				</div>
				<div className={styles.block__configureSearch}>
					<DataForSearch />
					<CustomCalendar />
					<Button buttonFor='ai-analytics'>Запуск</Button>
					{get.length !== 0 && (
						<>
							<Field placeholder='Задайте запрос к текстам' />
							<Button buttonFor='ai-analyticsPost'>AI</Button>
						</>
					)}
				</div>
				{isLoader && <Loader />}
				{isGraph.isGraph ? (
					<TableAnalytics />
				) : (
					<BeforeSearch title='ИИ Анализ' />
				)}
			</Content>
		</Layout>
	);
};

export default AiAnalytics;
