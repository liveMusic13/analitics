import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	index: 0,
	min_data: '01.01.2000',
	max_data: '01.01.2001',
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
	},
});

export const { actions, reducer } = dataForRequest;
