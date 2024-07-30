import { getLkCalendarSchedule } from '../../Api/index';
import Modal from '../modal/Modal';
import ScheduleItem from '../scheduleItem/ScheduleItem';
import s from './schedule.module.scss';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectLkCalendar } from '../../store/reducer/lk/calendar/selector';
import Skeleton from '../skeleton/Skeleton';

const Schedule = () => {
	const [width, setWidth] = useState(window?.innerWidth);
	const [schedule, setSchedule] = useState([]);
	const { type, month } = useSelector(selectLkCalendar);
	const currentYear = new Date().getUTCFullYear();

	useEffect(() => {
		const cb = () => {
			setWidth(window.innerWidth);
		};

		window.addEventListener('resize', cb);
		window.scroll(0, 0);

		return () => window.removeEventListener('resize', cb);
	}, []);

	useEffect(() => {
		getLkCalendarSchedule(`${currentYear}-${month}-01`, type)
		.then(res => {
			console.log(res);
			setSchedule(res.data.calendar)
		})
		.catch(err => console.log(err))
	}, [type, month])

	
	return (
		<div className={s.schedule}>
			<Modal />
			{width > 575 && (
				<div className={s.days}>
					<div className={s.day}>Понедельник</div>
					<div className={s.day}>Вторник</div>
					<div className={s.day}>Среда</div>
					<div className={s.day}>Четверг</div>
					<div className={s.day}>Пятница</div>
					<div className={s.day}>Суббота</div>
					<div className={s.day}>Воскресенье</div>
				</div>
			)}
			{schedule.isLoading ? (
				<Skeleton />
			) : (
				<div className={s.schedule_container}>
					{schedule?.map((item, index) => (
						<ScheduleItem key={index} {...item} />
					))}
				</div>
			)}

			<div className={s.footer}>
				<span className={s.green}>Базовое бизнес-обучение</span>
				<span className={s.darkGray}>Корпоративный отдых в России</span>
				<span className={s.yellow}>
					Бизнес-завтраки, конференции, тренинги
				</span>
				<span className={s.lightGray}>Завершенные</span>
				<span className={s.red}>Занятия для Премиум-партнеров</span>
				<span className={s.purple}>Корпоративный отдых за границей</span>
			</div>
		</div>
	);
};

export default Schedule;
