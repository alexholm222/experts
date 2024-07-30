// import el from 'date-fns/locale/el';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLkCalendar } from '../../store/reducer/lk/calendar/selector';
import { setAddCurrentMonth, setAddMonth } from '../../store/reducer/lk/calendar/slice';
import s from './eventCalendar.module.scss';

const EventCalendar = () => {
	const dispatch = useDispatch();
	const { month } = useSelector(selectLkCalendar);
	const [textMonth, setTextMonth] = useState();

	useEffect(() => {
		dispatch(setAddCurrentMonth(textMonth))
		if (month > 12) {
			dispatch(setAddMonth(1));
		}

		if (month <= 0) {
			dispatch(setAddMonth(12));
		}

		switch (month) {
			case 1:
				return setTextMonth('Январь');
			case 2:
				return setTextMonth('Февраль');
			case 3:
				return setTextMonth('Март');
			case 4:
				return setTextMonth('Апрель');
			case 5:
				return setTextMonth('Май');
			case 6:
				return setTextMonth('Июнь');
			case 7:
				return setTextMonth('Июль');
			case 8:
				return setTextMonth('Август');
			case 9:
				return setTextMonth('Сентябрь');
			case 10:
				return setTextMonth('Октябрь');
			case 11:
				return setTextMonth('Ноябрь');
			case 12:
				setTextMonth('Декабрь');
				break;
		}
	}, [textMonth, month]);

	return (
		<div className={s.input}>
			<button
				onClick={() => dispatch(setAddMonth(month - 1))}
				className={s.btn}
			>
				<img src='/static_calendar/lk/slideArrowLeft.svg' alt='назад' />
			</button>

			<div className={s.info}>
				<img className={s.icon} src='/static_calendar/lk/iconCalendar.svg' alt='' />
				<span className={s.month}>{textMonth}</span>
			</div>

			<button
				onClick={() => dispatch(setAddMonth(month + 1))}
				className={s.btn}
			>
				<img src='/static_calendar/lk/slideArrowRight.svg' alt='вперед' />
			</button>
		</div>
	);
};

export default EventCalendar;
