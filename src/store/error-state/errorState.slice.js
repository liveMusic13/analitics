import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	error: '',
};

export const errorState = createSlice({
	name: 'errorState',
	initialState,
	reducers: {
		valueErrorState: (state, { payload }) => {
			state.error = payload;
		},
	},
});

export const { actions, reducer } = errorState;
