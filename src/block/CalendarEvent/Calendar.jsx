import s from './calendar.module.scss';
import { useState, useEffect } from 'react';
import EventButtons from './components/eventButtons/EventButtons';
import EventCalendar from './components/eventCalendar/EventCalendar';
import Schedule from './components/schedule/Schedule';
import Title from './components/title/Title';
import LastEvents from './components/lastEvents/LastEvents'

const Calendar = () => {
	const [anim, setAnim] = useState(false);

	useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0);
        })

    }, [])

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    }, []);

	return (
		<div  className={`${s.calendar} ${anim && s.calendar_anim}`}>
			<header className={s.header}>
				<Title />

				<div className={s.wrapper}>
					<EventButtons />
					<EventCalendar />
				</div>
			</header>

			<Schedule />
			<h2 className={s.subtitle}>Прошедшие события</h2>
			<LastEvents />
		</div>
	);
};

export default Calendar;
