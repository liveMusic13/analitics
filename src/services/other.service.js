import { $axios } from '../api';
import { actions as folderTargetAction } from '../store/folder-target/folderTarget.slice';
import { actions as loadStatusAction } from '../store/load-status/loadStatus.slice';

// const cache = {};
// const timers = {};

export const otherService = {
	fileLoad: async (data, setErrorData, dispatch) => {
		try {
			dispatch(loadStatusAction.isLoad(true));
			let params;
			if (data.file_name) {
				params = new URLSearchParams({
					folder_name: data.folder_name,
					file_name: data.file_name,
				}).toString();
			} else {
				params = new URLSearchParams({
					folder_name: data.folder_name,
					file_name: '',
				}).toString();
			}
			const response = await $axios.get(`/file-load/?${params}`);
			// const response = await $axios.get(
			// 	`/file-load/?folder_name=Гильдия&file_name=R_13.03.2024-14.03.2024_full.json`,
			// );
			// dispatch(folderTargetAction.addProcessedData(response.data));

			return response.data;
		} catch (error) {
			console.log(error);
			setErrorData(error);
		} finally {
			dispatch(loadStatusAction.isLoad(false));
		}
	},
	getProcessedFiles: async (setErrorData, dispatch) => {
		try {
			dispatch(loadStatusAction.isLoad(true));
			const response = await $axios.get(`/projector-files`);

			dispatch(folderTargetAction.addProcessedData(response.data));

			return response.data;
		} catch (error) {
			console.log(error);
			setErrorData(error);
		} finally {
			dispatch(loadStatusAction.isLoad(false));
		}
	},
	getDataFolders: async (setErrorData, dispatch) => {
		try {
			dispatch(loadStatusAction.isLoad(true));
			const response = await $axios.get(`/data-folders`);

			dispatch(folderTargetAction.addAllData(response.data));

			return response.data;
		} catch (error) {
			console.log(error);
			setErrorData(error);
		} finally {
			dispatch(loadStatusAction.isLoad(false));
		}
	},
	fileRename: async (data, setErrorData, dispatch) => {
		try {
			dispatch(loadStatusAction.isLoad(true));

			const params = new URLSearchParams({
				folder_name: data.folder_name,
				current_file_name: data.current_file_name,
				new_file_name: data.new_file_name,
			}).toString();

			// const response = await $axios.get(`/file-rename`);
			const response = await $axios.get(`/file-rename?${params}`);
			// dispatch(folderTargetAction.addAllData(response.data));
			console.log(response.data);
			return response.data;
		} catch (error) {
			console.log(error);
			setErrorData(error);
		} finally {
			dispatch(loadStatusAction.isLoad(false));
		}
	},
	dataDelete: async (data, setErrorData, dispatch) => {
		try {
			dispatch(loadStatusAction.isLoad(true));

			let params;

			if (data.file_name !== null) {
				params = new URLSearchParams({
					folder_name: data.folder_name,
					file_name: data.file_name,
				}).toString();
			} else {
				params = new URLSearchParams({
					folder_name: data.folder_name,
					base_files: data.base_files,
				}).toString();
			}
			// const params = new URLSearchParams({
			// 	folder_name: data.folder_name,
			// 	file_name: data.file_name,
			// }).toString();

			const response = await $axios.get(`/data-delete?${params}`);
			return response.data;
		} catch (error) {
			console.log(error);
			setErrorData(error);
		} finally {
			dispatch(loadStatusAction.isLoad(false));
		}
	},
	dataAddFile: async (data, name, setErrorData, dispatch, fileName) => {
		try {
			dispatch(loadStatusAction.isLoad(true));

			const response = await $axios.post(
				`/upload-file/?folder_name=${encodeURIComponent(name)}`,
				data,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				},
			);

			dispatch(
				folderTargetAction.addNewFile({
					name_folder: name,
					name_file: fileName,
				}),
			);

			return response.data;
		} catch (error) {
			console.log(error);
			setErrorData(error);
		} finally {
			dispatch(loadStatusAction.isLoad(false));
		}
	},
	createFolder: async (folder, setErrorData, dispatch) => {
		try {
			dispatch(loadStatusAction.isLoad(true));

			const response = await $axios.get(`/create-folder?name=${folder}`);
			return response.data;
		} catch (error) {
			console.log(error);
			setErrorData(error);
		} finally {
			dispatch(loadStatusAction.isLoad(false));
		}
	},
};
