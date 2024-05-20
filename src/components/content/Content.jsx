import { useDispatch, useSelector } from 'react-redux';
import { actions as isActiveMenuAction } from '../../store/is-active-menu/isActiveMenu.slice';
import Popup from '../ui/popup/Popup';
import styles from './Content.module.scss';

const Content = ({ children, graph }) => {
	const dispatch = useDispatch();
	const { isPopup, description } = useSelector(state => state.isPopup);

	return (
		<div
			className={styles.wrapper_content}
			style={graph ? { paddingRight: 'calc(28/1440 * 100vw)' } : {}}
			onClick={() => dispatch(isActiveMenuAction.defaultActiveMenu(''))}
		>
			{isPopup && (
				<>
					<div className={styles.background__opacity}></div>
					<Popup text={description} />
				</>
			)}
			{children}
		</div>
	);
};

export default Content;
