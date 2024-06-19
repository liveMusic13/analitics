import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as dataForRequestActions } from '../../../store/data-for-request/dataForRequest.slice';
import { truncateDescription } from '../../../utils/descriptionLength';
import { getFirstWordAfterUnderscore } from '../../../utils/groupFileForSearch';
import styles from './DataForSearch.module.scss';

const DataForSearch = ({ multi }) => {
	const dataUser = useSelector(state => state.dataUser);
	const dataForRequest = useSelector(state => state.dataForRequest);
	const [isViewOptions, setViewOptions] = useState(false);
	const [checkedState, setCheckedState] = useState({});
	const dispatch = useDispatch();

	useEffect(() => {
		dataUser.forEach(base => {
			let isChecked = dataForRequest.themes_ind.includes(base.index_number);
			setCheckedState(prevState => ({
				...prevState,
				[base.index_number]: isChecked,
			}));
		});
	}, [dataForRequest.themes_ind, dataUser]);

	const handleChange = indexNumber => {
		setCheckedState(prevState => ({
			...prevState,
			[indexNumber]: !prevState[indexNumber],
		}));
	};

	const findTargetFile = dataUser.find(
		file => file.index_number === dataForRequest.index,
	); //HELP: Находим файл по index_number

	const nameFile = findTargetFile?.file;

	const numLength = multi ? 26 : 30;

	return (
		<div className={styles.wrapper_data}>
			<div
				className={styles.block__data}
				onClick={() => setViewOptions(!isViewOptions)}
			>
				<div className={styles.block__description}>
					<h2>Выберите необходимую базу</h2>
					<p>{truncateDescription(nameFile, 30)}</p>
				</div>
				<img
					className={styles.data__arrow}
					src='../images/icons/arrow_for_search.svg'
					alt='arrow'
				/>
			</div>
			{isViewOptions && (
				<>
					<div className={styles.block__options}>
						{dataUser.map(option => {
							return (
								<div
									className={styles.option}
									key={option.file}
									onClick={() => {
										if (multi) {
											// if (dataForRequest.themes_ind.length !== 1) {
											// 	dispatch(
											// 		dataForRequestActions.addThemesInd(
											// 			option.index_number,
											// 		),
											// 	);
											// } else {
											dispatch(
												dataForRequestActions.addThemesInd(option.index_number),
											);
											// setViewOptions(!isViewOptions);
											// }
										} else {
											dispatch(
												dataForRequestActions.addIndex(option.index_number),
											);
											setViewOptions(!isViewOptions);
										}
									}}
								>
									{multi && (
										<input
											type='checkbox'
											checked={checkedState[option.index_number] || false}
											onChange={() => handleChange(option.index_number)}
										/>
									)}
									<p>{truncateDescription(option.file, numLength)}</p>
									<p className={styles.hover__group}>
										{getFirstWordAfterUnderscore(option.file)}
									</p>
								</div>
							);
						})}
					</div>
				</>
			)}
		</div>
	);
};

export default DataForSearch;
