import s from './WidgetSideBar.module.scss';
import { ReactComponent as IconPause } from '../../image/sideBar/IconPause.svg';
import { ReactComponent as IconPlay } from '../../image/sideBar/IconPlay.svg';
import { ReactComponent as IconCall } from '../../image/sideBar/iconCall.svg'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//selector
import { selectorCommand } from '../../store/reducer/Command/selector';
import { selectorClient } from '../../store/reducer/Client/selector';
//slice
import { setCommand } from '../../store/reducer/Command/slice';
import { setClientId } from '../../store/reducer/Client/slice';

import { useEffect, useState } from 'react';
//component
import Timer from '../../utils/Timer';

const WidgetSideBar = ({ sidebarHiden }) => {
    const command = useSelector(selectorCommand).command;
    const message = useSelector(selectorCommand).message;
    const client_id = useSelector(selectorClient).client_id;
    const [status, setStatus] = useState('');
    const [pause, setPause] = useState(0);
    const [timer, setTimer] = useState(0);
    const [timerNext, setTimerNext] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const time = new Date();
    time.setSeconds(time.getSeconds() + pause);

    useEffect(() => {
        if (message.action == 'not_work') {
            setStatus('start');
            dispatch(setClientId(''));
            localStorage.removeItem('client_id');
            navigate(`/experts/planer`);
            return
        }

        if ((message.action == 'open_client' && message.need_task !== 1) || message.action == 'wait_client') {
            setStatus('work');
            return
        }

        if (message.action == 'open_client' && message.need_task == 1) {
            setStatus('needTask');
            return
        }

        if (message.action == 'call_client' && message.real_status !== 'call_client_talk') {
            setStatus('call');
            return
        }

        if (message.action == 'call_client_talk' || (message.action == 'call_client' && message.real_status == 'call_client_talk')) {
            setStatus('talk');
            return
        }

        if (message.action == 'next_client') {
            setTimerNext(message.timer_min * 60 + message.timer_sec)
            setStatus('next');
        }

        if (message.action == 'pause') {
            setStatus('pause');
            setPause(message.timer_min * 60 + message.timer_sec);
            return
        }

        if (message.action == 'end_work') {
            setStatus('end');
            return
        }

        if (message.action == 'queue_end') {
            setStatus('queueEnd');
            return
        }
    }, [message.action, client_id]);

    useEffect(() => {
        if (status == 'queueEnd') {
            dispatch(setClientId(''));
            localStorage.removeItem('client_id');
            navigate(`/experts/planer`);
        }
    }, [status]);

    const handleAction = () => {
        dispatch(setCommand('get_work_status'));
        if (status == 'start') {
            dispatch(setCommand('start_work'));
            setStatus('work');
            return
        }

        if (status == 'work' || status == 'next') {
            console.log('нажал паузу')
            dispatch(setCommand('pause'));
            return
        }

        if (status == 'pause') {
            console.log('старат')
            dispatch(setCommand('start_work'));
            return
        }
    }

    return (
        <div className={`${s.container} ${sidebarHiden && s.container_hiden}`}>
            <div style={{ width: `${timer / 160 * 100}%` }} className={`${s.progress} ${(sidebarHiden || status !== 'pause') && s.progress_hiden}`}></div>
            {status == 'next' && <div style={{ animationDuration: status == 'next' ? `${timerNext}s` : '', width: `${(45 - timerNext) / 45 * 100}%` }} className={`${s.progress} ${s.progress_next} ${(sidebarHiden || status !== 'next') && s.progress_hiden}`}></div>}
            {status == 'work' && <div style={{ animationDuration: status == 'work' ? `${10}s` : '' }} className={`${s.progress} ${s.progress_next} ${(sidebarHiden || status !== 'work') && s.progress_hiden}`}></div>}
            <p className={`${s.text} ${(sidebarHiden || status == 'start' || status == '') && s.text_hiden}`}>
                {status == 'pause' && `Пауза ${timer} мин`}
                {status == 'next' && `Следующий клиент`}
                {status == 'work' && `Новый клиент`}
                {status == 'call' && `Звоним`}
                {status == 'talk' && `Разговор`}
                {status == 'needTask' && `Клиент без задачи`}
                {status == 'end' && `День завершен`}
                {status == 'queueEnd' && `Звонки закончились`}
            </p>
            <div className={`${s.icon} ${(status == 'start' || status == '') && s.icon_wide}`}>
                <div className={`${s.icon_call} ${status !== 'call' && status !== 'talk' && s.icon_call_hiden}`}>
                    {status == 'call' && <IconCall />}
                    {status == 'talk' && <div className={s.icon_talk}></div>}
                </div>

                <button onClick={handleAction} className={`${s.button} ${(status == 'call' || status == 'talk' || status == 'needTask' || status == 'end' || status == 'queueEnd') && s.button_hiden}`}>
                    <p className={`${s.text} ${(sidebarHiden || status !== 'start') && s.text_hiden}`}>Начать день</p>
                    {(status == 'start' || status == 'pause') && <IconPlay />}
                    {(status == 'work' || status == 'next') && <IconPause />}
                </button>
            </div>
            {pause !== 0 && status == 'pause' && <Timer expiryTimestamp={time} setTimer={setTimer} status={status} />}
        </div>
    )
};

export default WidgetSideBar;