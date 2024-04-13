import { $axios } from '../api';
import { actions as loadStatusAction } from '../store/load-status/loadStatus.slice';

export const getGraph = {
	userTonality: async (data, setErrorData, dispatch) => {
		try {
			dispatch(loadStatusAction.isLoad(true));

			const responce = await $axios.get(
				`/tonality_landscape?index=${data.index}&min_date=${data.min_data}&max_date=${data.max_data}`,
			);

			console.log(responce.data);
			return responce.data;
		} catch (error) {
			console.log(error);
			setErrorData(error);
		} finally {
			dispatch(loadStatusAction.isLoad(false));
		}
	},
	themes: async (data, setErrorData, dispatch) => {
		try {
			dispatch(loadStatusAction.isLoad(true));
			console.log(data);
			const responce = await $axios.get(
				`/themes?index=${data.index}&min_date=${data.min_data}&max_date=${data.max_data}`,
			);

			console.log(responce.data);
			return responce.data;
		} catch (error) {
			console.log(error);
			setErrorData(error);
		} finally {
			dispatch(loadStatusAction.isLoad(false));
		}
	},
	media: async (data, setErrorData, dispatch) => {
		try {
			dispatch(loadStatusAction.isLoad(true));
			console.log(data);
			const responce = await $axios.get(
				`/media-rating?index=${data.index}&min_date=${data.min_data}&max_date=${data.max_data}`,
			);

			console.log(responce.data);
			return responce.data;
		} catch (error) {
			console.log(error);
			setErrorData(error);
		} finally {
			dispatch(loadStatusAction.isLoad(false));
		}
	},
	getVoice: async (data, setErrorData, dispatch) => {
		try {
			dispatch(loadStatusAction.isLoad(true));

			const response = await $axios.get(
				`/voice?index=${data.index}&min_date=${data.min_data}&max_date=${data.max_data}&query_str=${data.query_str}`,
			);

			return response.data;
		} catch (error) {
			console.log(error);
			setErrorData(error);
		} finally {
			dispatch(loadStatusAction.isLoad(false));
		}
	},
	getInformation: async (data, setErrorData, dispatch) => {
		try {
			dispatch(loadStatusAction.isLoad(true));
			// const responce = await $axios.get(
			// 	`/information_graph?index=${data.index}&min_date=${data.min_data}&max_date=${data.max_data}`,
			// );
			const params = {
				index: data.index,
				min_date: data.min_data,
				max_date: data.max_data,
				post: data.post,
				repost: data.repost,
				SMI: data.SMI,
				query_str: data.query_str,
				// Добавьте любые другие параметры здесь
			};

			// Удалите параметры, которые не были предоставлены
			Object.keys(params).forEach(
				key =>
					(params[key] === false || params[key] === '') && delete params[key],
			);

			// Преобразуйте объект параметров в строку запроса
			const queryString = new URLSearchParams(params).toString();

			const response = await $axios.get(`/information_graph?${queryString}`);

			console.log(response.data);
			return response.data;
		} catch (error) {
			console.log(error);
			setErrorData(error);
		} finally {
			dispatch(loadStatusAction.isLoad(false));
		}
	},
};
