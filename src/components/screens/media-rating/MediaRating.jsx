import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useCheckIsGraf } from '../../../hooks/useCheckIsGraf';
import BeforeSearch from '../../content/before-search/BeforeSearch';
import Content from '../../content/Content';
import MediaGraphs from '../../content/graphs/media-graphs/MediaGraphs';
import Layout from '../../layout/Layout';
import LeftMenuActive from '../../left-menu/left-menu-active/LeftMenuActive';
import LeftMenu from '../../left-menu/LeftMenu';
import Button from '../../ui/button/Button';
import CustomCalendar from '../../ui/custom-calendar/CustomCalendar';
import DataForSearch from '../../ui/data-for-search/DataForSearch';
import Loader from '../../ui/loader/Loader';
import styles from './MediaRating.module.scss';

const MediaRating = () => {
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
				<h3 className={styles.pageName__title}>Медиа рейтинг</h3>
				<div className={styles.block__configureSearch}>
					<DataForSearch />
					<CustomCalendar />
					<Button type='submit' buttonFor='media-rating'>
						Запуск
					</Button>
				</div>
				{isLoader && <Loader />}
				{isGraph.isGraph ? (
					<MediaGraphs />
				) : (
					<BeforeSearch title='Медиа рейтинг' />
				)}
			</Content>
		</Layout>
	);
};

export default MediaRating;
