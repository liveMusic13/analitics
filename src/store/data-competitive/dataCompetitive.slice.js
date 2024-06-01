import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	first_graph: [],
	second_graph: [],
	third_graph: [],
};

export const competitiveData = createSlice({
	name: 'competitiveData',
	initialState,
	reducers: {
		addCompetitive: (state, { payload }) => {
			// state.first_graph = payload.first_graph;
			// state.second_graph = payload.second_graph;
			// state.third_graph = payload.third_graph;
			return { ...state, ...payload };
		},
	},
});

export const { actions, reducer } = competitiveData;
