import { useState } from 'react';
import s from './Widget.module.scss';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//selectors
import { selectorWidget } from '../../store/reducer/Widget/selector';
//slice
import { setHeight } from '../../store/reducer/Widget/slice';
//components
import WidgetCall from '../WidgetCall/WidgetCall';
import WidgetWork from '../WidgetWork/WidgetWork';
import WidgetWorkZoom from '../WidgetWork/WidgetWorkZoom';
import WidgetPlan from '../WidgetPlan/WidgetPlan';

const Widget = () => {
    const [widget, setWidget] = useState('');
    const widgetHeight = useSelector(selectorWidget).height;
    const dispatch = useDispatch();

    useEffect(() => {
        if (widget == '') {
            dispatch(setHeight(316))
        }
    })

    return (
        <div style={{ height: `${widgetHeight}px` }} className={`${s.widget}`}>
            {widget === '' && <WidgetCall setWidget={setWidget} />}
            {widget === 'call' && <WidgetWork setWidget={setWidget} />}
            {widget === 'zoom' && <WidgetWorkZoom setWidget={setWidget} />}
            {widget === 'plan' && <WidgetPlan setWidget={setWidget} type={'call'} />}
            {widget === 'planZoom' && <WidgetPlan setWidget={setWidget} type={'zoom'} />}
        </div>
    )
};

export default Widget;