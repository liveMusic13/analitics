import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getGraph } from '../services/getGraph.service';
import { actions as dataVoiceAction } from '../store/data-voice/dataVoice.slice';
import { actions as isGraphAction } from '../store/is-graph/isGraph.slice';

export const useVoiceRequest = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [errorData, setErrorData] = useState(null);

	useEffect(() => {
		if (errorData) navigate('/error');
	}, [errorData]);

	const voiceRequest = async data => {
		const response = await getGraph.getVoice(data, setErrorData, dispatch);

		dispatch(dataVoiceAction.addDataVoice(response));
		dispatch(isGraphAction.activeGraph(''));
		console.log(response);
	};

	return { voiceRequest };
};
