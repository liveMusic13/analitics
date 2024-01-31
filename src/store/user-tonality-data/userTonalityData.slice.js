import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	tonality_hubs_values: { negative_hubs: [] },
};

export const userTonalityData = createSlice({
	name: 'userTonalityData',
	initialState,
	reducers: {
		addUserTonalityData: (state, { payload }) => {
			return payload;
		},
		updateData: (state, { payload }) => {
			return { ...state, ...payload };
		},
	},
});

export const { actions, reducer } = userTonalityData;
