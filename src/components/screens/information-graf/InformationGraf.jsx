import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useCheckIsGraf } from '../../../hooks/useCheckIsGraf';
import Content from '../../content/Content';
import BeforeSearch from '../../content/before-search/BeforeSearch';
import InformationGraphs from '../../content/graphs/information-graphs/InformationGraphs';
import Layout from '../../layout/Layout';
import LeftMenu from '../../left-menu/LeftMenu';
import LeftMenuActive from '../../left-menu/left-menu-active/LeftMenuActive';
import AdditionalParameters from '../../ui/additional-parameters/AdditionalParameters';
import Button from '../../ui/button/Button';
import CustomCalendar from '../../ui/custom-calendar/CustomCalendar';
import DataForSearch from '../../ui/data-for-search/DataForSearch';
import Field from '../../ui/field/Field';
import styles from './InformationGraf.module.scss';

const InformationGraf = () => {
	const isActiveMenu = useSelector(store => store.isActiveMenu);
	const { pathname } = useLocation();
	const isGraph = useSelector(state => state.isGraph);
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
					<h3 className={styles.pageName__title}>Информационный граф</h3>
					<p>sdsdfs</p>
				</div>
				<div className={styles.block__configureSearch}>
					<DataForSearch />
					<CustomCalendar />
					<AdditionalParameters />
					<Field placeholder='Поиск по тексту' />
					<Button buttonFor='information-graf'>Запуск</Button>
				</div>
				{isGraph.isGraph ? ( // TODO: ПОТОМ ПОМЕНЯТЬ УСЛОВИЕ ОБРАТНО, БЕЗ ОТРИЦАНИЯ
					<InformationGraphs />
				) : (
					<BeforeSearch title='Информационный граф' />
				)}
			</Content>
		</Layout>
	);
};

export default InformationGraf;
