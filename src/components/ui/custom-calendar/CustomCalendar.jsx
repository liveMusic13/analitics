import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { actions as dataForRequestAction } from '../../../store/data-for-request/dataForRequest.slice';
import { convertCompetitive } from '../../../utils/convertCompetitiveData';
import {
	convertDateFormat,
	convertDateToTimestamp,
	convertTimestamp,
} from '../../../utils/convertTimestamp';
import Button from '../button/Button';
import styles from './CustomCalendar.module.scss';

const CustomCalendar = ({ multi }) => {
	const dataForRequest = useSelector(state => state.dataForRequest);
	const dataUser = useSelector(state => state.dataUser);
	const dispatch = useDispatch();

	//HELP: ПОЛУЧАЕМ ДАТУ ПРИ МУЛЬТИ КАЛЕНДАРЕ
	const MultiDate = convertCompetitive(
		dataForRequest.themes_ind[0],
		dataForRequest.themes_ind[1],
		// 2,
		dataUser,
	);

	// console.log(convertTimestamp(1711946448), 'do', convertTimestamp(1716741360));
	// console.log(
	// 	convertTimestamp(dataUser[2].min_data),
	// 	convertTimestamp(dataUser[2].max_data),
	// 	'do',
	// 	convertTimestamp(dataUser[3].min_data),
	// 	convertTimestamp(dataUser[3].max_data),
	// );

	const findTargetFile = dataUser.find(
		file => file.index_number === dataForRequest.index,
	); //HELP: Находим файл по index_number
	const minDate = multi ? MultiDate.min_data : findTargetFile?.min_data; //HELP: Получаем мин и макс дату
	const maxDate = multi ? MultiDate.max_data : findTargetFile?.max_data;

	const [isViewCalendar, setViewCalendar] = useState(false);
	const [dateRange, setDateRange] = useState(
		new Date(convertDateFormat(convertTimestamp(minDate))),
	);
	const [dateRangeTwo, setDateRangeTwo] = useState(
		new Date(convertDateFormat(convertTimestamp(maxDate))),
	);

	// console.log(dateRange);

	const onChangeMin = date => {
		setDateRange(date);
		console.log(date);
		dispatch(dataForRequestAction.addMinDate(convertDateToTimestamp(date)));
		console.log(convertDateToTimestamp(date));
	};
	const onChangeMax = date => {
		setDateRangeTwo(date);
		console.log(date);
		dispatch(dataForRequestAction.addMaxDate(convertDateToTimestamp(date)));
		console.log(convertDateToTimestamp(date));
	};

	return (
		<div className={styles.wrapper_calendar}>
			<div
				className={styles.block__data}
				onClick={() => setViewCalendar(!isViewCalendar)}
			>
				<div className={styles.block__description}>
					<h2>Период</h2>
					<p>
						{minDate !== undefined
							? convertDateFormat(convertTimestamp(minDate)) //HELP: Переводим дату из Timestamp в обычный формат, а потом преобразуем в формат гг.мм.дд
							: 'no data'}{' '}
						-{' '}
						{maxDate !== undefined
							? convertDateFormat(convertTimestamp(maxDate))
							: 'no data'}
					</p>
				</div>
				<img
					className={styles.data__arrow}
					src='../images/icons/arrow_for_search.svg'
					alt='arrow'
				/>
			</div>
			{isViewCalendar && (
				<div className={styles.block__calendar}>
					<div className={styles.block__dateTimePicker}>
						<DateTimePicker
							onChange={onChangeMin}
							value={dateRange}
							minDate={new Date(convertDateFormat(convertTimestamp(minDate)))}
							maxDate={new Date(convertDateFormat(convertTimestamp(maxDate)))}
						/>
						<DateTimePicker
							onChange={onChangeMax}
							value={dateRangeTwo}
							minDate={new Date(convertDateFormat(convertTimestamp(minDate)))}
							maxDate={new Date(convertDateFormat(convertTimestamp(maxDate)))}
						/>
					</div>
					<div className={styles.block__preview}>
						<p className={styles.preview__date}>
							{dateRange.toLocaleDateString()} -{' '}
							{dateRangeTwo.toLocaleDateString()}
						</p>
						<div className={styles.block__buttons}>
							<button
								className={styles.button__clear}
								onClick={() => setViewCalendar(false)}
							>
								Отменить
							</button>
							<Button buttonFor='calendar' setViewCalendar={setViewCalendar}>
								Применить
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default CustomCalendar;
