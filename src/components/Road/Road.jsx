import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './Road.module.scss';
import { ReactComponent as CaretDown } from '../../image/work/CaretDown.svg';
import RoadItem from './RoadItem';
//selector
import { selectorWork } from '../../store/reducer/Work/selector';
import { selectorClient } from '../../store/reducer/Client/selector';
//slice
import { setStage } from '../../store/reducer/Client/slice';
//component
import RoadSceleton from './RoadSceleton/RoadSceleton';
//utils
import { handleDifDateZoom, handleDateStudyReq } from '../../utils/dates';
/* stages =[bp, viewBp (ознакомился с БП, road status == finished), ReqZoom (запросил zoom последний лог type == ReqZoom), setZoom (записался на Zoom road status == finished), 
finishZoom (road status == finished)] , noZoom (зумм не состоялся setZoom road status == finished берем последний лог и смотрим что время лога меньше чем текущего времени на пол часа ), 
sendAnketa(смотрим если последний лог type == SendForm), finishAnketa(road status == finished), rejectAnketa]
 */

function Road({ loadClose, loadVisible }) {
    const road = Object.values(useSelector(selectorWork).road).slice(4, 12);
    console.log(road)
    const client_id = useSelector(selectorClient).client_id;
    const clientUpdate = useSelector(selectorClient).clientUpdate;
    const zoom_date = useSelector(selectorWork).zoom_date;
    const stage = useSelector(selectorClient).stage;
    const [lastCheck, setLastChek] = useState(15);
    const [openList, setOpenList] = useState(false);
    const dispatch = useDispatch();
    console.log(stage, zoom_date)

    useEffect(() => {
        if (road[0]?.status == 'finished' && road[1]?.status == 'disabled' &&  road[1]?.logs.length == 0) {
            dispatch(setStage('viewBp'));
            return
        }

        if (road[1]?.status == 'disabled' && road[2]?.status !== 'finished' && road[1]?.logs[0]?.type == 'ReqZoom') {
            dispatch(setStage('ReqZoom'));
            return
        }

        if (road[1]?.status == 'finished' && road[2]?.status !== 'finished' && !handleDifDateZoom(zoom_date)) {
            dispatch(setStage('setZoom'));
            return
        }

        if (road[1]?.status == 'finished' && road[2]?.status !== 'finished' && handleDifDateZoom(zoom_date)) {
            dispatch(setStage('noZoom'));
            return
        }

        if (road[2]?.status == 'finished' && road[3]?.status == 'enabled') {
            dispatch(setStage('finishZoom'));
            return
        }

        if (road[3]?.status == 'waiting') {
            dispatch(setStage('sendAnketa'));
            return
        }

        if (road[3]?.status == 'finished' && road[4]?.status == 'disabled') {
            dispatch(setStage('finishAnketa'));
            return
        }

        if (road[4]?.status == 'finished' && road[5]?.status == 'disabled') {
            dispatch(setStage('signContract'));
            return
        }

        if (road[5]?.status == 'finished' && road[6]?.status == 'disabled') {
            dispatch(setStage('prepaid'));
            return
        }

        if (road[6]?.status == 'waiting' && road[7]?.status == 'disabled') {
            dispatch(setStage('ReqTraining'));
            return
        }

        if (road[6]?.status == 'finished') {
            dispatch(setStage('finishTraining'));
            return
        }

        if (road[7]?.status == 'finished') {
            dispatch(setStage('access'));
            return
        }
    }, [road, client_id, clientUpdate]);

    useEffect(() => {
        if (client_id == clientUpdate) {
            setTimeout(() => {
                const checkNum = road.findLast(el => el.status == 'finished');
                setLastChek(checkNum?.date + checkNum?.name);
            }, 500);
            return
        }
    }, [clientUpdate]);


    const handleOpenList = () => {
        if (openList) {
            setOpenList(false)
        } else {
            setOpenList(true)
        }
    }
    return (
        <div className={s.road}>
            <ul className={`${s.list} ${openList && s.list_open}`}>
                {road.map((el, index) => {
                    let status = 'disabled';
                    let name = '';

                    if (index == 1 && stage == 'viewBp') {
                        status = 'disabled';
                        name = el.name;
                    } else if (index == 1 && stage == 'ReqZoom') {
                        status = 'yellow';
                        name = 'Клиент запросил Zoom';
                    } else if (index == 2 && stage == 'noZoom') {
                        status = 'fail';
                        name = 'Zoom не состоялся';
                    } else if (index == 3 && stage == 'sendAnketa') {
                        status = 'yellow';
                        name = 'Проверь анкету клиента';
                    } else if (index == 6 && stage == 'ReqTraining') {
                        status = el.status;
                        name = `Обучение ${handleDateStudyReq(road[6]?.logs[0]?.comment.slice(-10))?.date}`;
                    } else {
                        status = el.status;
                        name = el.name;
                    }

                    return <RoadItem key={index} name={name} type={status} date={el.date}
                        idCheck={el.status == 'finished' && index} lastCheck={lastCheck}
                    />
                })
                }
            </ul>
            {loadClose && <RoadSceleton load={loadClose} />}
            <button onClick={handleOpenList} className={`${s.button} ${loadClose && s.button_dis} ${openList && s.button_open}`}><CaretDown /></button>
        </div>
    )
};

export default Road;