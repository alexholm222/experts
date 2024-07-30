import s from './Container.module.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
//components
import Work from '../Work/Work';
import Clients from '../Clients/Clients';
import Planer from '../Planer/Planer';
import Options from '../Options/Options';
import Calendar from '../../block/CalendarEvent/Calendar';
import WelcomeScreen from '../WelcomeScreen/WelcomeScreen';
import Notifications from '../Notifications/Notifications'; 
import { selectorCommand } from '../../store/reducer/Command/selector';

const Container = ({ sidebarHiden, scenario, clientId, theme }) => {
    const message = useSelector(selectorCommand).message;
    return (
        <div className={`${s.container} ${sidebarHiden && s.container_hidden}`}>
            <Routes>
                <Route path="/" element={<Planer />} />
                <Route path="/frmanager/" element={<Planer />} />
                <Route path="/experts/calendar" element={<Calendar />} />
                <Route path="/experts/work/*" element={<Work sidebarHiden={sidebarHiden} scenario={scenario} theme={theme}/>} />
                <Route path="/experts/clients/" element={<Clients />} />
                <Route path="/experts/planer/" element={<Planer />} />
                <Route path="/experts/options/" element={<Options />} />
             {/*    <Route path="/experts/end" element={<WelcomeScreen action={message.action} />} /> */}
            </Routes>
            <Notifications/>
        </div>
    )
};

export default Container;