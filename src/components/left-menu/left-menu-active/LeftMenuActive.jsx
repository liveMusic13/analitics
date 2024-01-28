import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import { TOKEN } from '../../../app.constants';
import { useAuth } from '../../../hooks/useAuth';
import styles from './LeftMenuActive.module.scss';

const LeftMenuActive = () => {
	const { pathname } = useLocation();
	const { setIsAuth } = useAuth();
	const navigate = useNavigate();

	const logoutHandler = () => {
		Cookies.remove(TOKEN);
		setIsAuth(false);
		navigate('/');
	};

	return (
		<>
			{pathname === '/' ? (
				<div className={styles.wrapper_menu}>
					<img
						className={styles.logo}
						src='./images/full_logo.svg'
						alt='logo'
					/>
					<nav className={styles.menu}>
						<ul className={styles.menu__list}>
							<li className={styles.menu__item}>
								<img src='./images/icons/menu/FAQ.svg' alt='FAQ' /> FAQ
							</li>
							<li className={styles.menu__item}>
								<img
									src='./images/icons/menu/change_menu_exit.svg'
									alt='change_menu'
								/>
								Свернуть меню
							</li>
							<li className={styles.menu__item} onClick={logoutHandler}>
								<img src='./images/icons/menu/logout.svg' alt='logout' />
								Выйти из аккаунта
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

export default LeftMenuActive;
