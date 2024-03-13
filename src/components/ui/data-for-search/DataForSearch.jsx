import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as dataForRequestActions } from '../../../store/data-for-request/dataForRequest.slice';
import { truncateDescription } from '../../../utils/descriptionLength';
import styles from './DataForSearch.module.scss';

const DataForSearch = ({ choiceData }) => {
	const dataUser = useSelector(state => state.dataUser);
	const [isViewOptions, setViewOptions] = useState(false);
	const dispatch = useDispatch();

	return (
		<div className={styles.wrapper_data}>
			<div
				className={styles.block__data}
				onClick={() => setViewOptions(!isViewOptions)}
			>
				<div className={styles.block__description}>
					<h2>Выберите необходимую базу</h2>
					<p>Росбанк_18.09.2023-01.10.2023</p>
				</div>
				<img
					className={styles.data__arrow}
					src='../images/icons/arrow_for_search.svg'
					alt='arrow'
				/>
			</div>
			{isViewOptions && (
				<div className={styles.block__options}>
					{dataUser.map(option => {
						return (
							<p
								className={styles.option}
								key={option.file}
								onClick={() => {
									dispatch(dataForRequestActions.addIndex(option.index_number));
									setViewOptions(!isViewOptions);
								}}
							>
								{truncateDescription(option.file, 30)}
							</p>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default DataForSearch;
