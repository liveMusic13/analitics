import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDataFolders } from '../../../hooks/useDataFolders';
import { actions as folderTargetAction } from '../../../store/folder-target/folderTarget.slice';
import { actions as popupInFolderAction } from '../../../store/popup-in-folder/popupInFolder.slice';
import styles from './PopupInFolder.module.scss';

const PopupInFolder = () => {
	const dispatch = useDispatch();
	const popupInFolder = useSelector(state => state.popupInFolder);
	const { data, allData } = useSelector(state => state.folderTarget);
	const [value, setValue] = useState(
		popupInFolder.title === 'Новая папка' ? '' : popupInFolder.name_file,
	);
	const { fileRename, createFolderFunc } = useDataFolders();

	const onChange = e => {
		setValue(e.target.value);
	};

	const onClick = () => {
		fileRename(value);
		dispatch(
			folderTargetAction.addNewText({
				value,
				name_folder: data.name,
				name_file: popupInFolder.name_file,
			}),
		);
		dispatch(
			popupInFolderAction.addText({
				title: 'Редактирование файла',
				name_file: value,
			}),
		);
		dispatch(popupInFolderAction.togglePopup(''));
	};

	const onClick_folder = () => {
		createFolderFunc(value);

		dispatch(
			folderTargetAction.createFolder({
				name: value,
			}),
		);

		dispatch(popupInFolderAction.togglePopup(''));
	};

	return (
		<div className={styles.block__popup}>
			<div className={styles.block__title}>
				<h4 className={styles.title}>{popupInFolder.title}</h4>
				<button
					className={styles.button__exit}
					onClick={() => dispatch(popupInFolderAction.togglePopup(''))}
				>
					<img src='/images/icons/exit.svg' alt='exit' />
				</button>
			</div>
			<input
				type='text'
				className={styles.input}
				value={value}
				placeholder={
					popupInFolder.title === 'Новая папка' ? 'Название папки' : ''
				}
				onChange={onChange}
			/>
			<button
				className={styles.button__title}
				onClick={
					popupInFolder.title === 'Новая папка' ? onClick_folder : onClick
				}
			>
				Сохранить
			</button>
		</div>
	);
};

export default PopupInFolder;
