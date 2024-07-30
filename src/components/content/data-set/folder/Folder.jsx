import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDataFolders } from '../../../../hooks/useDataFolders';
import { actions as folderTargetAction } from '../../../../store/folder-target/folderTarget.slice';
import { actions as popupDeleteAction } from '../../../../store/popup-delete/popupDelete.slice';
import { downloadJSON } from '../../../../utils/downloadData.js';
import styles from './Folder.module.scss';

const Folder = ({ folder, processedFolder, buttonTarget }) => {
	const { data: targetData } = useSelector(state => state.folderTarget);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { dataDelete, getFileLoad } = useDataFolders();
	const [isViewButtons, setIsViewButtons] = useState(false);
	const {
		title,
		folder: folderName,
		isPopupDelete,
	} = useSelector(state => state.popupDelete);

	const handleClick = () => {
		dispatch(folderTargetAction.addTargetFolder(folder));
		if (buttonTarget === 'one') {
			navigate(`/data-set/${folder.name}`);
		} else if (buttonTarget === 'two') {
			navigate(`/data-set/processed/${folder.name}`);
		}
	};

	const onClick = () => {
		const data = {
			isFolder: true,
			name: folder.name,
		};

		dispatch(
			popupDeleteAction.addTitle({
				folder: folder.name,
				title: 'Папка',
			}),
		);
		dispatch(popupDeleteAction.togglePopupDelete(''));
		// dataDelete(null, data);
		// dispatch(
		// 	folderTargetAction.deleteFolder({
		// 		name_folder: folder.name,
		// 	}),
		// );
	};

	const onClickProcessed = async action => {
		if (action === 'delete') {
			const data = {
				isFolder: true,
				name: folder.name,
			};

			dispatch(
				popupDeleteAction.addTitle({ folder: folder.name, title: 'Папка' }),
			);
			dispatch(popupDeleteAction.togglePopupDelete(''));
			// dataDelete(null, data);
			// dispatch(
			// 	folderTargetAction.deleteFolder({
			// 		name_folder: folder.name,
			// 	}),
			// );
		} else {
			const responseData = await getFileLoad({
				folder_name: targetData.name,
				file_name: null,
			});
			console.log(responseData);
			downloadJSON(responseData, targetData.name);
		}
	};

	const viewStyle = {
		display: isPopupDelete && folderName === folder.name ? 'none' : 'block',
	};

	return (
		<div className={styles.block__folder} style={viewStyle}>
			<img
				src='/images/folder.png'
				alt='folder'
				className={styles.folder}
				onClick={handleClick}
			/>
			<div className={styles.data}>
				<h3 className={styles.title}>{folder.name}</h3>
				{processedFolder ? (
					<button
						className={`${styles.button__delete} ${
							processedFolder ? styles.processed : ''
						}`}
						onClick={() => {
							dispatch(folderTargetAction.addTargetFolder(folder));
							setIsViewButtons(!isViewButtons);
							// setIsViewButtons(prevState => !prevState);
						}}
					>
						<img
							className={styles.delete}
							src='/images/icons/settings_for_download_graph.svg'
							alt='delete'
						/>
					</button>
				) : (
					<button className={styles.button__delete} onClick={onClick}>
						<img
							className={styles.delete}
							src='/images/icons/setting/delete.svg'
							alt='delete'
						/>
					</button>
				)}
				{isViewButtons && (
					<div className={styles.block__buttons}>
						<button
							className={styles.button__download}
							onClick={() => onClickProcessed('upload')}
						>
							<img
								className={styles.download}
								src='/images/icons/setting/upload.svg'
								alt='upload'
							/>
							Скачать
						</button>
						<button
							className={styles.button__delete}
							onClick={() => onClickProcessed('delete')}
						>
							<img
								className={styles.delete}
								src='/images/icons/setting/delete.svg'
								alt='delete'
							/>
							Удалить
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Folder;
