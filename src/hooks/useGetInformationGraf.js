import { useDispatch } from 'react-redux';
import { getGraph } from '../services/getGraph.service';
import { actions as isGraphAction } from '../store/is-graph/isGraph.slice';

export const useGetInformationGraf = () => {
	const dispatch = useDispatch();

	const addInformationGraf = async data => {
		try {
			const responce = await getGraph.getInformation(data);

			dispatch(isGraphAction.activeGraph(''));
			console.log(responce);
		} catch (error) {
			console.log(error);
		}
	};

	return { addInformationGraf };
};
