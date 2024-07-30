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
import CityPartners from '../CityPartners/CityPartners';
import Scenario from '../Scenario/Scenario';
import WelcomeScreen from '../WelcomeScreen/WelcomeScreen';
import Messenger from '../Messenger/Messenger';
//selector
import { selectorApp } from '../../store/reducer/App/selector';
import { selectorClient } from '../../store/reducer/Client/selector';
import { selectorWork } from '../../store/reducer/Work/selector';
import { selectorCommand } from '../../store/reducer/Command/selector';

const Work = ({ sidebarHiden, scenario, theme }) => {
    const [anim, setAnim] = useState(false);
    const [loadClose, setLoadClose] = useState(true);
    const [loadVisible, setLoadVisible] = useState(true);
    const [callButtonAdd, setCallButtonAdd] = useState(false);
    const dispatch = useDispatch();
    const loadPage = useSelector(selectorApp).loadPage;
    const loadClient = useSelector(selectorApp).loadClient;
    const client_id = useSelector(selectorClient).client_id;
    const openAnketa = useSelector(selectorWork).anketaOpen;
    const message = useSelector(selectorCommand).message;
    console.log(message)

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0);
        })
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
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
                <div className={s.conteiner}>
                    <Widget loadClose={loadClose} setCallButtonAdd={setCallButtonAdd}/>
                    <Messenger loadClose={loadClose} theme={theme} callButtonAdd={callButtonAdd}/>
                </div>

            </div>
            <div className={`${s.block} ${s.block_city}`}>
                <CityPartners />
            </div>

            <div className={`${s.block} ${s.block_scenario}`}>
                <Scenario scenario={scenario} />
            </div>


            {openAnketa && <Anketa />}
            {(message.action == 'not_work' || message.action == 'end_work') && <WelcomeScreen action={message.action} />}
        </div>
    )
};

export default Work;