import { useDispatch, useSelector } from 'react-redux';
import { useDataFolders } from '../../../hooks/useDataFolders';
import { actions as folderTargetAction } from '../../../store/folder-target/folderTarget.slice';
import { actions as popupDeleteAction } from '../../../store/popup-delete/popupDelete.slice';
import styles from './PopupDelete.module.scss';

const PopupDelete = () => {
	const dispatch = useDispatch();
	const { title, folder, isProcessed, buttonTarget } = useSelector(
		state => state.popupDelete,
	);
	const { data: targetData, allData } = useSelector(
		state => state.folderTarget,
	);
	const { dataDelete } = useDataFolders();

	const onClick = button => {
		if (button === 'stop') {
			dispatch(popupDeleteAction.togglePopupDelete(''));
		} else {
			// const dataForRequest = {
			// 	isFolder: false,
			// 	name: '',
			// };

			const data = {
				isFolder: title === 'Папка' ? true : false,
				name: folder,
				base_files: buttonTarget === 'two' ? false : true,
			};

			if (title === 'Папка') {
				dataDelete(null, data);

				if (buttonTarget === 'two') {
					dispatch(
						folderTargetAction.deleteProcessedFolder({
							name_folder: folder,
						}),
					);
				} else {
					dispatch(
						folderTargetAction.deleteFolder({
							name_folder: folder,
						}),
					);
				}
			} else {
				dataDelete(folder, data);

				if (isProcessed) {
					dispatch(
						folderTargetAction.deleteProcessedData({
							name_folder: targetData.name,
							name_file: folder,
						}),
					);
				} else {
					dispatch(
						folderTargetAction.deleteData({
							name_folder: targetData.name,
							name_file: folder,
						}),
					);
				}
			}
			dispatch(popupDeleteAction.togglePopupDelete(''));

			const timeoutId = setTimeout(() => {
				dispatch(popupDeleteAction.addButtonTarget(''));
			}, 3000);

			return () => clearTimeout(timeoutId);
		}
	};

	return (
		<div className={styles.block__popupDelete}>
			<p>
				{title === 'Папка' ? `${title + ' удалена'}` : `${title + ' удален'}`}
			</p>
			<button className={styles.button__stop} onClick={() => onClick('stop')}>
				Отменить
			</button>
			<button className={styles.button__close} onClick={() => onClick('close')}>
				<img src='/images/icons/exit.svg' alt='exit' />
			</button>
		</div>
	);
};

export default PopupDelete;
