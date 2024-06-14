import { useEffect, useState, useRef } from 'react';
import s from './WidgetReject.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as IconCancel } from '../../image/work/widget/iconCancel.svg';
import { ReactComponent as IconPersonAdding } from '../../image/work/widget/IconPersonAdding.svg';
import { ReactComponent as IconBackForward } from '../../image/work/widget/iconBackForward.svg';
//Api
import { rejectZoom, rejectClient } from '../../Api/Api';
//selector
import { selectorClient } from '../../store/reducer/Client/selector';
//slice
import { setHeight } from '../../store/reducer/Widget/slice';
import { setClientUpdate } from '../../store/reducer/Client/slice';
import { setCommand } from '../../store/reducer/Command/slice';

const tabs = ['Клиент не подключился', 'Перенос']

const WidgetReject = ({ setWidget, setPrevWidget, prevWidget, type, setStageZoom, setEndType }) => {
    const client_id = useSelector(selectorClient).client_id;
    const [anim, setAnim] = useState(false);
    const [tab, setTab] = useState('');
    const [comment, setComment] = useState('');
    const [switchOn, setSwitchOn] = useState(true);
    const dispatch = useDispatch();
    const textRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        }, 100)

        type == 'zoom' ? dispatch(setHeight(362)) : dispatch(setHeight(265))
    }, [type]);

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

    const handleCancleZoom = () => {
        rejectZoom({ id: client_id, comment })
            .then(res => {
                console.log(res);
                setStageZoom(false);
                setWidget('');
                setPrevWidget('');
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleRejectClient = () => {
        rejectClient({ id: client_id, comment, is_bad: switchOn })
            .then(res => {
                console.log(res);
                setWidget('end');
                setEndType('reject')
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleCancelZoom = () => {
        setWidget('reject')
    }

    const handleBack = () => {
        setWidget(prevWidget);
        setPrevWidget(prevWidget);
        localStorage.setItem('widget', JSON.stringify(prevWidget))
    }

    const handleSwitch = () => {
        if (switchOn) {
            setSwitchOn(false);
        } else {
            setSwitchOn(true)
        }
    }

    const handleHandOver = () => {
        setWidget('handOver')
    }


    return (
        <div className={`${s.reject} ${anim && s.reject_anim}`}>
            {type == 'zoom' && <p className={s.title}>Отмена Zoom-встречи</p>}
            {type == 'reject' && <p className={s.title}>Отказ клиента</p>}
            {type == 'zoom' && <div className={s.tabs}>
                {tabs.map((el) => {
                    return <div onClick={handleCLickTab} className={`${s.tab} ${el === tab && s.tab_active}`}>
                        <p>{el}</p>
                    </div>
                })}
            </div>
            }


            <textarea onChange={handleCleanTab} ref={textRef} className={s.area} placeholder='Комментарий' value={comment || ''}></textarea>
            <div onClick={handleSwitch} className={`${s.block}`}>
                <div className={`${s.switch} ${switchOn && s.switch_on}`}>
                    <div></div>
                </div>
                <p>Сообщить о некачественном лиде</p>
            </div>
            {type == 'zoom' && <button disabled={comment.length == 0} onClick={handleCancleZoom} className={`${s.button}`}>Отменить встречу</button>}
            {type == 'reject' && <div className={s.buttons}>
                <button onClick={handleBack} className={s.button_second}><IconBackForward /> Назад</button>
                <button disabled={comment.length == 0} onClick={handleRejectClient} className={`${s.button} ${s.button_reject}`}>Подтвердить отказ</button>
            </div>
            }

            {type == 'zoom' && <div className={s.container}>
                <button onClick={handleCancelZoom} className={s.button_small}><p>Клиент отказался</p> <IconCancel /></button>
                <button onClick={handleHandOver} className={s.button_small}><p>Передать клиента</p> <IconPersonAdding /></button>
            </div>
            }
        </div>
    )
};

export default WidgetReject;