import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as dataForRequestActions } from '../../../store/data-for-request/dataForRequest.slice';
import { truncateDescription } from '../../../utils/descriptionLength';
import { getFirstWordAfterUnderscore } from '../../../utils/groupFileForSearch';
import styles from './DataForSearch.module.scss';

const DataForSearch = ({ choiceData }) => {
	const dataUser = useSelector(state => state.dataUser);
	const dataForRequest = useSelector(state => state.dataForRequest);
	const [isViewOptions, setViewOptions] = useState(false);
	const dispatch = useDispatch();

	const findTargetFile = dataUser.find(
		file => file.index_number === dataForRequest.index,
	); //HELP: Находим файл по index_number

	const nameFile = findTargetFile?.file;

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
										dispatch(
											dataForRequestActions.addIndex(option.index_number),
										);
										setViewOptions(!isViewOptions);
									}}
								>
									<p>{truncateDescription(option.file, 30)}</p>
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
