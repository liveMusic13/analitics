import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	values: [],
	categories: {},
};

export const themesData = createSlice({
	name: 'themesData',
	initialState,
	reducers: {
		addThemesData: (state, { payload }) => {
			state.values = payload;
		},
		addCategories: (state, { payload }) => {
			state.categories[payload] = [];
		},
		addObject: (state, { payload }) => {
			state.categories[payload.text].push(payload.data);
		},
	},
});

export const { actions, reducer } = themesData;
