import { useEffect, useRef, useState } from 'react';
import s from './WidgetWork.module.scss';
import { ReactComponent as IconCancel } from '../../image/work/widget/iconCancel.svg';
import { ReactComponent as IconPersonAdding } from '../../image/work/widget/IconPersonAdding.svg';
import { useDispatch } from 'react-redux';
//slice
import { setHeight } from '../../store/reducer/Widget/slice';
const tabs = ['Не взял', 'Сбросил', 'Недоступен', 'Zoom']

const WidgetWork = ({setWidget}) => {
    const [type, setType] = useState('zoom')
    const [tab, setTab] = useState('');
    const [anim, setAnim] = useState(false);
    const [sms, setSms] = useState(false);
    const dispatch = useDispatch();
    const textRef = useRef();

    useEffect(() => {
        if (tab !== '') {
            textRef.current.value = tab;
            return
        }
        if (textRef.current.value !== tab) {
            setTab('');
            return
        }
    }, [tab, textRef]);

    useEffect(() => {
        if (tab == '') {
            dispatch(setHeight(362))
        } else {
            dispatch(setHeight(398))
        }
    }, [tab])


    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        }, 100)
    }, []);

    const handleCleanTab = () => {
        if (tabs.includes(textRef.current.value)) {
            setTab(textRef.current.value);
        } else {
            setTab('');
        }
    }


    const handleCLickTab = (e) => {
        const value = e.currentTarget.textContent;
        if (value === tab) {
            setTab('');
            textRef.current.value = '';
        } else {
            setTab(value)
        }
    }

    const handleSmsSend = () => {
        if (sms) {
            setSms(false);
            return
        }

        if (!sms) {
            setSms(true);
            return
        }
    }

    const handleOpenPlan = () => {
        setWidget('plan')
    }

    return (
        <div className={`${s.work} ${anim && s.work_anim}`}>
            <p className={s.title}>Работа по звонку</p>
            <div className={s.tabs}>
                {tabs.map((el) => {
                    return <div onClick={handleCLickTab} className={`${s.tab} ${el === tab && s.tab_active}`}>
                        <p>{el}</p>
                    </div>
                })}
            </div>


            <textarea onChange={handleCleanTab} ref={textRef} className={s.area} placeholder='Комментарий'></textarea>
            <div className={`${s.block} ${tab == '' && s.block_hiden}`}>
                <div onClick={handleSmsSend} className={`${s.switch} ${sms && s.switch_on} ${tab == '' && s.switch_hiden}`}>
                    <div></div>
                </div>
                <p> Отправить СМС клиенту о недозвоне</p>
            </div>
            <button onClick={handleOpenPlan} className={`${s.button} ${tab == '' && s.button_margin}`}>Далее</button>
            <div className={s.container}>
                <button className={s.button_small}><p>Клиент отказался</p> <IconCancel /></button>
                <button className={s.button_small}><p>Передать клиента</p> <IconPersonAdding /></button>
            </div>
        </div>
    )
};

export default WidgetWork;
