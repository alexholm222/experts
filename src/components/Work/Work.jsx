import s from './Work.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//components
import Client from '../Client/Client';
import Road from '../Road/Road';
import Comments from '../Comments/Comments';
import CallPlan from '../CallPlan/CallPlan';
import Widget from '../Widget/Widget';
import Anketa from '../Anketa/Anketa';
//selector
import { selectorApp } from '../../store/reducer/App/selector';
import { selectorClient } from '../../store/reducer/Client/selector';
import { selectorWork } from '../../store/reducer/Work/selector';

const Work = ({ sidebarHiden }) => {
    const [anim, setAnim] = useState(false);
    const [loadClose, setLoadClose] = useState(true);
    const [loadVisible, setLoadVisible] = useState(true);
    const dispatch = useDispatch();
    const loadPage = useSelector(selectorApp).loadPage;
    const loadClient = useSelector(selectorApp).loadClient;
    const client_id = useSelector(selectorClient).client_id;
    const openAnketa = useSelector(selectorWork).anketaOpen;
    console.log(openAnketa)

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

    useEffect(() => {
        if (loadClient) {
            setLoadClose(true);
            setTimeout(() => {
                setLoadVisible(true);
            }, 100)

        } else {
            setLoadClose(false);
            setLoadVisible(false);
        }
    }, [loadClient])



    return (
        <div className={`${s.work} ${anim && s.work_anim}`}>
            <div className={`${s.block} ${s.block_left}`}>
                <Client loadClose={loadClose} loadVisible={loadVisible} />
                <Road loadClose={loadClose} loadVisible={loadVisible} />
                <Comments loadClose={loadClose} loadVisible={loadVisible} />
            </div>
            <div className={`${s.block} ${s.block_right}`}>
                <CallPlan loadClose={loadClose} loadVisible={loadVisible} sidebarHiden={sidebarHiden} />
                <Widget loadClose={loadClose} />
            </div>
            <div className={`${s.block} ${s.block_scenario}`}>
                <p>В РАЗРАБОТКЕ...</p>
            </div>
            {openAnketa && <Anketa />}
        </div>
    )
};

export default Work;