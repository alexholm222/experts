import s from './Container.module.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//components
import Work from '../Work/Work';
import Clients from '../Clients/Clients';

const Container = ({ sidebarHiden }) => {
    return (
        <div className={`${s.container} ${sidebarHiden && s.container_hidden}`}>
            <Routes>
                <Route path="*" element={<Work sidebarHiden={sidebarHiden} />} />
                  <Route path="/expert/clients/" element={<Clients />} />
            </Routes>
        </div>
    )
};

export default Container;