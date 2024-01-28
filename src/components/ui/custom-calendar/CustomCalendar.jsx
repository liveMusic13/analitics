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

	const onChange = date => {
		setDateRange(date);
		console.log(date);
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
						{convertDateFormat(
							convertTimestamp(dataUser[dataForRequest.index].min_data),
						)}{' '}
						-{' '}
						{convertDateFormat(
							convertTimestamp(dataUser[dataForRequest.index].max_data),
						)}
						{}
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
						minDate={
							new Date(
								convertDateFormat(
									convertTimestamp(dataUser[dataForRequest.index].min_data),
								),
							)
						}
						maxDate={
							new Date(
								convertDateFormat(
									convertTimestamp(dataUser[dataForRequest.index].max_data),
								),
							)
						}
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
