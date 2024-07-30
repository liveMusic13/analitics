import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isPopupInFolder: false,
	title: '',
	name_file: '',
};

export const popupInFolder = createSlice({
	name: 'popupInFolder',
	initialState,
	reducers: {
		togglePopup: (state, { payload }) => {
			state.isPopupInFolder = !state.isPopupInFolder;
		},
		addText: (state, { payload }) => {
			return {
				// isPopupInFolder: payload.isPopupInFolder,
				...state,
				title: payload.title,
				name_file: payload.name_file,
			};
		},
	},
});

export const { actions, reducer } = popupInFolder;
