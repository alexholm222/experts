import s from './Container.module.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//components
import Work from '../Work/Work';
import Clients from '../Clients/Clients';
import Planer from '../Planer/Planer';

const Container = ({ sidebarHiden, scenario }) => {
    return (
        <div className={`${s.container} ${sidebarHiden && s.container_hidden}`}>
            <Routes>
                <Route path="*" element={<Work sidebarHiden={sidebarHiden} scenario={scenario}/>} />
                <Route path="/experts/clients/" element={<Clients />} />
                <Route path="/experts/planer/" element={<Planer />} />
            </Routes>
        </div>
    )
};

export default Container;