import Cookies from 'js-cookie';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TOKEN } from '../../app.constants';
import { useAuth } from '../../hooks/useAuth';
import { actions as isActiveMenuAction } from '../../store/is-active-menu/isActiveMenu.slice';
import styles from './LeftMenu.module.scss';
import { menuPageData, menuSettings } from './menuPage.data';

const LeftMenu = () => {
	const { pathname } = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { setIsAuth } = useAuth();

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

	// return (
	// 	<>
	// 		{pathname === '/' ? (
	// 			<div className={styles.wrapper_menu}>
	// 				<img className={styles.logo} src='./images/logo.svg' alt='logo' />
	// 				<nav className={styles.menu}>
	// 					<ul className={styles.menu__list}>
	// 						{menuSettings.map(itemMenu => {
	// 							return (
	// 								<li
	// 									key={itemMenu.id}
	// 									className={styles.menu__item}
	// 									onClick={() => {
	// 										if (itemMenu.id === 1)
	// 											dispatch(isActiveMenuAction.toggleActiveMenu(''));
	// 									}}
	// 								>
	// 									<img src={itemMenu.src} alt='change_menu' />
	// 								</li>
	// 							);
	// 						})}
	// 					</ul>
	// 				</nav>
	// 			</div>
	// 		) : (
	// 			<div className={styles.wrapper_menu}>
	// 				<img className={styles.logo} src='/images/logo.svg' alt='logo' />
	// 				<nav className={styles.menu}>
	// 					<ul className={styles.menu__list}>
	// 						{menuPageData.map(itemMenu => {
	// 							return (
	// 								<li
	// 									key={itemMenu.id}
	// 									className={
	// 										// itemMenu.id === 0 && pathname === '/user-tonality'
	// 										pathname === itemMenu.path
	// 											? styles.menu__item_active
	// 											: styles.menu__item
	// 									}
	// 								>
	// 									<img
	// 										src={
	// 											// itemMenu.id === 0 && pathname === '/user-tonality'
	// 											pathname === itemMenu.path
	// 												? itemMenu.src_active
	// 												: itemMenu.src
	// 										}
	// 										alt={itemMenu.title}
	// 									/>
	// 								</li>
	// 							);
	// 						})}
	// 					</ul>
	// 				</nav>
	// 				<nav className={styles.menu}>
	// 					<ul className={styles.menu__list}>
	// 						{menuSettings.map(itemMenu => {
	// 							return (
	// 								<li
	// 									key={itemMenu.id}
	// 									className={styles.menu__item}
	// 									onClick={() => {
	// 										if (itemMenu.id === 1)
	// 											dispatch(isActiveMenuAction.toggleActiveMenu(''));
	// 									}}
	// 								>
	// 									<img src={itemMenu.src} alt={itemMenu.title} />
	// 								</li>
	// 							);
	// 						})}
	// 					</ul>
	// 				</nav>
	// 			</div>
	// 		)}
	// 	</>
	// );

	return (
		<>
			{pathname === '/' ? (
				<div className={styles.wrapper_menu}>
					<Link to='/'>
						<img className={styles.logo} src='./images/logo.svg' alt='logo' />
					</Link>
					{/* <img className={styles.logo} src='./images/logo.svg' alt='logo' /> */}
					<nav className={styles.menu}>
						<ul className={styles.menu__list}>
							{menuSettings.map(itemMenu => {
								if (itemMenu.path) {
									return (
										<li
											key={itemMenu.id}
											className={styles.menu__item}
											onClick={() => {
												if (itemMenu.id === 1)
													dispatch(isActiveMenuAction.toggleActiveMenu(''));
												itemMenu.path ? navigate(itemMenu.path) : undefined;
											}}
										>
											<img src={itemMenu.src} alt='change_menu' />
										</li>
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
											<img src={itemMenu.src} alt='change_menu' />
										</li>
									);
								}
							})}
						</ul>
					</nav>
				</div>
			) : (
				<div className={styles.wrapper_menu}>
					{/* <img className={styles.logo} src='/images/logo.svg' alt='logo' /> */}
					<Link to='/'>
						<img className={styles.logo} src='./images/logo.svg' alt='logo' />
					</Link>
					<nav className={styles.menu}>
						{/* <ul className={styles.menu__list}>
							{menuPageData.map(itemMenu => {
								return (
									<li
										disabled={itemMenu.path === '/none' ? true : false}
										key={itemMenu.id}
										className={
											// itemMenu.id === 0 && pathname === '/user-tonality'
											pathname === itemMenu.path
												? styles.menu__item_active
												: styles.menu__item
										}
										onClick={() =>
											// itemMenu.path ? navigate(itemMenu.path) : undefined
											!(itemMenu.path === '/none') && itemMenu.path
												? navigate(itemMenu.path)
												: undefined
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
						</ul> */}

						<ul className={styles.menu__list}>
							{menuPageData.map(itemMenu => {
								const isDisabled = itemMenu.path === '/none';
								const isActive = pathname === itemMenu.path;

								return (
									<li
										disabled={isDisabled}
										key={itemMenu.id}
										className={
											isActive ? styles.menu__item_active : styles.menu__item
										}
										onClick={() =>
											!isDisabled && itemMenu.path && navigate(itemMenu.path)
										}
										onMouseEnter={() => handleMouseEnter(itemMenu.id)}
										onMouseLeave={handleMouseLeave}
									>
										<img
											src={isActive ? itemMenu.src_active : itemMenu.src}
											alt={itemMenu.title}
										/>
										{isDisabled &&
											itemMenu.path &&
											hoveredItem === itemMenu.id && (
												<p className={styles.not_ready}>В разработке</p>
											)}
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

											if (itemMenu.id === 2) logoutHandler();

											// if (itemMenu.path) {
											// 	navigate(itemMenu.path);
											// }
											if (!(itemMenu.path === '/none') && itemMenu.path) {
												navigate(itemMenu.path);
											}
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
