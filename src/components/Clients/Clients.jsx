import s from './Clients.module.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
//components
import ClientsList from '../ClientsList/ClientsList';
//selector
import { selectorApp } from '../../store/reducer/App/selector';

const Clients = () => {
    const [anim, setAnim] = useState(false);
    const [loadClose, setLoadClose] = useState(true);
    const [loadVisible, setLoadVisible] = useState(true);
    const [activeTab, setActiveTab] = useState(2);
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

    const handleActiveTab = (e) => {
        const id = e.currentTarget.id;
        setActiveTab(id)
    }

    return (
        <div className={`${s.clients} ${anim && s.clients_anim}`}>
            <div className={s.header}>
                <h2 className={s.title}>Мои клиенты</h2>
                <div className={s.tabs}>
                    <div onClick={handleActiveTab} id='1' className={`${s.tab} ${s.tab_disabled} ${activeTab == 1 && s.tab_active}`}>
                        <p>Планер</p>
                    </div>

                    <div onClick={handleActiveTab} id='2' className={`${s.tab} ${activeTab == 2 && s.tab_active}`}>
                        <p>Клиенты</p>
                    </div>

                    <div onClick={handleActiveTab} id='3' className={`${s.tab} ${activeTab == 3 && s.tab_active}`}>
                        <p>Избранное</p>
                    </div>
                </div>
            </div>
            {(activeTab == 2 || activeTab == 3)  && <ClientsList activeTab={activeTab}/>}
        </div>
    )
};

export default Clients;