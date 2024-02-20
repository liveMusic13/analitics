import { useDispatch } from 'react-redux';
import { getGraph } from '../services/getGraph.service';
import { actions as informationGrafDataAction } from '../store/information-graf-data/informationGrafData.slice';
import { actions as isGraphAction } from '../store/is-graph/isGraph.slice';

export const useGetInformationGraf = () => {
	const dispatch = useDispatch();

	const addInformationGraf = async data => {
		try {
			const responce = await getGraph.getInformation(data);

			dispatch(informationGrafDataAction.addInformationGraphData(responce));
			dispatch(isGraphAction.activeGraph(''));
			console.log(responce);
		} catch (error) {
			console.log(error);
		}
	};

	return { addInformationGraf };
};
