import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	first_graph: {
		negative_smi: [],
		positive_smi: [],
	},
	second_graph: [],
};

export const dataMedia = createSlice({
	name: 'dataMedia',
	initialState,
	reducers: {
		addData: (state, { payload }) => {
			return payload;
		},
	},
});

export const { actions, reducer } = dataMedia;
