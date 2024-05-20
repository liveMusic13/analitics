import { useDispatch } from 'react-redux';
import { actions as popupAction } from '../../../store/popup/popup.slice';
import styles from './Popup.module.scss';

const Popup = ({ text }) => {
	const dispatch = useDispatch();

	return (
		<div className={styles.block__popup}>
			<button
				className={styles.button__exit}
				onClick={() => dispatch(popupAction.defaultPopup(''))}
			>
				<img src='../images/icons/exit.svg' alt='exit' />
			</button>
			<p className={styles.text}>{text}</p>
		</div>
	);
};

export default Popup;
