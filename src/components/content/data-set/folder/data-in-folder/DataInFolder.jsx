// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { useDataFolders } from '../../../../../hooks/useDataFolders';
// import { actions as folderTargetAction } from '../../../../../store/folder-target/folderTarget.slice';
// import { actions as popupInFolderAction } from '../../../../../store/popup-in-folder/popupInFolder.slice';
// import styles from './DataInFolder.module.scss';

// const DataInFolder = () => {
// 	const { data, allData } = useSelector(state => state.folderTarget);
// 	const navigate = useNavigate();
// 	const dispatch = useDispatch();
// 	const { dataDelete } = useDataFolders();

// 	const onClick = (file, button) => {
// 		if (button === 'edit') {
// 			dispatch(
// 				popupInFolderAction.addText({
// 					title: 'Редактирование файла',
// 					name_file: file,
// 				}),
// 			);

// 			dispatch(popupInFolderAction.togglePopup(''));
// 		} else if (button === 'delete') {
// 			const data = {
// 				isFolder: false,
// 				name: '',
// 			};
// 			dataDelete(file, data);
// 			dispatch(
// 				folderTargetAction.deleteData({
// 					name_folder: data.name,
// 					name_file: file,
// 				}),
// 			);
// 		}
// 	};

// 	const renderFiles = (data, allData) => {
// 		const folderIndex = allData.values.findIndex(
// 			folder => folder.name === data.name,
// 		);

// 		if (folderIndex !== -1) {
// 			return allData.values[folderIndex];
// 		} else {
// 			return { values: [] };
// 		}
// 	};

// 	const files = renderFiles(data, allData).values;

// 	return (
// 		<div className={styles.wrapper_dataInFolder}>
// 			<button className={styles.button__back} onClick={() => navigate(-1)}>
// 				<img src='/images/icons/arrow_in_folder_left.svg' alt='arrow' />
// 				Назад
// 			</button>
// 			<div className={styles.block__title}>
// 				<h3 className={styles.title}>{data.name}</h3>
// 				<div className={styles.block__field}>
// 					<img
// 						src='/images/icons/input_button/search.svg'
// 						alt='search'
// 						className={styles.image__search}
// 					/>
// 					<input
// 						type='text'
// 						className={styles.input__search}
// 						placeholder='Поиск по названию'
// 					/>
// 				</div>
// 			</div>
// 			<div className={styles.block__files}>
// 				{renderFiles(data, allData).values.map(file => (
// 					<div key={file} className={styles.file}>
// 						<p className={styles.name}>{file}</p>
// 						<div className={styles.block__buttons}>
// 							{/* <button className={styles.button__upload}>
// 								<img src='/images/icons/setting/upload.svg' alt='upload' />
// 							</button> */}
// 							<button
// 								className={styles.button__edit}
// 								onClick={() => onClick(file, 'edit')}
// 							>
// 								<img src='/images/icons/setting/edit.svg' alt='edit' />
// 							</button>
// 							<button
// 								className={styles.button__delete}
// 								onClick={() => onClick(file, 'delete')}
// 							>
// 								<img src='/images/icons/setting/delete.svg' alt='delete' />
// 							</button>
// 						</div>
// 					</div>
// 				))}
// 			</div>
// 		</div>
// 	);
// };

// export default DataInFolder;

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDataFolders } from '../../../../../hooks/useDataFolders';
// import { actions as folderTargetAction } from '../../../../../store/folder-target/folderTarget.slice';
import { actions as popupDeleteAction } from '../../../../../store/popup-delete/popupDelete.slice';
import { actions as popupInFolderAction } from '../../../../../store/popup-in-folder/popupInFolder.slice';
import { downloadFile } from '../../../../../utils/downloadData';
import Pagination from '../../../../ui/pagination/Pagination';
import styles from './DataInFolder.module.scss';

const DataInFolder = () => {
	const { data, allData, processedData } = useSelector(
		state => state.folderTarget,
	);
	const {
		title,
		folder: folderName,
		isPopupDelete,
		buttonTarget,
	} = useSelector(state => state.popupDelete);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [filterText, setFilterText] = useState('');
	const { dataDelete, addFile, getFileLoad } = useDataFolders();
	const [dragging, setDragging] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const filesPerPage = 9;

	const isDataSetPath = /^\/data-set(\/processed)\/[^/]+$/.test(
		location.pathname,
	);
	console.log(isDataSetPath);

	const onClick = async (file, button) => {
		if (button === 'edit') {
			dispatch(
				popupInFolderAction.addText({
					title: 'Редактирование файла',
					name_file: file,
				}),
			);

			dispatch(popupInFolderAction.togglePopup(''));
		} else if (button === 'delete') {
			const dataForRequest = {
				isFolder: false,
				name: '',
			};

			dispatch(
				popupDeleteAction.addTitle({
					folder: file,
					title: 'Файл',
					processed: isDataSetPath ? true : false,
				}),
			);
			dispatch(popupDeleteAction.togglePopupDelete(''));

			// dataDelete(file, dataForRequest);
			// dispatch(
			// 	folderTargetAction.deleteData({
			// 		name_folder: data.name,
			// 		name_file: file,
			// 	}),
			// );
		} else {
			const responseData = await getFileLoad({
				folder_name: data.name,
				file_name: file,
			});
			console.log(responseData);
			// downloadJSON(responseData, file);

			downloadFile(file, responseData);
		}
	};

	const renderFiles = (data, allData) => {
		const folderIndex = allData.values.findIndex(
			folder => folder.name === data.name,
		);

		if (folderIndex !== -1) {
			return allData.values[folderIndex];
		} else {
			return { values: [] };
		}
	};
	const files = renderFiles(
		data,
		isDataSetPath ? processedData : allData,
	).values.filter(file =>
		file.toLowerCase().includes(filterText.toLowerCase()),
	);
	const allFiles = renderFiles(
		data,
		isDataSetPath ? processedData : allData,
	).values;
	// const files = renderFiles(
	// 	data,
	// 	isDataSetPath ? processedData : allData,
	// ).values;

	console.log(
		'all Files: ',
		renderFiles(data, isDataSetPath ? processedData : allData).values,
	);
	console.log('files', files);

	const totalPages = Math.ceil(files.length / filesPerPage);

	const style = {
		block__files: {
			display: allFiles.length > 0 ? 'block' : 'flex',
			justifyContent: allFiles.length > 0 ? undefined : 'center',
			borderTop:
				allFiles.length > 0 ? '1px solid rgba(#1e1e1e, $alpha: 0.04)' : 'none',
		},
		block__field: {
			display: allFiles.length > 0 ? 'flex' : 'none',
		},
	};

	const viewStyle = name => ({
		display: isPopupDelete && folderName === name ? 'none' : 'flex',
	});

	const handleDragOver = event => {
		event.preventDefault();
		setDragging(true);
	};

	const handleDragLeave = () => {
		setDragging(false);
	};

	const handleDrop = event => {
		event.preventDefault();
		setDragging(false);

		const droppedFiles = event.dataTransfer.files;
		if (droppedFiles.length) {
			const formData = new FormData();
			formData.append('uploaded_file', droppedFiles[0]);

			// Предполагается, что у вас есть функция addFile для передачи файла на сервер
			addFile(formData, data.name, droppedFiles[0].name);
			console.log(formData, droppedFiles[0].name);
		}
	};

	const handleFileChange = event => {
		const selectedFile = event.target.files[0];
		if (selectedFile) {
			const formData = new FormData();
			formData.append('uploaded_file', selectedFile);

			// Передача файла на сервер
			addFile(formData, data.name, selectedFile.name);
			// console.log(selectedFile.name);
		}
	};

	const handlePageChange = page => {
		setCurrentPage(page);
	};

	const handleInputChange = event => {
		setFilterText(event.target.value);
	};

	return (
		<div className={styles.wrapper_dataInFolder}>
			<button className={styles.button__back} onClick={() => navigate(-1)}>
				<img src='/images/icons/arrow_in_folder_left.svg' alt='arrow' />
				Назад
			</button>
			<div className={styles.block__title}>
				<h3 className={styles.title}>{data.name}</h3>
				<div className={styles.block__field} style={style.block__field}>
					<img
						src='/images/icons/input_button/search.svg'
						alt='search'
						className={styles.image__search}
					/>
					<input
						type='text'
						className={styles.input__search}
						placeholder='Поиск по названию'
						onChange={handleInputChange}
					/>
				</div>
			</div>
			<div className={styles.block__files} style={style.block__files}>
				{/* {files.length > 0 ? ( */}
				{allFiles.length > 0 ? (
					<>
						{/* {files.map(file => (
							<div key={file} className={styles.file}>
								<p className={styles.name}>{file}</p>
								<div className={styles.block__buttons}>
									<button
										className={styles.button__edit}
										onClick={() => onClick(file, 'edit')}
									>
										<img src='/images/icons/setting/edit.svg' alt='edit' />
									</button>
									<button
										className={styles.button__delete}
										onClick={() => onClick(file, 'delete')}
									>
										<img src='/images/icons/setting/delete.svg' alt='delete' />
									</button>
								</div>
							</div>
						))} */}

						{files
							.slice(
								(currentPage - 1) * filesPerPage,
								currentPage * filesPerPage,
							)
							.map(file => (
								<div key={file} className={styles.file} style={viewStyle(file)}>
									<p className={styles.name}>{file}</p>
									<div className={styles.block__buttons}>
										{isDataSetPath ? (
											<button
												className={styles.button__upload}
												onClick={() => onClick(file, 'upload')}
											>
												<img
													src='/images/icons/setting/upload.svg'
													alt='upload'
												/>
											</button>
										) : (
											<button
												className={styles.button__edit}
												onClick={() => onClick(file, 'edit')}
											>
												<img src='/images/icons/setting/edit.svg' alt='edit' />
											</button>
										)}
										<button
											className={styles.button__delete}
											onClick={() => onClick(file, 'delete')}
										>
											<img
												src='/images/icons/setting/delete.svg'
												alt='delete'
											/>
										</button>
									</div>
								</div>
							))}
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={handlePageChange}
						/>
					</>
				) : (
					<div className={styles.block__add}>
						<h3 className={styles.title__add}>Здесь пока ничего нет</h3>
						<div
							className={`${styles.add__file} ${
								dragging ? styles.dragging : ''
							}`}
							onDragOver={handleDragOver}
							onDragLeave={handleDragLeave}
							onDrop={handleDrop}
						>
							<p className={styles.description}>
								Перетащите файл или выберите на компьютере
							</p>
							<div className={styles.choice__file}>
								<input
									type='file'
									className={styles.input__add}
									onChange={handleFileChange}
								/>
								<p className={styles.choice}>Выбрать файл</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default DataInFolder;
