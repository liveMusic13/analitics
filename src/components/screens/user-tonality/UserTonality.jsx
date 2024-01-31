import { useSelector } from 'react-redux';
import Content from '../../content/Content';
import BeforeSearch from '../../content/before-search/BeforeSearch';
import TonalityGraphs from '../../content/graphs/tonality-graphs/TonalityGraphs';
import Layout from '../../layout/Layout';
import LeftMenu from '../../left-menu/LeftMenu';
import LeftMenuActive from '../../left-menu/left-menu-active/LeftMenuActive';
import Button from '../../ui/button/Button';
import CustomCalendar from '../../ui/custom-calendar/CustomCalendar';
import DataForSearch from '../../ui/data-for-search/DataForSearch';
import styles from './UserTonality.module.scss';

const UserTonality = () => {
	const isActiveMenu = useSelector(store => store.isActiveMenu);
	const userTonalityData = useSelector(store => store.userTonalityData);
	// const dataUser = useSelector(state => state.dataUser);
	const isGraph = useSelector(state => state.isGraph);

	return (
		<Layout>
			<LeftMenu />
			{isActiveMenu.isActiveMenu && <LeftMenuActive />}
			<Content>
				<div className={styles.block__pageName}>
					<h3 className={styles.pageName__title}>Тональный ландшафт</h3>
					<p>
						{userTonalityData
							? userTonalityData.tonality_values.negative_count +
								userTonalityData.tonality_values.positive_count
							: '0'}{' '}
						упоминаний
					</p>
				</div>
				<div className={styles.block__configureSearch}>
					<DataForSearch />
					<CustomCalendar />
					<Button type='submit' buttonFor='request-graf'>
						Запуск
					</Button>
				</div>
				{isGraph.isGraph ? (
					<TonalityGraphs />
				) : (
					<BeforeSearch title='Тональный ландшафт' />
				)}
			</Content>
		</Layout>
	);
};

export default UserTonality;
