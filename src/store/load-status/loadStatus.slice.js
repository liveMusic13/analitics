import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoader: false,
};

export const loadStatus = createSlice({
	name: 'loadStatus',
	initialState,
	reducers: {
		isLoad: (state, { payload }) => {
			state.isLoader = payload;
		},
	},
});

export const { actions, reducer } = loadStatus;
