import { useState } from 'react';
import Calendar from 'react-calendar';
import { useDispatch, useSelector } from 'react-redux';
import { actions as dataForRequestAction } from '../../../store/data-for-request/dataForRequest.slice';
import {
	convertDateFormat,
	convertDateToTimestamp,
	convertTimestamp,
} from '../../../utils/convertTimestamp';
import Button from '../button/Button';
import './CalendarStyle.scss';
import styles from './CustomCalendar.module.scss';

const CustomCalendar = () => {
	const dataForRequest = useSelector(state => state.dataForRequest);
	const dataUser = useSelector(state => state.dataUser);
	const dispatch = useDispatch();

	const [isViewCalendar, setViewCalendar] = useState(false);
	const [dateRange, setDateRange] = useState([
		new Date('2010/02/10'),
		new Date('2021/05/12'),
	]);

	// console.log(moment('Mar 18 2024 00:00:00 GMT+0300').valueOf() / 1000);

	// console.log(
	// 	'Тестим даты2: ',
	// 	Math.floor(
	// 		new Date('Mar 18 2024 00:00:00 GMT+0300 (Москва, стандартное время)') /
	// 			1000,
	// 	),
	// );

	const onChange = date => {
		setDateRange(date);
		console.log('fsdfsdfsd', new Date(date[0]));
		console.log('fsdfsdfsd', new Date(date[1]));
		dispatch(
			dataForRequestAction.addMinDate(
				convertDateToTimestamp(date[0].toLocaleDateString()),
			),
		);
		dispatch(
			dataForRequestAction.addMaxDate(
				convertDateToTimestamp(date[1].toLocaleDateString()),
			),
		);

		// console.log(
		// 	dataForRequestAction.addMaxDate(
		// 		convertDateToTimestamp(date[1].toLocaleDateString()),
		// 	),
		// );
	};

	const findTargetFile = dataUser.find(
		file => file.index_number === dataForRequest.index,
	); //HELP: Находим файл по index_number
	const minDate = findTargetFile?.min_data; //HELP: Получаем мин и макс дату
	const maxDate = findTargetFile?.max_data;

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
					<Calendar
						onChange={onChange}
						value={dateRange}
						selectRange={true}
						minDate={new Date(convertDateFormat(convertTimestamp(minDate)))}
						maxDate={new Date(convertDateFormat(convertTimestamp(maxDate)))}
					/>
					<div className={styles.block__preview}>
						<p className={styles.preview__date}>
							{dateRange[0].toLocaleDateString()} -{' '}
							{dateRange[1].toLocaleDateString()}
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
