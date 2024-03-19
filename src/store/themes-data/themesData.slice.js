import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	values: [],
};

export const themesData = createSlice({
	name: 'themesData',
	initialState,
	reducers: {
		addThemesData: (state, { payload }) => {
			state.values = payload;
		},
	},
});

export const { actions, reducer } = themesData;
