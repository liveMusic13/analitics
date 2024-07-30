import { useDispatch, useSelector } from 'react-redux';
import { actions as popupInFolderAction } from '../../../../store/popup-in-folder/popupInFolder.slice';
import styles from './NoData.module.scss';

const NoData = () => {
	const dispatch = useDispatch();
	const { isPopupInFolder } = useSelector(state => state.popupInFolder);

	const onClick = () => {
		dispatch(
			popupInFolderAction.addText({
				title: 'Новая папка',
				name_file: isPopupInFolder.name_file,
			}),
		);
		dispatch(popupInFolderAction.togglePopup(''));
	};

	return (
		<div className={styles.block__noDat}>
			<h2 className={styles.title}>Здесь пока ничего нет</h2>
			<p className={styles.description}>
				Создайте первую папку, в которой будут храниться файлы для дальнейшей
				обработки
			</p>
			<button onClick={onClick}>Создать папку</button>
		</div>
	);
};

export default NoData;
