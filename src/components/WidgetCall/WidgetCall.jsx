import s from './WidgetCall.module.scss';
import { useEffect, useState } from 'react';
import { ReactComponent as IconPhone } from '../../image/work/widget/iconPhone.svg';
import {ReactComponent as IconGoToBack } from '../../image/work/widget/IconGoToBack.svg';
import {ReactComponent as IconPersonAdding } from '../../image/work/widget/IconPersonAdding.svg';

const WidgetCall = ({setWidget}) => {
    const [anim, setAnim] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
      
    },[]);

    const handleCall = () => {
        setWidget('call')
    }

    const handleZoom = () => {
        setWidget('zoom');
    }

    return (
        <div className={`${s.call} ${anim && s.call_anim}`}>
            <div className={s.container}>
                <p className={s.text}>Контакт запланирован на 12 февраля в 16:00</p>
                <button onClick={handleZoom} className={s.button}><p>Начать Zoom-встречу</p><IconPhone /></button>
                <button onClick={handleCall}  className={`${s.button} ${s.button_minor}`}><p>Позвонить</p><IconPhone /></button>
                <button className={s.button_small}><p>Анкета 3 марта 15:00</p></button>
            </div>
            <div className={s.buttons}>
                <button className={s.button_small}><p>Запланировать заново</p> <IconGoToBack/></button>
                <button className={s.button_small}><p>Передать клиента</p> <IconPersonAdding/></button>
            </div>
        </div>
    )
};

export default WidgetCall;