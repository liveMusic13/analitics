import { createSlice } from '@reduxjs/toolkit';

const initialState = [
	{
		file: '',
		index_number: 1,
		min_data: 4345323,
		max_data: 4353534,
	},
];

export const dataUser = createSlice({
	name: 'dataUser',
	initialState,
	reducers: {
		addData: (state, { payload }) => {
			return payload;
		},
	},
});

export const { actions, reducer } = dataUser;
