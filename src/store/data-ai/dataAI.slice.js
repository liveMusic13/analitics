import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	get: [],
	post: {
		promt: '',
		texts: [],
	},
};

export const aiData = createSlice({
	name: 'aiData',
	initialState,
	reducers: {
		addAiDataGET: (state, { payload }) => {
			state.get = payload;
		},
		addAiDataPOST: (state, { payload }) => {
			state.post = payload;
		},
		// addCategories: (state, { payload }) => {
		// 	state.categories[payload] = [];
		// },
		// addObject: (state, { payload }) => {
		// 	state.categories[payload.text].push(payload.data);
		// },
	},
});

export const { actions, reducer } = aiData;
