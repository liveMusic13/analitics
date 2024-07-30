import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useCheckIsGraf } from '../../../hooks/useCheckIsGraf';
import { useDataFolders } from '../../../hooks/useDataFolders';
import { actions as popupInFolderAction } from '../../../store/popup-in-folder/popupInFolder.slice';
import Content from '../../content/Content';
import DataSetContent from '../../content/data-set/DataSetContent';
import DataInFolder from '../../content/data-set/folder/data-in-folder/DataInFolder';
import Layout from '../../layout/Layout';
import LeftMenuActive from '../../left-menu/left-menu-active/LeftMenuActive';
import LeftMenu from '../../left-menu/LeftMenu';
import Loader from '../../ui/loader/Loader';
import PopupDelete from '../../ui/popup-delete/PopupDelete';
import PopupInFolder from '../../ui/popup-in-folder/PopupInFolder';
import styles from './DataSet.module.scss';

const DataSet = () => {
	const dispatch = useDispatch();
	const { pathname } = useLocation();
	const isActiveMenu = useSelector(store => store.isActiveMenu);
	const { isLoader } = useSelector(state => state.loadStatus);
	const { isPopupInFolder } = useSelector(state => state.popupInFolder);
	useCheckIsGraf();
	const { data } = useSelector(state => state.folderTarget);
	const { isPopupDelete } = useSelector(state => state.popupDelete);

	const { addFile } = useDataFolders();

	const [fileName, setFileName] = useState('');
	const [file, setFile] = useState(null);

	const handleFileChange = event => {
		const selectedFile = event.target.files[0];

		if (selectedFile) {
			setFile(selectedFile);
			setFileName(selectedFile.name);
		}
	};

	const onClick = () => {
		dispatch(
			popupInFolderAction.addText({
				title: 'Новая папка',
				name_file: isPopupInFolder.name_file,
			}),
		);
		dispatch(popupInFolderAction.togglePopup(''));
	};

	// const addFile = formData => {
	// 	console.log('Sending file to server...', formData, data.name, file);

	// 	fetch(
	// 		`https://tsapi.headsmade.com/upload-file/?folder_name=${encodeURIComponent(
	// 			data.name,
	// 		)}`,
	// 		{
	// 			method: 'POST',
	// 			body: formData,
	// 		},
	// 	)
	// 		.then(response => response.json())
	// 		.then(data => {
	// 			console.log('File uploaded successfully:', data);
	// 		})
	// 		.catch(error => {
	// 			console.error('Error uploading file:', error);
	// 		});
	// };

	useEffect(() => {
		if (file) {
			const formData = new FormData();
			formData.append('uploaded_file', file);

			addFile(formData, data.name, fileName);
			setFile(null);
		}
	}, [file]);

	return (
		<Layout>
			{isPopupInFolder && <PopupInFolder />}
			{(isLoader || isPopupInFolder) && (
				<div className={styles.background__loader}></div>
			)}
			{pathname !== '/' && isActiveMenu.isActiveMenu ? (
				<LeftMenuActive />
			) : (
				<LeftMenu />
			)}

			<Content isFolder={true}>
				<div className={styles.block__pageName}>
					<h3 className={styles.pageName__title}>Данные</h3>
					{pathname === '/data-set' ? (
						<button className={styles.button__title} onClick={onClick}>
							Создать папку
						</button>
					) : (
						<button className={`${styles.button__title} ${styles.download}`}>
							<input
								type='file'
								className={styles.file}
								onChange={handleFileChange}
							/>
							<img
								src='/images/icons/upload_white.svg'
								alt='upload'
								className={styles.upload}
							/>
							Загрузить файл
						</button>
					)}
				</div>
				{pathname === '/data-set' ? <DataSetContent /> : <DataInFolder />}
				{isLoader && <Loader />}
				{isPopupDelete && <PopupDelete />}
			</Content>
		</Layout>
	);
};

export default DataSet;
