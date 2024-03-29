import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	data: {
		second_graph_data: [],
		tonality: {},
	},
};

export const dataVoice = createSlice({
	name: 'dataVoice',
	initialState,
	reducers: {
		addDataVoice: (state, { payload }) => {
			state.data = payload;
		},
	},
});

export const { actions, reducer } = dataVoice;
