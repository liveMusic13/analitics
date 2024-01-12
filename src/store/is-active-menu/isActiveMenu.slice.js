import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isActiveMenu: false,
};

export const isActiveMenu = createSlice({
	name: 'isActiveMenu',
	initialState,
	reducers: {
		toggleActiveMenu: (state, { payload }) => {
			state.isActiveMenu = !state.isActiveMenu;
		},
	},
});

export const { actions, reducer } = isActiveMenu;
