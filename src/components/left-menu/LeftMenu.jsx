import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { actions as isActiveMenuAction } from '../../store/is-active-menu/isActiveMenu.slice';
import styles from './LeftMenu.module.scss';

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
							<li className={styles.menu__item}>
								<img src='./images/icons/menu/FAQ.svg' alt='FAQ' />
							</li>
							<li
								className={styles.menu__item}
								onClick={() => {
									dispatch(isActiveMenuAction.toggleActiveMenu(''));
								}}
							>
								<img
									src='./images/icons/menu/change_menu.svg'
									alt='change_menu'
								/>
							</li>
							<li className={styles.menu__item}>
								<img src='./images/icons/menu/logout.svg' alt='logout' />
							</li>
						</ul>
					</nav>
				</div>
			) : (
				<div className={styles.wrapper_menu}></div>
			)}
		</>
	);
};

export default LeftMenu;
