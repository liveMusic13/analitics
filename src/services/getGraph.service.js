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
			const responce = await $axios.post('/information_graph', data);

			console.log(responce.data);
			return responce.data;
		} catch (error) {
			console.log(error);
		}
	},
};
