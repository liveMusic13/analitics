import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { actions as isActiveMenuAction } from '../../store/is-active-menu/isActiveMenu.slice';
import styles from './LeftMenu.module.scss';
import { menuPageData, menuSettings } from './menuPage.data';

const LeftMenu = () => {
	const { pathname } = useLocation();
	const dispatch = useDispatch();

	return (
		<>
			{pathname === '/' ? (
				<div className={styles.wrapper_menu}>
					<img className={styles.logo} src='./images/logo.svg' alt='logo' />
					<nav className={styles.menu}>
						<ul className={styles.menu__list}>
							{menuSettings.map(itemMenu => {
								return (
									<li
										key={itemMenu.id}
										className={styles.menu__item}
										onClick={() => {
											if (itemMenu.id === 1)
												dispatch(isActiveMenuAction.toggleActiveMenu(''));
										}}
									>
										<img src={itemMenu.src} alt='change_menu' />
									</li>
								);
							})}
						</ul>
					</nav>
				</div>
			) : (
				<div className={styles.wrapper_menu}>
					<img className={styles.logo} src='./images/logo.svg' alt='logo' />
					<nav className={styles.menu}>
						<ul className={styles.menu__list}>
							{menuPageData.map(itemMenu => {
								return (
									<li
										key={itemMenu.id}
										className={
											// itemMenu.id === 0 && pathname === '/user-tonality'
											pathname === itemMenu.path
												? styles.menu__item_active
												: styles.menu__item
										}
									>
										<img
											src={
												// itemMenu.id === 0 && pathname === '/user-tonality'
												pathname === itemMenu.path
													? itemMenu.src_active
													: itemMenu.src
											}
											alt={itemMenu.title}
										/>
									</li>
								);
							})}
						</ul>
					</nav>
					<nav className={styles.menu}>
						<ul className={styles.menu__list}>
							{menuSettings.map(itemMenu => {
								return (
									<li
										key={itemMenu.id}
										className={styles.menu__item}
										onClick={() => {
											if (itemMenu.id === 1)
												dispatch(isActiveMenuAction.toggleActiveMenu(''));
										}}
									>
										<img src={itemMenu.src} alt={itemMenu.title} />
									</li>
								);
							})}
						</ul>
					</nav>
				</div>
			)}
		</>
	);
};

export default LeftMenu;
