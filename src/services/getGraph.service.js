import { $axios } from '../api';

export const getGraph = {
	userTonality: async data => {
		try {
			const responce = await $axios.post('/tonality_landscape', data);

			console.log(responce.data);
			return responce.data;
		} catch (error) {
			console.log(error);
		}
	},
	getInformation: async data => {
		try {
			const responce = await $axios.get(
				`/information_graph?index=${data.index}&min_date=${data.min_data}&max_date=${data.max_data}`,
			);

			console.log(responce.data);
			return responce.data;
		} catch (error) {
			console.log(error);
		}
	},
};
