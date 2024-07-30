import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { otherService } from '../services/other.service';
// import { actions as folderTargetAction } from '../store/folder-target/folderTarget.slice';

export const useDataFolders = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [errorData, setErrorData] = useState(null);
	const { data, allData } = useSelector(state => state.folderTarget);
	const popupInFolder = useSelector(state => state.popupInFolder);

	useEffect(() => {
		if (errorData) navigate('/error');
	}, [errorData]);

	const getFileLoad = async data => {
		const response = await otherService.fileLoad(data, setErrorData, dispatch);

		return response;
	};

	const getProcessedData = async () => {
		const response = await otherService.getProcessedFiles(
			setErrorData,
			dispatch,
		);

		// dispatch(folderTargetAction.addAllData(response));
		return response;
	};

	const getDataFolders = async () => {
		const response = await otherService.getDataFolders(setErrorData, dispatch);

		// dispatch(folderTargetAction.addAllData(response));
		return response;
	};

	const fileRename = async value => {
		console.log(value);
		const response = await otherService.fileRename(
			{
				folder_name: data.name,
				current_file_name: popupInFolder.name_file,
				new_file_name: value,
			},
			setErrorData,
			dispatch,
		);

		// dispatch(folderTargetAction.addAllData(response));
		return response;
	};

	const dataDelete = async (file, obj) => {
		const response = await otherService.dataDelete(
			{
				folder_name: obj.isFolder ? obj.name : data.name,
				file_name: file,
				base_files: obj.base_files,
			},
			setErrorData,
			dispatch,
		);

		return response;
	};

	const addFile = async (file, name, fileName) => {
		const response = await otherService.dataAddFile(
			file,
			name,
			setErrorData,
			dispatch,
			fileName,
		);

		return response;
	};

	const createFolderFunc = async folder => {
		const response = await otherService.createFolder(
			folder,
			setErrorData,
			dispatch,
		);

		return response;
	};

	return {
		getDataFolders,
		fileRename,
		dataDelete,
		addFile,
		createFolderFunc,
		getProcessedData,
		getFileLoad,
	};
};
