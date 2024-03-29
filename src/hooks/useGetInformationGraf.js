import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getGraph } from '../services/getGraph.service';
import { actions as errorStateAction } from '../store/error-state/errorState.slice';
import { actions as informationGrafDataAction } from '../store/information-graf-data/informationGrafData.slice';
import { actions as isGraphAction } from '../store/is-graph/isGraph.slice';

export const useGetInformationGraf = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [errorData, setErrorData] = useState(null);

	useEffect(() => {
		if (errorData) navigate('/error');
	}, [errorData]);

	const addInformationGraf = async data => {
		const responce = await getGraph.getInformation(
			data,
			setErrorData,
			dispatch,
		);

		dispatch(informationGrafDataAction.addInformationGraphData(responce));
		dispatch(isGraphAction.activeGraph(''));
		console.log(responce);

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

	return { addInformationGraf };
};
