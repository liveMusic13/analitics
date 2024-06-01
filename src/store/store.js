import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as aiData } from './data-ai/dataAI.slice';
import { reducer as competitiveData } from './data-competitive/dataCompetitive.slice';
import { reducer as dataForRequest } from './data-for-request/dataForRequest.slice';
import { reducer as dataMedia } from './data-media/dataMedia.slice';
import { reducer as dataUser } from './data-user/dataUser.slice';
import { reducer as dataVoice } from './data-voice/dataVoice.slice';
import { reducer as errorState } from './error-state/errorState.slice';
import { reducer as informationGraphData } from './information-graf-data/informationGrafData.slice';
import { reducer as isActiveMenu } from './is-active-menu/isActiveMenu.slice';
import { reducer as isGraph } from './is-graph/isGraph.slice';
import { reducer as loadStatus } from './load-status/loadStatus.slice';
import { reducer as isPopup } from './popup/popup.slice';
import { reducer as themesData } from './themes-data/themesData.slice';
import { reducer as userTonalityData } from './user-tonality-data/userTonalityData.slice';

const reducers = combineReducers({
	isActiveMenu: isActiveMenu,
	dataUser: dataUser,
	dataForRequest: dataForRequest,
	userTonalityData: userTonalityData,
	isGraph: isGraph,
	informationGraphData: informationGraphData,
	errorState: errorState,
	themesData: themesData,
	loadStatus: loadStatus,
	dataVoice: dataVoice,
	dataMedia: dataMedia,
	aiData: aiData,
	isPopup: isPopup,
	competitiveData: competitiveData,
});

export const store = configureStore({
	reducer: reducers,
	devTools: {
		serialize: {
			// Set to true for auto serializing
			// Set to false to prevent serializing
			// Set to an integer to limit the serialization (e.g., 2)
			undefined: true,
			function: function (fn) {
				return fn.toString();
			},
		},
	},
});
