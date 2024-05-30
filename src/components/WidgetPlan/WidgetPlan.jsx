import { useEffect, useRef, useState } from 'react';
import s from './WidgetPlan.module.scss';
import { useDispatch } from 'react-redux';
import { ReactComponent as IconBackForward } from '../../image/work/widget/iconBackForward.svg';
import { ReactComponent as Lock } from '../../image/work/widget/lock.svg';
import InputMask from 'react-input-mask';
import { handleDay, handleTime } from '../../utils/dates';
//slice
import { setHeight } from '../../store/reducer/Widget/slice';


const WidgetPlan = ({ setWidget, type }) => {
    const [anim, setAnim] = useState(false);
    const [animItem, setAnimItem] = useState(true);
    const [time, setTime] = useState('');
    const [tabActive, setTabActive] = useState(type == 'call' ? 'call' : 'zoom');
    const [dayActive, setDayActive] = useState('0');
    const [timeActive, setTimeActive] = useState(0);
    const [heightTimeBlock, setHeighTimeBlock] = useState(0);
    const [notPlan, setNotPlan] = useState(false);
    const [zoomSms, setZoomSms] = useState(true);
    const [timeInput, setTimeInput] = useState(false);
    const [timeAdd, setTimeAdd] = useState(0);
    const [blockTime, setBlockTime] = useState(0);
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const dispatch = useDispatch();
    const timeNow = handleTime(0).minute >= 30 ? handleTime(1).hour : handleTime(0).hour + 0.5;
    const timeStart = dayActive == 0 ? timeNow : 10.5;
    const timeEnd = 19;
    const timeArrayLength = tabActive == 'zoom' ? Math.floor(timeEnd - timeStart) : (timeEnd - timeStart) * 2;
    const timeBlockRef = useRef();
    const height = dayActive == '0' ? timeBlockRef?.current?.offsetHeight : timeBlockRef?.current?.offsetHeight + 0.0001;
    const heightEl = (type == 'call' ? 316 : 250) + ((tabActive == 'zoom' && type !== 'zoom') ? 26 : 0)

    useEffect(() => {
        if (tabActive == 'zoom') {
            setBlockTime(15)
        } else {
            setBlockTime(0)
        }
    }, [tabActive])

    useEffect(() => {
        if (timeActive == 25) {
            setTime(timeAdd)
        } else {
            setTime(timeActive)
        }
    })

    useEffect(() => {
        setHeighTimeBlock(height);
        dispatch(setHeight(height + heightEl));
    }, [height, heightEl, tabActive]);

    useEffect(() => {
        setAnim(true)
    }, []);

    const handleChangeTab = (e) => {
        setTimeActive(0);
        setTimeInput(false);
        setTimeAdd(0);
        const id = e.currentTarget.id;
        setTabActive(id)
    }

    const handleBack = () => {
        type === 'call' ? setWidget('call') : setWidget('zoom');
    }

    const handleSelectDay = (e) => {
        setTimeInput(false);
        setTimeAdd('');
        setTimeActive(0);
        const id = e.currentTarget.id;
        setDayActive(id)
    }

    const handleSelectTime = (e) => {
        setTimeInput(false)
        setTimeAdd('');
        const id = e.currentTarget.id;
        console.log(id)
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
        setTimeActive(0)
        setTimeInput(true)
    }

    const handleTimeAdd = (e) => {
        const value = e.currentTarget.value;
        const regex = /[0-9]/g;
        const regex2 = /[1-9]/g;
        const cleanValue = value?.match(regex)?.join('');
        const hour = cleanValue && cleanValue.slice(0, 2).match(regex2)?.join('');
        const minute = cleanValue && cleanValue.slice(-2).match(regex2)?.join('');
        console.log(hour, minute, timeStart)
        cleanValue && cleanValue.length == 4 ? setTimeActive(25) : setTimeActive(0);
        value && setTimeAdd(cleanValue);
    }

    const handleOpenTooltip = () => {
        setTooltipOpen(true)
    }

    const handleCloseTooltip = () => {
        setTooltipOpen(false)
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

                            if (date.dayWeek !== 'Сб' && date.dayWeek !== 'Вс') {
                                return <div onClick={handleSelectDay} id={index} className={`${s.item} ${dayActive == index && s.item_active}`}>
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
                        {dayActive == 0 && tabActive == 'call' && <div className={`${s.block} ${s.block_min}`}>
                            <div onClick={handleSelectTime} id={'0.05'} className={`${s.item} ${timeActive == '0.05' && s.item_active} ${animItem && s.item_anim}`}>
                                <p>Через 5 мин</p>
                            </div>

                            <div onClick={handleSelectTime} id={'0.15'} className={`${s.item} ${timeActive == '0.15' && s.item_active} ${animItem && s.item_anim}`}>
                                <p>15 мин</p>
                            </div>

                            <div onClick={handleSelectTime} id={'0.3'} className={`${s.item} ${timeActive == '0.3' && s.item_active} ${animItem && s.item_anim}`}>
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


                        {[...Array(timeArrayLength)].map((el, index) => {
                            const id = tabActive === 'zoom' ? Math.ceil(timeStart) + index : timeStart + index / 2;
                            if (blockTime == id) {
                                return <div onMouseEnter={handleOpenTooltip} onMouseLeave={handleCloseTooltip} key={id} id={id} className={`${s.item} ${s.item_time} ${s.item_block} ${animItem && s.item_time_anim} ${id == timeActive && s.item_active}`}>
                                    {blockTime == id && <Lock />} <p>{`${id}`.slice(0, 2)}:{id - `${id}`.slice(0, 2) == 0 ? '00' : '30'}</p>
                                    {<div className={`${s.tooltip} ${blockTime == id && tooltipOpen && s.tooltip_open}`}>sdfsdf</div>}
                                </div>
                            }

                            if (blockTime !== id) {
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
                        {dayActive == 0 && tabActive == 'call' && <div className={`${s.block} ${s.block_min}`}>
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



                        {[...Array(timeArrayLength)].map((el, index) => {
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
                <button className={`${s.button}`}>Запланировать</button>
            </div>
        </div>
    )
};

export default WidgetPlan;