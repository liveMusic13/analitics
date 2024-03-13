import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	//TODO: НАДО СДЕЛАТЬ ДОБАВЛЕНИЕ ДАТЫ ПРИ ИНИЦИАЛИЗАЦИИ, ЧТОБЫ НЕ ВЫДАВАЛО ОШИБКУ
	index: 1,
	min_data: 1706745600,
	max_data: 1707177600,
	query_str: '',
	post: false,
	repost: false,
	SMI: false,
};

export const dataForRequest = createSlice({
	name: 'dataForRequest',
	initialState,
	reducers: {
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
	},
});

export const { actions, reducer } = dataForRequest;
