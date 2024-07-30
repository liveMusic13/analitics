import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isPopupDelete: false,
	title: '',
	folder: '',
	isProcessed: false,
	buttonTarget: '',
};

export const popupDelete = createSlice({
	name: 'popupDelete',
	initialState,
	reducers: {
		togglePopupDelete: (state, { payload }) => {
			state.isPopupDelete = !state.isPopupDelete;
		},
		addButtonTarget: (state, { payload }) => {
			return {
				...state,
				buttonTarget: payload,
			};
		},
		addTitle: (state, { payload }) => {
			return {
				...state,
				title: payload.title,
				folder: payload.folder,
				isProcessed: payload.processed,
			};
		},
	},
});

export const { actions, reducer } = popupDelete;
