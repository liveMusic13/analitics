import { useDispatch } from 'react-redux';
import { actions as popupAction } from '../../../store/popup/popup.slice';
import styles from './Popup.module.scss';

const Popup = ({ text, url, time }) => {
	const dispatch = useDispatch();

	return (
		<div className={styles.block__popup}>
			<button
				className={styles.button__exit}
				onClick={() => dispatch(popupAction.defaultPopup(''))}
			>
				<img src='/images/icons/exit.svg' alt='exit' />
			</button>
			{time !== null && <p className={styles.time}>{time}</p>}
			<p className={styles.text}>{text}</p>
			{url !== null && (
				<div className={styles.block__link}>
					<span className={styles.title}>Оригинал сообщения: </span>
					<a href={url} className={styles.link}>
						{url}
					</a>
				</div>
			)}
		</div>
	);
};

export default Popup;
