import { useDispatch, useSelector } from 'react-redux';
import { actions as isActiveMenuAction } from '../../store/is-active-menu/isActiveMenu.slice';
import { actions as popupAction } from '../../store/popup/popup.slice';
import Popup from '../ui/popup/Popup';
import styles from './Content.module.scss';

const Content = ({ children, graph, isFolder }) => {
	const dispatch = useDispatch();
	const { isPopup, description } = useSelector(state => state.isPopup);

	// const isDataSetPath = /^\/data-set\/[^/]+$/.test(location.pathname);
	const isDataSetPath = /^\/data-set(\/processed)?\/[^/]+$/.test(
		location.pathname,
	);

	const style = {
		paddingRight: graph ? 'calc(28/1440 * 100vw)' : undefined,
		// justifyContent: isFolder ? 'flex-start' : 'center',
		alignItems: isDataSetPath ? 'flex-start' : 'center',
		// alignItems: isFolder ? 'flex-start' : 'center',
	};

	return (
		<div
			className={styles.wrapper_content}
			style={style}
			onClick={() => dispatch(isActiveMenuAction.defaultActiveMenu(''))}
		>
			{isPopup && (
				<>
					<div
						className={styles.background__opacity}
						onClick={() =>
							isPopup ? dispatch(popupAction.defaultPopup('')) : undefined
						}
					></div>
					<Popup text={description} />
				</>
			)}
			{children}
		</div>
	);
};

export default Content;
