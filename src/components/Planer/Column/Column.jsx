import s from './Column.module.scss';
//components 
import PlanerItem from '../PlanerItem/PlanerItem';
//utils
import { handleDatePlaner, handleDateZoomDiff, handleDiffDate } from '../../../utils/dates';
import { useEffect, useState } from 'react';

const Column = ({plan, date}) => {
    const [planSort, setPlanSort] = useState(plan || []);
    const [dateText, setDateText] = useState('');
    const [dayWeek, setDayWeek] = useState('');
    const [state, setState] = useState(1);
    const isToday = date == 'Сегодня' ? true : false;

    useEffect(() => {
        setDateText(handleDatePlaner(date).date);
        setDayWeek(handleDatePlaner(date).dayOfWeek);
        setState(handleDatePlaner(date).state);
    }, [date]);

    useEffect(() => {
        const planArr = [...plan];
        planArr.sort(function (a, b) {
          
            const dateA = handleDiffDate(a.zoom_date, a?.next_connect) ? new Date(a?.zoom_date): new Date(a?.next_connect);
            const dateB = handleDiffDate(b.zoom_date, b?.next_connect) ? new Date(b?.zoom_date): new Date(b?.next_connect);
            if (dateA > dateB) {
                return 1
            }

            if (dateA < dateB) {
                return -1
            }

            return 0
        })
        setPlanSort(planArr)
    }, [plan])

    return (
        <div className={`${s.column} ${state == 0 && s.column_today}`}>
            <div className={s.header}>
                <p className={`${s.sub} ${state == 0 && s.sub_today}`}>{dateText}</p>
                <p className={`${s.day} ${state == 0 && s.day_today}`}>{dayWeek}</p>
            </div>

            <ul className={s.list}>
                {planSort.map(el => {
                    return <PlanerItem key={el.id} state={state} el={el} date={date}/>
                })}
            </ul>
        </div>
    )
};

export default Column;