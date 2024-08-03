import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isPopup: false,
	description: '',
	link: '',
	time: '',
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
			state.description = payload.description;
			state.link = payload.link;
			state.time = payload.time;
		},
	},
});

export const { actions, reducer } = isPopup;
