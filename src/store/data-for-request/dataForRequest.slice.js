import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	//TODO: НАДО СДЕЛАТЬ ДОБАВЛЕНИЕ ДАТЫ ПРИ ИНИЦИАЛИЗАЦИИ, ЧТОБЫ НЕ ВЫДАВАЛО ОШИБКУ
	index: 1,
	themes_ind: [1, 1],
	min_data: 1706745600,
	max_data: 1707177600,
	query_str: '',
	post: false,
	repost: false,
	SMI: false,
	promt: '',
	texts_ids: [],
	infoAboutPost: false,
};

export const dataForRequest = createSlice({
	name: 'dataForRequest',
	initialState,
	reducers: {
		addThemesInd: (state, { payload }) => {
			state.themes_ind.push(payload);

			if (state.themes_ind.length >= 2) {
				state.themes_ind.shift(); // Удаляем первый элемент
			}
		},
		clearThemesInd: (state, { payload }) => {
			state.themes_ind = [];
		},
		toggleInfo: (state, { payload }) => {
			state.infoAboutPost = !state.infoAboutPost;
		},
		addIndex: (state, { payload }) => {
			return { ...state, index: payload };
		},
		addMinDate: (state, { payload }) => {
			return { ...state, min_data: payload };
		},
		addMaxDate: (state, { payload }) => {
			return { ...state, max_data: payload };
		},
		addQueryStr: (state, { payload }) => {
			return { ...state, query_str: payload };
		},
		currentCheckBox: (state, { payload }) => {
			return { ...state, [payload]: !state[payload] };
		},
		addPromt: (state, { payload }) => {
			return { ...state, promt: payload };
		},
		addTextsIds: (state, { payload }) => {
			state.texts_ids.push(payload);
		},
		addAllTextsIds: (state, { payload }) => {
			state.texts_ids = payload.map(item => item.id);
		},
		deleteAllTextsIds: (state, { payload }) => {
			state.texts_ids = [];
		},
		deleteTextsIds: (state, { payload }) => {
			state.texts_ids = state.texts_ids.filter(id => id !== payload);
		},
	},
});

export const { actions, reducer } = dataForRequest;
