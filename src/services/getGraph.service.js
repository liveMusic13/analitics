import { $axios } from '../api';
import { actions as dataAIAction } from '../store/data-ai/dataAI.slice';
import { actions as dataForRequestAction } from '../store/data-for-request/dataForRequest.slice';
import { actions as loadStatusAction } from '../store/load-status/loadStatus.slice';

const cache = {};
const timers = {};

export const getGraph = {
	userTonality: async (data, setErrorData, dispatch) => {
		try {
			dispatch(loadStatusAction.isLoad(true));

			const cacheKey = JSON.stringify(data); //HELP: кэширование
			if (cache[cacheKey]) {
				return cache[cacheKey];
			}

			const response = await $axios.get(
				`/tonality_landscape?index=${data.index}&min_date=${data.min_data}&max_date=${data.max_data}`,
			);

			console.log(response.data);
			cache[cacheKey] = response.data;

			if (timers[cacheKey]) {
				//HELP: таймер очистки кэша
				clearTimeout(timers[cacheKey]);
			}
			timers[cacheKey] = setTimeout(
				() => {
					delete cache[cacheKey];
					delete timers[cacheKey];
				},
				10 * 60 * 1000,
			);

			return response.data;
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

			const cacheKey = JSON.stringify(data);
			if (cache[cacheKey]) {
				return cache[cacheKey];
			}

			console.log(data);
			const response = await $axios.get(
				`/themes?index=${data.index}&min_date=${data.min_data}&max_date=${data.max_data}`,
			);

			console.log(response.data);
			cache[cacheKey] = response.data;

			if (timers[cacheKey]) {
				//HELP: таймер очистки кэша
				clearTimeout(timers[cacheKey]);
			}
			timers[cacheKey] = setTimeout(
				() => {
					delete cache[cacheKey];
					delete timers[cacheKey];
				},
				10 * 60 * 1000,
			);

			return response.data;
		} catch (error) {
			console.log(error);
			setErrorData(error);
		} finally {
			dispatch(loadStatusAction.isLoad(false));
		}
	},
	aiAnalyticsGET: async (data, setErrorData, dispatch) => {
		try {
			dispatch(loadStatusAction.isLoad(true));
			dispatch(
				dataAIAction.addAiDataPOST({
					promt: '',
					texts: [],
				}),
			); //HELP: для того чтобы при новом выборе даты и базы данных, исчезала таблица пост запроса

			const cacheKey = JSON.stringify(data);
			if (cache[cacheKey]) {
				return cache[cacheKey];
			}

			console.log(data);
			const response = await $axios.get(
				`/ai-analytics?index=${data.index}&min_date=${data.min_date}&max_date=${data.max_date}`,
			);

			console.log(response.data);
			cache[cacheKey] = response.data.data;

			if (timers[cacheKey]) {
				//HELP: таймер очистки кэша
				clearTimeout(timers[cacheKey]);
			}
			timers[cacheKey] = setTimeout(
				() => {
					delete cache[cacheKey];
					delete timers[cacheKey];
				},
				10 * 60 * 1000,
			);

			return response.data.data;
		} catch (error) {
			console.log(error);
			setErrorData(error);
		} finally {
			dispatch(loadStatusAction.isLoad(false));
		}
	},
	aiAnalyticsPOST: async (data, setErrorData, dispatch) => {
		try {
			dispatch(loadStatusAction.isLoad(true));

			const cacheKey = JSON.stringify(data);
			if (cache[cacheKey]) {
				return cache[cacheKey];
			}

			console.log(data);
			const response = await $axios.post('/ai-analytics', {
				index: data.index,
				min_date: data.min_date,
				max_date: data.max_date,
				promt: data.promt,
				texts_ids: data.texts_ids,
			});

			console.log(response.data);
			cache[cacheKey] = response.data;

			if (timers[cacheKey]) {
				//HELP: таймер очистки кэша
				clearTimeout(timers[cacheKey]);
			}
			timers[cacheKey] = setTimeout(
				() => {
					delete cache[cacheKey];
					delete timers[cacheKey];
				},
				10 * 60 * 1000,
			);

			dispatch(dataForRequestAction.toggleInfo(''));
			setTimeout(() => dispatch(dataForRequestAction.toggleInfo('')), 3500);

			return response.data;
		} catch (error) {
			console.log(error);
			setErrorData(error);
		} finally {
			dispatch(loadStatusAction.isLoad(false));
		}
	},
	competitive: async (data, setErrorData, dispatch) => {
		try {
			dispatch(loadStatusAction.isLoad(true));

			const cacheKey = JSON.stringify(data);
			if (cache[cacheKey]) {
				return cache[cacheKey];
			}

			const response = await $axios.post('/competitors', {
				themes_ind: data.themes_ind,
				min_date: data.min_date,
				max_date: data.max_date,
			});

			console.log(response.data);
			cache[cacheKey] = response.data;

			if (timers[cacheKey]) {
				//HELP: таймер очистки кэша
				clearTimeout(timers[cacheKey]);
			}
			timers[cacheKey] = setTimeout(
				() => {
					delete cache[cacheKey];
					delete timers[cacheKey];
				},
				10 * 60 * 1000,
			);
			console.log(response.data);
			return response.data;
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

			const cacheKey = JSON.stringify(data);
			if (cache[cacheKey]) {
				return cache[cacheKey];
			}

			console.log(data);
			const response = await $axios.get(
				`/media-rating?index=${data.index}&min_date=${data.min_data}&max_date=${data.max_data}`,
			);

			console.log(response.data);
			cache[cacheKey] = response.data;

			if (timers[cacheKey]) {
				//HELP: таймер очистки кэша
				clearTimeout(timers[cacheKey]);
			}
			timers[cacheKey] = setTimeout(
				() => {
					delete cache[cacheKey];
					delete timers[cacheKey];
				},
				10 * 60 * 1000,
			);

			return response.data;
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

			const cacheKey = JSON.stringify(data);
			if (cache[cacheKey]) {
				return cache[cacheKey];
			}

			const response = await $axios.get(
				`/voice?index=${data.index}&min_date=${data.min_data}&max_date=${data.max_data}&query_str=${data.query_str}`,
			);

			cache[cacheKey] = response.data;

			if (timers[cacheKey]) {
				//HELP: таймер очистки кэша
				clearTimeout(timers[cacheKey]);
			}
			timers[cacheKey] = setTimeout(
				() => {
					delete cache[cacheKey];
					delete timers[cacheKey];
				},
				10 * 60 * 1000,
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

			const cacheKey = JSON.stringify(data);
			if (cache[cacheKey]) {
				return cache[cacheKey];
			}

			// const response = await $axios.get(
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
			cache[cacheKey] = response.data;

			if (timers[cacheKey]) {
				//HELP: таймер очистки кэша
				clearTimeout(timers[cacheKey]);
			}
			timers[cacheKey] = setTimeout(
				() => {
					delete cache[cacheKey];
					delete timers[cacheKey];
				},
				10 * 60 * 1000,
			);

			return response.data;
		} catch (error) {
			console.log(error);
			setErrorData(error);
		} finally {
			dispatch(loadStatusAction.isLoad(false));
		}
	},
};
