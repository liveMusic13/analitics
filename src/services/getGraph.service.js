import { $axios } from '../api';

export const getGraph = {
	userTonality: async (data, setErrorData) => {
		try {
			const responce = await $axios.post('/tonality_landscape', data);

			console.log(responce.data);
			return responce.data;
		} catch (error) {
			console.log(error);
			setErrorData(error);
		}
	},
	getInformation: async (data, setErrorData) => {
		try {
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
		}
	},
};
