import { useState } from 'react';
import s from './Widget.module.scss';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//selectors
import { selectorWidget } from '../../store/reducer/Widget/selector';
import { selectorWork } from '../../store/reducer/Work/selector';
import { selectorCommand } from '../../store/reducer/Command/selector';
import { selectorApp } from '../../store/reducer/App/selector';
import { selectorClient } from '../../store/reducer/Client/selector';
//slice
import { setHeight } from '../../store/reducer/Widget/slice';
import { setDisabledMyClients } from '../../store/reducer/App/slice';
//components
import WidgetCall from '../WidgetCall/WidgetCall';
import WidgetWork from '../WidgetWork/WidgetWork';
import WidgetWorkZoom from '../WidgetWork/WidgetWorkZoom';
import WidgetPlan from '../WidgetPlan/WidgetPlan';
import WidgetEndWork from '../WidgetEndWork/WidgetEndWork';
import WidgetReject from '../WidgetReject/WidgetReject';
import HandOverWidget from '../HandOverClient/HandOverClient';
//utils
import { handleEmptyTask } from '../../utils/dates';

/* stages =[bp, viewBp (ознакомился с БП, road status == finished), ReqZoom (запросил zoom последний лог type == ReqZoom), setZoom (записался на Zoom road status == finished), 
finishZoom (road status == finished)] , noZoom (зумм не состоялся setZoom road status == finished берем последний лог и смотрим что время лога меньше чем текущего времени на пол часа ), 
sendAnketa(смотрим если последний лог type == SendForm), finishAnketa(road status == finished), rejectAnketa]
 */

const Widget = ({ loadClose }) => {
    const road = Object.values(useSelector(selectorWork).road).slice(4, 10);
    const zoom_status = useSelector(selectorWork).zoom_status;
    const next_connect = useSelector(selectorWork).next_connect;
    const last_connect = useSelector(selectorWork).last_connect;
    const zoom_date = useSelector(selectorWork).zoom_date;
    const message = useSelector(selectorCommand).message;
    const loadClient = useSelector(selectorApp).loadClient;
    const stageRoad = useSelector(selectorClient).stage;
    const [stageZoom, setStageZoom] = useState(false);
    const [stageSendAnketa, setStageSendAnketa] = useState(false);
    const [stageAnketa, setStageAnketa] = useState(false);
    const [stageTraining, setStageTraining] = useState(false);
    const [widget, setWidget] = useState(JSON.parse(localStorage.getItem('widget')) || '');
    const [prevWidget, setPrevWidget] = useState(JSON.parse(localStorage.getItem('prevWidget')) || '');
    const [empty, setEmpity] = useState(true);
    const [planWithoutCall, setPlanWithoutCall] = useState(false);
    const [planTime, setPlanTime] = useState('');
    const [planZoom, setPlanZoom] = useState(false);
    const [endType, setEndType] = useState('');
    const widgetHeight = useSelector(selectorWidget).height;
    const dispatch = useDispatch();
    console.log(widget)

    useEffect(() => {
        if (widget == '') {
            dispatch(setHeight(316))
        }
    })

    useEffect(() => {
        if (widget == 'zoom' || widget == 'planZoom') {
            dispatch(setDisabledMyClients(true));
        } else {
            dispatch(setDisabledMyClients(false));
        }
    }, [widget])

    useEffect(() => {
        if (message.action == 'call_client' || message.action == 'call_client_talk') {
            setWidget('call');
            setPrevWidget('call');
            localStorage.setItem('widget', JSON.stringify('call'));
            localStorage.setItem('prevWidget', JSON.stringify('call'));
            JSON.parse(localStorage.getItem('widget')) == 'plan' && setWidget('plan');
            return
        }

        if ((message.action == 'open_client' || message.action == 'wait_client') && loadClient) {
            setTimeout(() => {
                setWidget('');
                setPrevWidget('');
                localStorage.setItem('widget', JSON.stringify(''));
                localStorage.setItem('prevWidget', JSON.stringify(''));
            })
            return
        }

        if (message.action == 'pause' && !planWithoutCall) {
            setWidget('');
            setPrevWidget('');
            localStorage.setItem('widget', JSON.stringify(''));
            localStorage.setItem('prevWidget', JSON.stringify(''));
            return
        }
    }, [message]);

    useEffect(() => {
        if (stageRoad == 'setZoom' || zoom_status == 2) {
            setStageZoom(true);
        } else {
            setStageZoom(false);
        }

        if (stageRoad == 'sendAnketa') {
            setStageSendAnketa(true)
        } else {
            setStageSendAnketa(false)
        }

        if (stageRoad == 'finishAnketa' || stageRoad == 'signContract' || stageRoad == 'prepaid' || stageRoad == 'ReqTraining' || stageRoad == 'finishTraining' || stageRoad == 'access') {
            setStageAnketa(true);
        } else {
            setStageAnketa(false);
        }

        if (stageRoad == 'ReqTraining') {
            setStageTraining(true);
        } else {
            setStageTraining(false)
        }

    }, [stageRoad, zoom_status]);

    useEffect(() => {
        if ((handleEmptyTask(next_connect) || next_connect == '0000-00-00 00:00:00') && handleEmptyTask(zoom_date)) {
            setEmpity(true)
        } else {
            setEmpity(false)
        }
    }, [last_connect, next_connect]);

    return (
        <div style={{ height: `${widgetHeight}px` }} className={`${s.widget}`}>
            {widget === '' && <WidgetCall setWidget={setWidget} setPrevWidget={setPrevWidget} stageZoom={stageZoom} zoomDate={zoom_date} stageSendAnketa={stageSendAnketa} stageAnketa={stageAnketa} empty={empty} loadClose={loadClose} setPlanWithoutCall={setPlanWithoutCall} />}
            {widget === 'call' && <WidgetWork setWidget={setWidget} setPrevWidget={setPrevWidget} setPlanWithoutCall={setPlanWithoutCall} />}
            {widget === 'zoom' && <WidgetWorkZoom setWidget={setWidget} setPrevWidget={setPrevWidget} setPlanWithoutCall={setPlanWithoutCall} />}
            {widget === 'plan' && <WidgetPlan setWidget={setWidget} setPrevWidget={setPrevWidget} type={'call'} planWithoutCall={planWithoutCall} setPlanTime={setPlanTime} setPlanZoom={setPlanZoom} />}
            {widget === 'planZoom' && <WidgetPlan setWidget={setWidget} type={'zoom'} planWithoutCall={planWithoutCall} setPlanTime={setPlanTime} setPlanZoom={setPlanZoom} />}
            {widget == 'end' && <WidgetEndWork planTime={planTime} planZoom={planZoom} setWidget={setWidget} endType={endType} setEndType={setEndType} />}
            {widget == 'cancelZoom' && <WidgetReject setWidget={setWidget} type={'zoom'} setStageZoom={setStageZoom} setEndType={setEndType} />}
            {widget == 'reject' && <WidgetReject setWidget={setWidget} setPrevWidget={setPrevWidget} prevWidget={prevWidget} type={'reject'} setStageZoom={setStageZoom} setEndType={setEndType} />}
            {widget == 'handOver' && <HandOverWidget setWidget={setWidget} prevWidget={prevWidget} setEndType={setEndType} />}
        </div>
    )
};

export default Widget;