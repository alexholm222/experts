import s from './WidgetCall.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as IconPhone } from '../../image/work/widget/iconPhone.svg';
import { ReactComponent as IconGoToBack } from '../../image/work/widget/IconGoToBack.svg';
import { ReactComponent as IconPersonAdding } from '../../image/work/widget/IconPersonAdding.svg';
import { ReactComponent as IconCalendar } from '../../image/work/widget/iconCalendar.svg'; 
import { ReactComponent as IconZoom } from '../../image/work/widget/iconZoom.svg';
import { ReactComponent as IconCancleZoom } from '../../image/work/widget/iconCancleZoom.svg';
//Api
import { callClient } from '../../Api/Api';
//selector
import { selectorWork } from '../../store/reducer/Work/selector';
import { selectorClient } from '../../store/reducer/Client/selector';
//slice
import { setCommand } from '../../store/reducer/Command/slice';
//components
import WidgetCallSceleton from '../WidgetCallSceleton/WidgetCallSceleton';
//utils
import { handleDatePlan, handleDateZoomDiff2 } from '../../utils/dates';

const WidgetCall = ({ setWidget, setPrevWidget, stageZoom, zoomDate, stageSendAnketa, stageAnketa, empty, loadClose, setPlanWithoutCall }) => {
    const next_connect = useSelector(selectorWork).next_connect;
    const zoom_date = useSelector(selectorWork).zoom_date;
    const client_main_number = useSelector(selectorClient).client_main_number;
    const [anim, setAnim] = useState(false);
    const dispatch = useDispatch();
    console.log(next_connect)

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })

    }, []);

    const handleCall = () => {
        localStorage.removeItem('widget');
        localStorage.removeItem('comment');
        localStorage.removeItem('screenShots')
        localStorage.removeItem('tab');
        localStorage.removeItem('sms');
        callClient(client_main_number)
            .then(res => console.log(res))
            .catch(err => console.log(err));
        setWidget('call');
        setPrevWidget('call');
        localStorage.setItem('prevWidget', JSON.stringify('call'));
    }

    const handleZoom = () => {
        localStorage.removeItem('widget');
        localStorage.removeItem('comment');
        localStorage.removeItem('screenShots')
        localStorage.removeItem('tab');
        localStorage.removeItem('sms');
        setWidget('zoom');
        setPrevWidget('zoom');
        localStorage.setItem('widget', JSON.stringify('zoom'))
        localStorage.setItem('prevWidget', JSON.stringify('zoom'));
    }

    const handlePlanContact = () => {
        setPlanWithoutCall(true);
        dispatch(setCommand('pause'));
        setTimeout(() => {
            setWidget('plan');
            localStorage.setItem('widget', JSON.stringify('plan'));

        })
    }

    const handleCancelZoom = () => {
        setWidget('cancelZoom');
        setPrevWidget('cancelZoom');
    }

    const handleHandOver = () => {
        setWidget('handOver')
    }

    return (
        <div className={`${s.call} ${anim && s.call_anim}`}>
            <div className={s.container}>
                {!empty && stageZoom && <p className={s.text}>{'Zoom запланирован'} {handleDatePlan(zoom_date)}</p>}
                {!empty && !stageZoom && <p className={s.text}>{`Контакт запланирован`} {handleDatePlan(next_connect)}</p>}
                {stageZoom && handleDateZoomDiff2(zoomDate) && <button onClick={handleZoom} className={s.button}><p>Начать Zoom-встречу</p><IconZoom /></button>}
                {stageSendAnketa && <button onClick={handleZoom} className={s.button}><p>Проверить анкету</p><IconZoom /></button>}
                <button onClick={handleCall} className={`${s.button} ${((stageZoom && handleDateZoomDiff2(zoomDate)) || stageSendAnketa) && s.button_minor}`}><p>Позвонить</p><IconPhone /></button>
                 {stageAnketa && <button className={s.button_small}><p>Анкета 3 марта 15:00</p></button>}
            </div>
            <div className={s.buttons}>
                {!empty && !stageZoom && <button onClick={handlePlanContact} className={s.button_small}><p>Запланировать заново</p> <IconGoToBack /></button>}
                {stageZoom && <button onClick={handleCancelZoom} className={s.button_small}><p>Отменить Zoom</p> <IconCancleZoom /></button>}
                {empty && !stageZoom  && <button onClick={handlePlanContact} className={s.button_small}><p>Запланировать контакт</p> <IconCalendar /></button>}
                <button onClick={handleHandOver} className={s.button_small}><p>Передать клиента</p> <IconPersonAdding /></button>
            </div>

            <div className={`${s.sceleton} ${!loadClose && s.sceleton_hiden}`}>
                <WidgetCallSceleton />
            </div>
        </div>
    )
};

export default WidgetCall;
