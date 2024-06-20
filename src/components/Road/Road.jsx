import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './Road.module.scss';
import { ReactComponent as CaretDown } from '../../image/work/CaretDown.svg';
import RoadItem from './RoadItem';
//Api
import { getAnketa } from '../../Api/Api';
//selector
import { selectorWork } from '../../store/reducer/Work/selector';
import { selectorClient } from '../../store/reducer/Client/selector';
//slice
import { setStage, setAnketaAcceptDate } from '../../store/reducer/Client/slice';
import { setAnketaForm } from '../../store/reducer/Work/slice';
//component
import RoadSceleton from './RoadSceleton/RoadSceleton';
import Material from './Material/Material';
//utils
import { handleDifDateZoom, handleDateStudyReq } from '../../utils/dates';
/* stages =[bp, viewBp (ознакомился с БП, road status == finished), ReqZoom (запросил zoom последний лог type == ReqZoom), setZoom (записался на Zoom road status == finished), 
finishZoom (road status == finished)] , noZoom (зумм не состоялся setZoom road status == finished берем последний лог и смотрим что время лога меньше чем текущего времени на пол часа ), 
sendAnketa(смотрим если последний лог type == SendForm), finishAnketa(road status == finished), rejectAnketa]
 */

function Road({ loadClose, loadVisible }) {
    const road = Object.values(useSelector(selectorWork).road).slice(4, 12);
    const materials = Object.values(useSelector(selectorWork).road)[2];
    const client_id = useSelector(selectorClient).client_id;
    const clientUpdate = useSelector(selectorClient).clientUpdate;
    const menuIdUpdate = useSelector(selectorClient).menuIdUpdate;
    const zoom_date = useSelector(selectorWork).zoom_date;
    const stage = useSelector(selectorClient).stage;
    const [lastCheck, setLastChek] = useState(15);
    const [openList, setOpenList] = useState(false);
    const dispatch = useDispatch();
    console.log(road)

    useEffect(() => {
        if (road[0]?.status == 'finished' && road[1]?.logs.length == 0) {
            dispatch(setStage('viewBp'));
            return
        }

        if (road[1]?.status == 'disabled' && road[2]?.status !== 'finished' && road[1]?.logs[0]?.type == 'ReqZoom') {
            dispatch(setStage('ReqZoom'));
            return
        }

        if (road[1]?.status == 'finished' && road[2]?.status !== 'finished' && road[1]?.logs.length > 0 && !handleDifDateZoom(zoom_date)) {
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
        if (road[3]?.status == 'finished') {
            const acceptLog = road[3]?.logs?.find(el => el.type == 'ClientAnketaAccept');
            dispatch(setAnketaAcceptDate(road[3]?.date));
            return
        }
    }, [road]);

    useEffect(() => {
        const sendAnketaLog = road[3]?.logs.find(el => el.type == 'SendForm')
        if (sendAnketaLog) {
            getAnketa(client_id)
                .then(res => {
                    console.log(res);
                    const anketa = res.data.anketa;
                    dispatch(setAnketaForm(anketa));
                })
                .catch(err => console.log(err))
            return
        }
    }, [road[3]]);

    useEffect(() => {
        if (client_id == clientUpdate) {
            console.log('обновление роад')
            const checkNum = road.findLast(el => el.status == 'finished');
            setLastChek(checkNum?.name);
        }
    }, [menuIdUpdate, client_id]);


    const handleOpenList = () => {
        if (openList) {
            setOpenList(false)
        } else {
            setOpenList(true)
        }
    }
    return (
        <div className={s.road}>
           {/*  <Material materials={materials} /> */}
            <ul className={`${s.list} ${openList && s.list_open}`}>

                {road.map((el, index) => {
                    let status = 'disabled';
                    let name = '';
                    let date = '';

                    if (index == 1 && stage == 'viewBp') {
                        status = 'disabled';
                        name = el.name;
                        date = el.date;
                    } else if (index == 1 && stage == 'ReqZoom') {
                        status = 'yellow';
                        name = 'Клиент запросил Zoom';
                        date = road[1]?.logs[0]?.date;
                    } else if (index == 2 && stage == 'noZoom') {
                        status = 'fail';
                        name = 'Zoom не состоялся';
                        date = el.date;
                    } else if (index == 3 && stage == 'sendAnketa') {
                        status = 'yellow';
                        name = 'Проверь анкету клиента';
                        date = el.date;
                    } else if (index == 6 && stage == 'ReqTraining') {
                        status = el.status;
                        name = `Обучение ${handleDateStudyReq(road[6]?.logs[0]?.comment.slice(-10))?.date}`;
                        date = el.date;
                    } else {
                        status = el.status;
                        name = el.name;
                        date = el.date;
                    }

                    return <RoadItem key={index} name={name} type={status} date={date}
                        idCheck={el.status == 'finished' && index} lastCheck={lastCheck}
                        stage={stage}
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