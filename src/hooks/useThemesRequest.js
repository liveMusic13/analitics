import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getGraph } from '../services/getGraph.service';
import { actions as isGraphAction } from '../store/is-graph/isGraph.slice';
import { actions as themesDataAction } from '../store/themes-data/themesData.slice';

export const useThemesRequest = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [errorData, setErrorData] = useState(null);

	useEffect(() => {
		if (errorData) navigate('/error');
	}, [errorData]);

	const themesRequest = async data => {
		const response = await getGraph.themes(data, setErrorData, dispatch);

		dispatch(themesDataAction.addThemesData(response.values));
		dispatch(isGraphAction.activeGraph(''));
		console.log(response);
	};

	return { themesRequest };
};
