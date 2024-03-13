import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getGraph } from '../services/getGraph.service';
import { actions as errorStateAction } from '../store/error-state/errorState.slice';
import { actions as isGraphAction } from '../store/is-graph/isGraph.slice';
import { store } from '../store/store';
import { actions as userTonalityDataAction } from '../store/user-tonality-data/userTonalityData.slice';
import { generateColorsForObjects } from '../utils/generateColors';

export const useAddTonalityData = () => {
	const dataForRequest = useSelector(state => state.dataForRequest);
	const dispatch = useDispatch();
	const [errorData, setErrorData] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		if (errorData) navigate('/error');
	}, [errorData]);

	const addTonality = async data => {
		const response = await getGraph.userTonality(data, setErrorData);

		let oldState = null;
		let unsubscribe = store.subscribe(() => {
			const newState = store.getState().userTonalityData;
			if (newState && JSON.stringify(newState) !== JSON.stringify(oldState)) {
				oldState = newState;
				const negativeHubs = newState.tonality_hubs_values.negative_hubs;
				const positiveHubs = newState.tonality_hubs_values.positive_hubs;

				// Генерация цветов для массива negative_hubs
				const negativeColors = generateColorsForObjects(negativeHubs);
				// Генерация цветов для массива positive_hubs
				const positiveColors = generateColorsForObjects(positiveHubs);

				// Присвоение цветов объектам в массиве negative_hubs
				const hubsWithNegativeColors = negativeHubs.map((hub, index) => ({
					...hub,
					color: negativeColors[index],
				}));

				// Присвоение цветов объектам в массиве positive_hubs
				const hubsWithPositiveColors = positiveHubs.map((hub, index) => ({
					...hub,
					color: positiveColors[index],
				}));

				// Диспатч обновленных данных в Redux
				dispatch(
					userTonalityDataAction.updateData({
						tonality_hubs_values: {
							negative_hubs: hubsWithNegativeColors,
							positive_hubs: hubsWithPositiveColors,
						},
					}),
				);

				dispatch(isGraphAction.activeGraph(''));
				console.log(response);

				// Отписка от слушателя
				unsubscribe();
			}
		});

		dispatch(userTonalityDataAction.addUserTonalityData(response));

		if (errorData) {
			if (errorData.request.status >= 400 && errorData.request.status < 500) {
				dispatch(errorStateAction.valueErrorState(errorData.request.status));
			} else {
				dispatch(errorStateAction.valueErrorState(errorData.message));
			}
		}
	};

	return { addTonality, dataForRequest };
};
