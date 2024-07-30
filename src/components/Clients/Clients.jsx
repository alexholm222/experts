import s from './Clients.module.scss';
import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//components
import ClientsList from '../ClientsList/ClientsList';
import Planer from '../Planer/Planer';
import PlanerSceleton from '../PlanerSceleton/PlanerSceleton';
//API
import { getMyClients, getPlaner } from '../../Api/Api';
//selector
import { selectorApp } from '../../store/reducer/App/selector';
import { selectorPlaner } from '../../store/reducer/Planer/selector';
import {
    setClientsToday,
    setClientsNum,
    setClientsNewNum,
    setTodayNextPage,
    setNewNextPage,
    setClientsNew,
    setClientsNoTask,
    setClientsNoTaskNum,
    setNoTaskNextPage,
    setClientsArchive,
    setPlanMeeting,
    setZoom,
    setAnketa,
    setContract,
    setPrepaid,
    setFavorite,
    setLoadToday,
    setLoadNew,
    setLoadNoTask,
    setLoadArchive,
    setLoadPlanMeeting,
    setLoadZoom,
    setLoadAnketa,
    setLoadContract,
    setLoadPrepaid,
    setLoadFavorite,
    setPlanNum,
    setPlanNextPage,
} from '../../store/reducer/MyClients/slice';
//slice

const Clients = () => {
    const [anim, setAnim] = useState(false);
    const [activeTab, setActiveTab] = useState(2);
    const loadPage = useSelector(selectorApp).loadPage;
    const loadClient = useSelector(selectorApp).loadClient;
    /*    const planerLoad = useSelector(selectorPlaner).planerLoad; */
    const dispatch = useDispatch();
    
    //получение списка моих клиентов

    useMemo(() => {
        getMyClients('today', 'default')
            .then(res => {
                console.log(res)
                const clients = res.data.data.data;
                const clientsNum = res.data.data.total;
                dispatch(setClientsToday(clients));
                dispatch(setClientsNum(clientsNum));
                dispatch(setTodayNextPage(res.data.data.next_page_url))

                setTimeout(() => {
                    dispatch(setLoadToday());
                }, 100)
            })
            .catch(err => console.log(err))

        getMyClients('new', 'default')
            .then(res => {
                const clients = res.data.data.data;
                const clientsNum = res.data.data.total;
                 console.log(res)
                dispatch(setClientsNew(clients));
                dispatch(setClientsNewNum(clientsNum));
                dispatch(setNewNextPage(res.data.data.next_page_url))
                setTimeout(() => {
                    dispatch(setLoadNew());
                })
            })
            .catch(err => console.log(err));

    }, []);

    useEffect(() => {
        getMyClients('favorite', 'default')
            .then(res => {
                const clients = res.data.data.data;
                dispatch(setFavorite(clients));
                setTimeout(() => {
                    dispatch(setLoadFavorite());
                })
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        getMyClients('no_tasks', 'default')
            .then(res => {
                const clients = res.data.data.data;
                const clientsNum = res.data.data.total;
                console.log('клиенты', res)
                dispatch(setClientsNoTask(clients));
                dispatch(setClientsNoTaskNum(clientsNum));
                dispatch(setNoTaskNextPage(res.data.data.next_page_url))
                setTimeout(() => {
                    dispatch(setLoadNoTask());
                })
            })
            .catch(err => console.log(err))

        getMyClients('archive', 'default')
            .then(res => {
                const clients = res.data.data.data;
                const clientsNum = res.data.data.total;
                dispatch(setClientsArchive(clients));
                dispatch(setClientsNewNum(clientsNum));
                dispatch(setNewNextPage(res.data.data.next_page_url))
                setTimeout(() => {
                    dispatch(setLoadArchive());
                })
            })
            .catch(err => console.log(err))

        getMyClients('plan_meeting', 'default')
            .then(res => {
                console.log('планирование ')
                const clients = res.data.data.data;
                const clientsNum = res.data.data.total;
                    dispatch(setPlanMeeting(clients));
                    dispatch(setPlanNum(clientsNum));
                    dispatch(setPlanNextPage(res.data.data.next_page_url))
                setTimeout(() => {
                    dispatch(setLoadPlanMeeting());
                })
            })
            .catch(err => console.log(err));

        getMyClients('zoom', 'default')
            .then(res => {
                const clients = res.data.data.data;
                dispatch(setZoom(clients));
                dispatch(setLoadZoom());
                setTimeout(() => {
                    dispatch(setLoadZoom());
                })
            })
            .catch(err => console.log(err))

        getMyClients('anketa', 'default')
            .then(res => {
                const clients = res.data.data.data;
                console.log(clients)
                dispatch(setAnketa(clients));
                setTimeout(() => {
                    dispatch(setLoadAnketa());
                })
            })
            .catch(err => console.log(err))

        getMyClients('contract', 'default')
            .then(res => {
                const clients = res.data.data.data;
                dispatch(setContract(clients));
                setTimeout(() => {
                    dispatch(setLoadContract());
                })
            })
            .catch(err => console.log(err))

        getMyClients('prepaid', 'default')
            .then(res => {
                const clients = res.data.data.data;
                dispatch(setPrepaid(clients));
                setTimeout(() => {
                    dispatch(setLoadPrepaid());
                })
            })
            .catch(err => console.log(err))
    }, []);


    //Лоадер инфо о клиенте
  

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

    const handleActiveTab = (e) => {
        const id = e.currentTarget.id;
        setActiveTab(id)
    }

    return (
        <div className={`${s.clients} ${anim && s.clients_anim}`}>
            <div className={s.header}>
                <h2 className={s.title}>Мои клиенты</h2>
                <div className={s.tabs}>
                    <div onClick={handleActiveTab} id='2' className={`${s.tab} ${activeTab == 2 && s.tab_active}`}>
                        <p>Клиенты</p>
                    </div>

                    <div onClick={handleActiveTab} id='3' className={`${s.tab} ${activeTab == 3 && s.tab_active}`}>
                        <p>Избранное</p>
                    </div>
                </div>
            </div>
            {(activeTab == 2 || activeTab == 3) && <ClientsList activeTab={activeTab} />}
        </div>
    )
};

export default Clients;