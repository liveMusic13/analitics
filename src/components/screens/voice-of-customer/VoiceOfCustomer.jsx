import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useCheckIsGraf } from '../../../hooks/useCheckIsGraf';
import { adaptStringForRequest } from '../../../utils/adaptStringForRequest';
import BeforeSearch from '../../content/before-search/BeforeSearch';
import Content from '../../content/Content';
import VoiceGraf from '../../content/graphs/voice-of-customer/VoiceGraf';
import Layout from '../../layout/Layout';
import LeftMenuActive from '../../left-menu/left-menu-active/LeftMenuActive';
import LeftMenu from '../../left-menu/LeftMenu';
import Button from '../../ui/button/Button';
import CustomCalendar from '../../ui/custom-calendar/CustomCalendar';
import DataForSearch from '../../ui/data-for-search/DataForSearch';
import Field from '../../ui/field/Field';
import Loader from '../../ui/loader/Loader';
import styles from './VoiceOfCustomer.module.scss';

const VoiceOfCustomer = () => {
	const { pathname } = useLocation();
	const isActiveMenu = useSelector(store => store.isActiveMenu);
	const { isLoader } = useSelector(state => state.loadStatus);
	const isGraph = useSelector(state => state.isGraph);
	useCheckIsGraf();

	console.log(adaptStringForRequest('карта, деньги'));
	return (
		<Layout>
			{isLoader && <div className={styles.background__loader}></div>}
			{pathname !== '/' && isActiveMenu.isActiveMenu ? (
				<LeftMenuActive />
			) : (
				<LeftMenu />
			)}
			<Content>
				<h3 className={styles.pageName__title}>Голос клиента</h3>
				<div className={styles.block__configureSearch}>
					<DataForSearch />
					<CustomCalendar />
					<Field placeholder='Поиск по тексту' />
					<Button type='submit' buttonFor='voice-graf'>
						Запуск
					</Button>
				</div>
				{isLoader && <Loader />}
				{isGraph.isGraph ? (
					<VoiceGraf />
				) : (
					<BeforeSearch title='Голос клиента' />
				)}
			</Content>
		</Layout>
	);
};

export default VoiceOfCustomer;
