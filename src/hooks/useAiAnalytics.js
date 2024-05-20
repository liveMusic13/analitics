import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getGraph } from '../services/getGraph.service';
import { actions as aiDataAction } from '../store/data-ai/dataAI.slice';
import { actions as isGraphAction } from '../store/is-graph/isGraph.slice';

export const useAiAnalytics = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [errorData, setErrorData] = useState(null);

	useEffect(() => {
		if (errorData) navigate('/error');
	}, [errorData]);

	const aiRequestGET = async data => {
		const response = await getGraph.aiAnalyticsGET(
			data,
			setErrorData,
			dispatch,
		);

		dispatch(aiDataAction.addAiDataGET(response));
		dispatch(isGraphAction.activeGraph(''));
		console.log(response);
	};

	const aiRequestPOST = async data => {
		const response = await getGraph.aiAnalyticsPOST(
			data,
			setErrorData,
			dispatch,
		);

		dispatch(aiDataAction.addAiDataPOST(response));
		dispatch(isGraphAction.activeGraph(''));
		console.log(response);
	};

	return { aiRequestGET, aiRequestPOST };
};
