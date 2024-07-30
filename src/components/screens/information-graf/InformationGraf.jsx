import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useCheckIsGraf } from '../../../hooks/useCheckIsGraf';
import { countTextAuthors } from '../../../utils/countTextAuthors';
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
import Loader from '../../ui/loader/Loader';
import styles from './InformationGraf.module.scss';

const InformationGraf = () => {
	const isActiveMenu = useSelector(store => store.isActiveMenu);
	const informationGraphData = useSelector(state => state.informationGraphData);
	const { isLoader } = useSelector(state => state.loadStatus);
	const { pathname } = useLocation();
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
					<h3 className={styles.pageName__title}>Информационный граф</h3>
					<p>
						{informationGraphData?.values?.length === 0
							? ''
							: `${countTextAuthors(
									informationGraphData?.values,
								)} текста(ов) и ${
									informationGraphData?.values?.length
								} автора(ов)`}
					</p>
				</div>
				<div className={styles.block__configureSearch}>
					<DataForSearch multi={false} />
					<CustomCalendar multi={false} />
					<AdditionalParameters />
					<Field placeholder='Поиск по тексту' />
					<Button buttonFor='information-graf'>Запуск</Button>
				</div>
				{isLoader && <Loader />}
				{isGraph.isGraph ? (
					<InformationGraphs />
				) : (
					<BeforeSearch title='Информационный граф' />
				)}
			</Content>
		</Layout>
	);
};

export default InformationGraf;
