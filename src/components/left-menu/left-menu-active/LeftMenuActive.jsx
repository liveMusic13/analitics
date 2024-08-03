import Cookies from 'js-cookie';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TOKEN } from '../../../app.constants';
import { useAuth } from '../../../hooks/useAuth';
import { actions as isActiveMenuAction } from '../../../store/is-active-menu/isActiveMenu.slice';
import { menuPageData, menuSettings } from '../menuPage.data';
import styles from './LeftMenuActive.module.scss';

const LeftMenuActive = () => {
	const { pathname } = useLocation();
	const { setIsAuth } = useAuth();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [hoveredItem, setHoveredItem] = useState(null);

	const handleMouseEnter = id => {
		setHoveredItem(id);
	};

	const handleMouseLeave = () => {
		setHoveredItem(null);
	};

	const logoutHandler = () => {
		Cookies.remove(TOKEN);
		setIsAuth(false);
		navigate('/');
	};

	return (
		<>
			{pathname === '/' ? (
				<div
					className={styles.wrapper_menu}
					style={{ position: 'absolute', left: '-5%', zIndex: '5' }}
				>
					<Link to='/'>
						<img
							className={styles.logo}
							src='./images/full_logo.svg'
							alt='logo'
						/>
					</Link>
					{/* <nav className={styles.menu}>
						<ul className={styles.menu__list}>
							<li className={styles.menu__item}>
								<img src='./images/icons/menu/FAQ.svg' alt='FAQ' /> FAQ
							</li>
							<li
								className={styles.menu__item}
								onClick={() =>
									dispatch(isActiveMenuAction.toggleActiveMenu(''))
								}
							>
								<img
									src='./images/icons/menu/change_menu_exit.svg'
									alt='change_menu'
								/>
								Свернуть меню
							</li>
							<li className={styles.menu__item} onClick={() => logoutHandler()}>
								<img src='./images/icons/menu/logout.svg' alt='logout' />
								Выйти из аккаунта
							</li>
						</ul>
					</nav> */}
					<nav className={styles.menu}>
						<ul className={styles.menu__list_settings}>
							{menuSettings.map(itemMenu => {
								if (itemMenu.path) {
									return (
										<Link
											to={itemMenu.path}
											key={itemMenu.id}
											className={styles.menu__item}
										>
											<img
												src={
													itemMenu.id === 1
														? '../images/icons/menu/change_menu_exit.svg'
														: itemMenu.src
												}
												alt={itemMenu.title}
											/>
											{itemMenu.title}
										</Link>
									);
								} else {
									return (
										<li
											key={itemMenu.id}
											className={styles.menu__item}
											onClick={() => {
												if (itemMenu.id === 1)
													dispatch(isActiveMenuAction.toggleActiveMenu(''));
												if (itemMenu.id === 2) logoutHandler();
											}}
										>
											<img
												src={
													itemMenu.id === 1
														? '../images/icons/menu/change_menu_exit.svg'
														: itemMenu.src
												}
												alt={itemMenu.title}
											/>
											{itemMenu.title}
										</li>
									);
								}
							})}
						</ul>
					</nav>
				</div>
			) : (
				<div
					className={styles.wrapper_menu}
					// style={
					// 	pathname !== '/'
					// 		? { position: 'absolute', left: '-5%', zIndex: '5' }
					// 		: {}
					// }
					style={{ position: 'absolute', left: '-5%', zIndex: '5' }}
					// style={
					// 	pathname !== '/'
					// 		? {
					// 				position: 'absolute',
					// 				left: 'calc(70/1440*100vw)',
					// 				zIndex: '5',
					// 			}
					// 		: {}
					// }
				>
					<Link to='/'>
						<img
							className={styles.logo}
							src='./images/full_logo.svg'
							alt='logo'
						/>
					</Link>
					<nav className={styles.menu}>
						{/* <ul className={styles.menu__list}>
							{menuPageData.map(itemMenu => {
								return (
									<Link
										key={itemMenu.id}
										to={itemMenu.path}
										className={
											pathname === itemMenu.path
												? styles.menu__item_active
												: styles.menu__item
										}
									>
										<img
											src={
												pathname === itemMenu.path
													? itemMenu.src_active
													: itemMenu.src
											}
											alt={itemMenu.title}
										/>
										{itemMenu.title}
									</Link>
								);
							})}
						</ul> */}

						<ul className={styles.menu__list}>
							{menuPageData.map(itemMenu => {
								const isDisabled = itemMenu.path === '/none';
								const isActive = pathname === itemMenu.path;

								return (
									<Link
										disabled={isDisabled}
										key={itemMenu.id}
										to={itemMenu.path}
										className={
											pathname === itemMenu.path
												? styles.menu__item_active
												: styles.menu__item
										}
										onMouseEnter={() => handleMouseEnter(itemMenu.id)}
										onMouseLeave={handleMouseLeave}
									>
										<img
											src={
												pathname === itemMenu.path
													? itemMenu.src_active
													: itemMenu.src
											}
											alt={itemMenu.title}
										/>
										{itemMenu.title}
										{isDisabled &&
											itemMenu.path &&
											hoveredItem === itemMenu.id && (
												<p className={styles.not_ready}>В разработке</p>
											)}
									</Link>
								);
							})}
						</ul>
					</nav>
					<nav className={styles.menu}>
						<ul className={styles.menu__list_settings}>
							{menuSettings.map(itemMenu => {
								if (itemMenu.path) {
									return (
										<Link
											to={itemMenu.path}
											key={itemMenu.id}
											className={
												pathname === itemMenu.path
													? styles.menu__item_active
													: styles.menu__item
											}
											// className={styles.menu__item}
										>
											<img
												src={
													pathname === itemMenu.path
														? itemMenu.src_active
														: itemMenu.src
												}
												alt={itemMenu.title}
											/>
											{itemMenu.title}
										</Link>
									);
								} else {
									return (
										<li
											key={itemMenu.id}
											className={styles.menu__item}
											onClick={() => {
												if (itemMenu.id === 1)
													dispatch(isActiveMenuAction.toggleActiveMenu(''));
												if (itemMenu.id === 2) logoutHandler();
											}}
										>
											<img
												src={
													itemMenu.id === 1
														? '../images/icons/menu/change_menu_exit.svg'
														: itemMenu.src
												}
												alt={itemMenu.title}
											/>
											{itemMenu.title}
										</li>
									);
								}
							})}
						</ul>
					</nav>
				</div>
			)}
		</>
	);
};

export default LeftMenuActive;
