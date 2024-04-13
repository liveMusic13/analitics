import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getGraph } from '../services/getGraph.service';
import { actions as dataMediaAction } from '../store/data-media/dataMedia.slice';
import { actions as isGraphAction } from '../store/is-graph/isGraph.slice';

export const useMediaRating = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [errorData, setErrorData] = useState(null);

	useEffect(() => {
		if (errorData) navigate('/error');
	}, [errorData]);

	const mediaRequest = async data => {
		const response = await getGraph.media(data, setErrorData, dispatch);

		dispatch(dataMediaAction.addData(response));
		dispatch(isGraphAction.activeGraph(''));
		console.log(response);
	};

	return { mediaRequest };
};
