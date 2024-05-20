import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isPopup: false,
	description: '',
};

export const isPopup = createSlice({
	name: 'isPopup',
	initialState,
	reducers: {
		togglePopup: (state, { payload }) => {
			state.isPopup = !state.isPopup;
		},
		defaultPopup: (state, { payload }) => {
			state.isPopup = false;
		},
		addText: (state, { payload }) => {
			state.description = payload;
		},
	},
});

export const { actions, reducer } = isPopup;
