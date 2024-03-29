import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { actions as dataForRequestAction } from '../../../store/data-for-request/dataForRequest.slice';
import {
	convertDateFormat,
	convertDateToTimestamp,
	convertTimestamp,
} from '../../../utils/convertTimestamp';
import Button from '../button/Button';
import styles from './CustomCalendar.module.scss';

const CustomCalendar = () => {
	const dataForRequest = useSelector(state => state.dataForRequest);
	const dataUser = useSelector(state => state.dataUser);
	const dispatch = useDispatch();

	const findTargetFile = dataUser.find(
		file => file.index_number === dataForRequest.index,
	); //HELP: Находим файл по index_number
	const minDate = findTargetFile?.min_data; //HELP: Получаем мин и макс дату
	const maxDate = findTargetFile?.max_data;

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
