import { useEffect, useState } from 'react';
import s from './WidgetEndWork.module.scss';
import { useDispatch, useSelector } from 'react-redux';
//slice
import { setHeight } from '../../store/reducer/Widget/slice';
import { setCommand } from '../../store/reducer/Command/slice';
//selector
import { selectorApp } from '../../store/reducer/App/selector';
import { selectorCommand } from '../../store/reducer/Command/selector';
//utils
import { handleDatePlan } from '../../utils/dates';
//component
import Timer from '../../utils/Timer';

const WidgetEndWork = ({ planTime, planZoom, setWidget, endType, setEndType }) => {
    const [anim, setAnim] = useState(false);
    const [timer, setTimer] = useState(3);
    const dispatch = useDispatch();
    const loadClient = useSelector(selectorApp).loadClient;
    const message = useSelector(selectorCommand).message;
    const time = new Date();
    time.setSeconds(time.getSeconds() + 2);
    console.log(timer)

    useEffect(() => {
        setAnim(true)
    }, []);

    useEffect(() => {
        localStorage.removeItem('widget');
        localStorage.removeItem('comment');
        localStorage.removeItem('tab');
        localStorage.removeItem('sms');
        localStorage.removeItem('screenShots');  
        dispatch(setHeight(316));
    }, []);

    useEffect(() => {
        if (timer == 0) {
            dispatch(setCommand('next_client'));

            setTimeout(() => {
                setWidget('')
            }, 1000)
           
            setTimeout(() => {
                setEndType('');
            }, 1800);
        }
    }, [timer]);

    useEffect(() => {
        loadClient && message.action == 'open_client' && setTimeout(() => {setWidget('')});
    }, [loadClient, message]);

    return (
        <div className={`${s.container} ${anim && s.container_anim}`}>
            {planZoom && endType == '' && <p>Zoom запланирован {handleDatePlan(planTime)}</p>}
            {!planZoom && endType == '' && <p>Контакт запланирован {handleDatePlan(planTime)}</p>}
            {endType == 'reject' && <p>Клиент отказался от сотрудничества</p>}
            {endType == 'handOver' && <p>Клиент передан </p>}
            <div className={s.progress}>
                <div style={{ width: `${(3 - timer) * 100 / 3}%` }}></div>
            </div>

            <Timer expiryTimestamp={time} setTimer={setTimer} status={'end'} />
        </div>
    )
};

export default WidgetEndWork;