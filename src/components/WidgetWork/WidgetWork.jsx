import { useEffect, useRef, useState } from 'react';
import s from './WidgetWork.module.scss';
import { ReactComponent as IconCancel } from '../../image/work/widget/iconCancel.svg';
import { ReactComponent as IconPersonAdding } from '../../image/work/widget/IconPersonAdding.svg';
import { useDispatch, useSelector } from 'react-redux';
//Api
import { sendComment } from '../../Api/Api';
//slice
import { setHeight } from '../../store/reducer/Widget/slice';
import { addComment, replaceComment, setCommentsForSend } from '../../store/reducer/Work/slice';
//selector
import { selectorClient } from '../../store/reducer/Client/selector';
import { selectorWork } from '../../store/reducer/Work/selector';
const tabs = ['Не взял', 'Сбросил', 'Недоступен', 'Zoom']

const WidgetWork = ({ setWidget, setPrevWidget, setPlanWithoutCall }) => {
    const client_id = useSelector(selectorClient).client_id;
    const commentForSend = useSelector(selectorWork).commentsForSend;
    const [type, setType] = useState('zoom');
    const [tab, setTab] = useState(JSON.parse(localStorage.getItem('tab')) || '');
    const [comment, setComment] = useState(JSON.parse(localStorage.getItem('comment')) || '');
    const [anim, setAnim] = useState(false);
    const [sms, setSms] = useState(JSON.parse(localStorage.getItem('sms')) || false);
    const dispatch = useDispatch();
    const textRef = useRef();
    console.log(commentForSend)

    useEffect(() => {
        if (tab !== '') {
            textRef.current.value = tab;
            return
        }
        if (textRef.current.value !== tab) {
            setTab('');
            localStorage.setItem('tab', JSON.stringify(''));
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
        const value = textRef.current.value;
        if (tabs.includes(value)) {
            setTab(value);
            localStorage.setItem('tab', JSON.stringify(value));
        } else {
            setTab('');
            setComment(value);
            localStorage.setItem('comment', JSON.stringify(value));
            localStorage.setItem('tab', JSON.stringify(''));
        }
    }


    const handleCLickTab = (e) => {
        const value = e.currentTarget.textContent;
        if (value === tab) {
            setTab('');
            textRef.current.value = '';
            setComment('');
            localStorage.setItem('tab', JSON.stringify(''));
            localStorage.setItem('comment', JSON.stringify(''))
        } else {
            setTab(value);
            setComment(value);
            localStorage.setItem('tab', JSON.stringify(value));
            localStorage.setItem('comment', JSON.stringify(value))
        }
    }

    const handleSmsSend = () => {
        if (sms) {
            setSms(false);
            localStorage.setItem('sms', JSON.stringify(false));
            return
        }

        if (!sms) {
            setSms(true);
            localStorage.setItem('sms', JSON.stringify(true));
            return
        }
    }

    const handleOpenPlan = () => {
        const message = { id: 0, person_id: 0, client_id: client_id, comment: comment, date: new Date(), sms }
        if (!commentForSend.comment) {
            dispatch(addComment(message));
            dispatch(setCommentsForSend(message));
        } else {
            dispatch(replaceComment(message));
            dispatch(setCommentsForSend(message));
        }
        setWidget('plan');
        setPrevWidget('');
        localStorage.setItem('widget', JSON.stringify('plan'))
        setPlanWithoutCall(false)
    }

    const handleCancelZoom = () => {
        setWidget('reject')
    }

    const handleHandOver = () => {
        setWidget('handOver')
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


            <textarea onChange={handleCleanTab} ref={textRef} className={s.area} placeholder='Комментарий' value={comment || ''}></textarea>
            <div className={`${s.block} ${tab == '' && s.block_hiden}`}>
                <div onClick={handleSmsSend} className={`${s.switch} ${sms && s.switch_on} ${tab == '' && s.switch_hiden}`}>
                    <div></div>
                </div>
                <p> Отправить СМС клиенту о недозвоне</p>
            </div>
            <button disabled={comment.length == 0} onClick={handleOpenPlan} className={`${s.button} ${tab == '' && s.button_margin}`}>Далее</button>
            <div className={s.container}>
                <button onClick={handleCancelZoom} className={s.button_small}><p>Клиент отказался</p> <IconCancel /></button>
                <button onClick={handleHandOver} className={s.button_small}><p>Передать клиента</p> <IconPersonAdding /></button>
            </div>
        </div>
    )
};

export default WidgetWork;
