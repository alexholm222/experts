import s from './Work.module.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
//components
import Client from '../Client/Client';
import Road from '../Road/Road';
import Comments from '../Comments/Comments';
import CallPlan from '../CallPlan/CallPlan';
import WidgetCall from '../Widget/Widget';
//selector
import { selectorApp } from '../../store/reducer/App/selector';

const Work = ({sidebarHiden}) => {
    const [anim, setAnim] = useState(false);
    const [loadClose, setLoadClose] = useState(true);
    const [loadVisible, setLoadVisible] = useState(true);
    const loadPage = useSelector(selectorApp).loadPage;
    const loadClient = useSelector(selectorApp).loadClient;

    //Лоадер инфо о клиенте
    useEffect(() => {
        if (!loadPage && !loadClient) {
            setLoadVisible(false)
            setTimeout(() => {
                setLoadClose(false)
            }, 150)
        } else {
            setLoadClose(true)
        }
    }, [loadPage, loadClient])

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0);
        })

    }, [])

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        }, 100)
    }, []);

    return (
        <div className={`${s.work} ${anim && s.work_anim}`}>
            <div className={`${s.block} ${s.block_left}`}>
                <Client loadClose={loadClose} loadVisible={loadVisible} />
                <Road loadClose={loadClose} loadVisible={loadVisible} />
                <Comments loadClose={loadClose} loadVisible={loadVisible} />
            </div>
            <div className={`${s.block} ${s.block_right}`}>
                <CallPlan loadClose={loadClose} loadVisible={loadVisible} sidebarHiden={sidebarHiden}/>
                <WidgetCall />
            </div>
            <div className={`${s.block} ${s.block_scenario}`}>

            </div>
        </div>
    )
};

export default Work;