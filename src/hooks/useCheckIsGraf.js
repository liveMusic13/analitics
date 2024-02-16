import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { actions as isGraphAction } from '../store/is-graph/isGraph.slice';

export const useCheckIsGraf = () => {
	//HELP: ЧТОБЫ ПРИ ПЕРЕХОДАХ НА СТРАНИЦУ НОВУЮ, ВСЕГДА ПО СТАНДАРТУ ГРАФИК НЕ ОТОБРАЖАЛСЯ, ИНАЧЕ ИЗ-ЗА НЕПОЛУЧЕННЫХ ДАННЫХ БУДЕТ ЛИБО ОШИБКА ЛИБО ПУСТОЙ ГРАФИК
	const dispatch = useDispatch();
	const { pathname } = useLocation();

	useEffect(() => {
		dispatch(isGraphAction.disableGraph(''));
	}, [pathname]);
};
