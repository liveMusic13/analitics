import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isGraph: false,
};

export const isGraph = createSlice({
	name: 'isGraph',
	initialState,
	reducers: {
		activeGraph: (state, { payload }) => {
			state.isGraph = true;
		},
		disableGraph: (state, { payload }) => {
			state.isGraph = false;
		},
	},
});

export const { actions, reducer } = isGraph;
