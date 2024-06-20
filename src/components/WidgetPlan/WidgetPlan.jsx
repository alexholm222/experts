import { useEffect, useRef, useState } from 'react';
import s from './WidgetPlan.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as IconBackForward } from '../../image/work/widget/iconBackForward.svg';
import { ReactComponent as Lock } from '../../image/work/widget/lock.svg';
import InputMask from 'react-input-mask';
import { handleDay, handleTime } from '../../utils/dates';
//Api
import { sendComment, sendPlanTime, finishZoom } from '../../Api/Api';
//slice
import { setHeight } from '../../store/reducer/Widget/slice';
import { setClientUpdate, setMenuIdUpdate } from '../../store/reducer/Client/slice';
//selector
import { selectorWork } from '../../store/reducer/Work/selector';
import { selectorClient } from '../../store/reducer/Client/selector';
//utils
import { handleDateForPlan } from '../../utils/dates';


const WidgetPlan = ({ setWidget, setPrevWidget, type, planWithoutCall, setPlanTime, setPlanZoom }) => {
    const [anim, setAnim] = useState(false);
    const [animItem, setAnimItem] = useState(true);
    const [time, setTime] = useState('');
    const [tabActive, setTabActive] = useState('call');
    const [dayActive, setDayActive] = useState(handleDay(0).textDate || '');
    const [timeActive, setTimeActive] = useState(0);
    const [heightTimeBlock, setHeighTimeBlock] = useState(0);
    const [notPlan, setNotPlan] = useState(false);
    const [zoomSms, setZoomSms] = useState(true);
    const [timeInput, setTimeInput] = useState(false);
    const [timeAdd, setTimeAdd] = useState('');
    const [blockTime, setBlockTime] = useState(0);
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [isToday, setIsToday] = useState(true);
    const commentsForSend = useSelector(selectorWork).commentsForSend;
    const client_id = useSelector(selectorClient).client_id;
    const dispatch = useDispatch();
    const timeNow = handleTime(0).minute >= 30 ? handleTime(1).hour : handleTime(0).hour + 0.5;
    const timeStart = dayActive == handleDay(0).textDate ? timeNow : 10.5;
    const timeEnd = 19;
    const timeArrayLength = tabActive == 'zoom' ? Math.floor(timeEnd - timeStart) : (timeEnd - timeStart) * 2;
    const timeBlockRef = useRef();
    const height = dayActive == handleDay(0).textDate ? timeBlockRef?.current?.offsetHeight : timeBlockRef?.current?.offsetHeight + 0.0001;
    const heightEl = (type == 'call' ? 316 : 250) + ((tabActive == 'zoom' && type !== 'zoom') ? 26 : 0);


    useEffect(() => {
        setAnim(true)
    }, []);

    useEffect(() => {
        if (tabActive == 'zoom') {
            setBlockTime(15)
        } else {
            setBlockTime(0)
        }
    }, [tabActive])

    useEffect(() => {
        if (timeActive == 25) {
            const hours = timeAdd.slice(0, 2);
            const minutes = timeAdd.slice(2);
            setTime(handleDateForPlan(dayActive, hours, minutes).dateText1)
            return
        }

        if (timeActive <= 3) {
            const allTime = Math.ceil(timeActive * 60);
            const hours = Math.trunc(allTime / 60);
            const minutes = allTime % 60;
            setTime(handleDateForPlan(dayActive, hours, minutes).dateText2)
            return
        }

        if (timeActive > 3) {
            const allTime = Math.ceil(timeActive * 60);
            const hours = Math.trunc(allTime / 60);
            const minutes = allTime % 60;
            setTime(handleDateForPlan(dayActive, hours, minutes).dateText1)
            return
        }

    }, [timeActive])

    useEffect(() => {
        setHeighTimeBlock(height);
        dispatch(setHeight(height + heightEl));

    }, [height, heightEl, tabActive]);

    useEffect(() => {
        if (tabActive == 'zoom') {
            setPlanZoom(true)
        } else {
            setPlanZoom(false)
        }
    }, [tabActive]);


    const handleChangeTab = (e) => {
        setTimeActive(0);
        setTimeInput(false);
        setTimeAdd('');
        const id = e.currentTarget.id;
        setTabActive(id)
    }

    const handleBack = () => {
        if (planWithoutCall) {
            setWidget('');
            setPrevWidget('');
            localStorage.setItem('widget', JSON.stringify(''))
            return
        }

        if (!planWithoutCall && type == 'call') {
            setWidget('call');
            setPrevWidget('call');
            localStorage.setItem('prevWidget', JSON.stringify('call'));
            localStorage.setItem('widget', JSON.stringify('call'))
            return
        }

        if (!planWithoutCall && type == 'zoom') {
            setWidget('zoom');
            /*   setPrevWidget('zoom'); */
            localStorage.setItem('prevWidget', JSON.stringify('zoom'));
            localStorage.setItem('widget', JSON.stringify('zoom'))
            return
        }
    }

    const handleSelectDay = (e) => {
        setTimeInput(false);
        setTimeAdd('');
        setTimeActive(0);
        const id = e.currentTarget.id;
        const value = e.currentTarget.value;
        setDayActive(id)
    }

    const handleSelectTime = (e) => {
        setTimeInput(false)
        setTimeAdd('');
        const id = e.currentTarget.id;
        setTimeActive(id)
    }

    const handleNoPlan = () => {
        if (notPlan) {
            setNotPlan(false)
        } else {
            setNotPlan(true)
        }
    }

    const handleZoomSms = () => {
        if (zoomSms) {
            setZoomSms(false)
        } else {
            setZoomSms(true)
        }
    }

    const handleTimeInput = () => {
        timeAdd.length < 4 && setTimeActive(0)
        setTimeInput(true)
    }

    const handleTimeAdd = (e) => {
        const value = e.currentTarget.value;
        const regex = /[0-9]/g;
        const regex2 = /[1-9]/g;
        const cleanValue = value?.match(regex)?.join('');
        cleanValue && cleanValue.length == 4 ? setTimeActive(25) : setTimeActive(0);
        cleanValue && setTimeAdd(cleanValue);
    }

    const handleOpenTooltip = () => {
        setTooltipOpen(true)
    }

    const handleCloseTooltip = () => {
        setTooltipOpen(false)
    }

    const handleEndWork = () => {
        console.log(type, time, commentsForSend);
        const formData = new FormData();
        !planWithoutCall && formData.append('id', client_id);
        !planWithoutCall && formData.append('comment', commentsForSend.comment);
        !planWithoutCall && formData.append('is_sms', commentsForSend.sms ? 1 : 0);
        !planWithoutCall && commentsForSend?.file?.file && formData.append('screenshot', commentsForSend.file?.file);

        !planWithoutCall && sendComment(formData/* { id: client_id, comment: commentsForSend.comment, is_sms: commentsForSend.sms, screenshot: commentsForSend.file.file ? commentsForSend.file.file : ''} */)
            .then(res => {
                console.log(res)
            })



        type !== 'zoom' && sendPlanTime({ id: client_id, type: tabActive, next_connect: time, is_sms: tabActive == 'call' ? false : zoomSms })
            .then(res => {
                console.log(res)
                dispatch(setClientUpdate(client_id));
            })

        type == 'zoom' && finishZoom({ id: client_id })
            .then(res => {
                dispatch(setMenuIdUpdate());
                dispatch(setClientUpdate(client_id));
                console.log(res);
            })
            .catch(err => console.log(err))

        setPlanTime(time);/* planWithoutCall */
        setWidget('end');
        localStorage.setItem('widget', JSON.stringify('end'))
    }

    return (
        <div className={`${s.plan} ${anim && s.plan_anim}`}>
            <p className={s.title}>Планирование контакта</p>
            {type == 'call' && <div className={s.tabs}>
                <div onClick={handleChangeTab} id='zoom' className={`${s.tab} ${tabActive == 'zoom' && s.tab_active}`}>Zoom-встреча</div>
                <div onClick={handleChangeTab} id='call' className={`${s.tab} ${tabActive == 'call' && s.tab_active}`}>Звонок</div>
            </div>
            }
            <div style={{ height: `${heightTimeBlock + 108}px` }} className={s.main}>
                <div className={s.container}>
                    <div className={s.textblock}>
                        <p className={s.text}>День</p>
                    </div>

                    <div className={s.block}>

                        {[...Array(9)].map((el, index) => {
                            const date = handleDay(index);
                            const dateNow = handleDay(0);
                            const id = date.day == dateNow.day ? dateNow.textDate : date.textDate;

                            if (date.dayWeek !== 'Сб' && date.dayWeek !== 'Вс') {

                                return <div onClick={handleSelectDay} id={id} className={`${s.item} ${dayActive == id && s.item_active}`}>
                                    <p>{date.day == dateNow.day ? 'Сегодня' : date.dayWeek}<sup>{date.day == dateNow.day ? '' : date.day}</sup></p>
                                </div>
                            }

                        })}

                    </div>
                </div>

                <div className={s.container}>
                    <div className={s.textblock}>
                        <p className={s.text}>Время</p>
                    </div>

                    <div className={s.block}>
                        {dayActive == handleDay(0).textDate && tabActive == 'call' && <div className={`${s.block} ${s.block_min}`}>
                            <div onClick={handleSelectTime} id={'0.08'} className={`${s.item} ${timeActive == '0.08' && s.item_active} ${animItem && s.item_anim}`}>
                                <p>Через 5 мин</p>
                            </div>

                            <div onClick={handleSelectTime} id={'0.25'} className={`${s.item} ${timeActive == '0.25' && s.item_active} ${animItem && s.item_anim}`}>
                                <p>15 мин</p>
                            </div>

                            <div onClick={handleSelectTime} id={'0.5'} className={`${s.item} ${timeActive == '0.5' && s.item_active} ${animItem && s.item_anim}`}>
                                <p>30 мин</p>
                            </div>

                            <div onClick={handleSelectTime} id={'1'} className={`${s.item} ${timeActive == '1' && s.item_active} ${animItem && s.item_anim}`}>
                                <p>Через час</p>
                            </div>

                            <div onClick={handleSelectTime} id={'2'} className={`${s.item} ${timeActive == '2' && s.item_active} ${animItem && s.item_anim}`}>
                                <p>Два</p>
                            </div>

                            <div onClick={handleSelectTime} id={'3'} className={`${s.item} ${timeActive == '3' && s.item_active} ${animItem && s.item_anim}`}>
                                <p>Три</p>
                            </div>
                        </div>
                        }


                        {timeArrayLength > 0 && [...Array(timeArrayLength)].map((el, index) => {
                            const id = tabActive === 'zoom' ? Math.ceil(timeStart) + index : timeStart + index / 2;
                            /*   if (blockTime == id) {
                                  return <div onMouseEnter={handleOpenTooltip} onMouseLeave={handleCloseTooltip} key={id} id={id} className={`${s.item} ${s.item_time} ${s.item_block} ${animItem && s.item_time_anim} ${id == timeActive && s.item_active}`}>
                                      {blockTime == id && <Lock />} <p>{`${id}`.slice(0, 2)}:{id - `${id}`.slice(0, 2) == 0 ? '00' : '30'}</p>
                                      {<div className={`${s.tooltip} ${blockTime == id && tooltipOpen && s.tooltip_open}`}>sdfsdf</div>}
                                  </div>
                              } */

                            if (/* blockTime !==  */id) {
                                return <div key={id} onClick={handleSelectTime} id={id} className={`${s.item} ${s.item_time}  ${animItem && s.item_time_anim} ${id == timeActive && s.item_active}`}>
                                    <p>{`${id}`.slice(0, 2)}:{id - `${id}`.slice(0, 2) == 0 ? '00' : '30'}</p>
                                </div>
                            }

                        })}
                        <div id='25' onClick={handleTimeInput} className={`${s.item} ${timeInput && s.item_another_add} ${s.item_another} ${timeActive == '25' && s.item_active}`}>
                            {timeInput && <InputMask mask="99:99" onChange={handleTimeAdd} value={timeAdd || ''}>
                                {() => <input
                                    type="tel"
                                    placeholder="__:__"
                                />}
                            </InputMask>}
                            {!timeInput && <p>Другое</p>}
                        </div>
                    </div>


                    <div ref={timeBlockRef} className={`${s.block} ${s.block_hiden}`}>
                        {dayActive == handleDay(0).textDate && tabActive == 'call' && <div className={`${s.block} ${s.block_min}`}>
                            <div id={'0.05'} className={`${s.item} ${timeActive == '0.05' && s.item_active} ${animItem && s.item_anim}`}>
                                <p>Через 5 мин</p>
                            </div>

                            <div id={'0.15'} className={`${s.item} ${timeActive == '0.15' && s.item_active} ${animItem && s.item_anim}`}>
                                <p>15 мин</p>
                            </div>

                            <div id={'0.3'} className={`${s.item} ${timeActive == '0.3' && s.item_active} ${animItem && s.item_anim}`}>
                                <p>30 мин</p>
                            </div>

                            <div id={'1'} className={`${s.item} ${timeActive == '1' && s.item_active} ${animItem && s.item_anim}`}>
                                <p>Через час</p>
                            </div>

                            <div id={'2'} className={`${s.item} ${timeActive == '2' && s.item_active} ${animItem && s.item_anim}`}>
                                <p>Два</p>
                            </div>

                            <div id={'3'} className={`${s.item} ${timeActive == '3' && s.item_active} ${animItem && s.item_anim}`}>
                                <p>Три</p>
                            </div>
                        </div>
                        }



                        {timeArrayLength > 0 && [...Array(timeArrayLength)].map((el, index) => {
                            const id = tabActive === 'zoom' ? Math.ceil(timeStart) + index : timeStart + index / 2;

                            if (blockTime == id) {
                                return <div id={id} className={`${s.item} ${s.item_block}`}>
                                    {blockTime == id && <Lock />} <p>{`${id}`.slice(0, 2)}:{id - `${id}`.slice(0, 2) == 0 ? '00' : '30'}</p>
                                </div>
                            } else {
                                return <div key={id} id={id} className={`${s.item} ${s.item_time}`}>
                                    <p>{`${id}`.slice(0, 2)}:{id - `${id}`.slice(0, 2) == 0 ? '00' : '30'}</p>
                                </div>
                            }
                        })}
                        <div id='другое' className={`${s.item} ${timeInput && s.item_another_add} ${s.item_another} ${s.item_time}`}>
                            <p>Другое</p>
                        </div>

                    </div>

                </div>
            </div>

            {type === 'gdfgdf' && <div className={`${s.container_switch}`}>
                <div onClick={handleNoPlan} className={`${s.switch} ${notPlan && s.switch_on}`}>
                    <div></div>
                </div>
                <p> Не планировать следующий контакт</p>
            </div>
            }

            <div className={`${s.container_switch} ${(tabActive !== 'zoom' || type == 'zoom') && s.container_hiden}`}>
                <div onClick={handleZoomSms} className={`${s.switch} ${zoomSms && s.switch_on} ${tabActive !== 'zoom' && s.switch_hiden}`}>
                    <div></div>
                </div>
                <p> Отправить СМС-оповещение о встрече</p>
            </div>


            <div className={s.buttons}>
                <button onClick={handleBack} className={s.button_second}><IconBackForward /> Назад</button>
                <button onClick={handleEndWork} disabled={timeActive == 0} className={`${s.button}`}>Запланировать</button>
            </div>
        </div>
    )
};

export default WidgetPlan;