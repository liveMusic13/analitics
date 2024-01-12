import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as isActiveMenu } from './is-active-menu/isActiveMenu.slice';

const reducers = combineReducers({
	isActiveMenu: isActiveMenu,
});

export const store = configureStore({
	reducer: reducers,
});
