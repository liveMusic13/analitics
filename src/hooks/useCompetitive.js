import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getGraph } from '../services/getGraph.service';
import { actions as dataCompetitiveAction } from '../store/data-competitive/dataCompetitive.slice';
import { actions as isGraphAction } from '../store/is-graph/isGraph.slice';

export const useCompetitive = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [errorData, setErrorData] = useState(null);

	useEffect(() => {
		if (errorData) navigate('/error');
	}, [errorData]);

	const addCompetitive = async data => {
		const response = await getGraph.competitive(data, setErrorData, dispatch);
		console.log({
			first_graph: response.first_graph,
			second_graph: response.second_graph,
			third_graph: response.third_graph,
		});
		dispatch(
			dataCompetitiveAction.addCompetitive({
				first_graph: response.first_graph,
				second_graph: response.second_graph,
				third_graph: response.third_graph,
			}),
		);
		dispatch(isGraphAction.activeGraph(''));
		console.log(response);

		if (errorData) {
			if (errorData.request.status >= 400 && errorData.request.status < 500) {
				dispatch(errorStateAction.valueErrorState(errorData.request.status));
				console.log('number');
			} else {
				dispatch(errorStateAction.valueErrorState(errorData.message));
				console.log('message');
			}
			console.log('errorData', errorData);
		}
	};

	return { addCompetitive };
};
