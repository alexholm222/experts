import { useEffect, useState } from 'react';
import s from './App.module.scss';
import { useLocation } from 'react-router-dom';
//components
import SideBar from '../SideBar/SideBar';
import Container from '../Container/Container';
import { useDispatch } from 'react-redux';
import { setLoadPage } from '../../store/reducer/App/slice';
//API
import { getMyClients } from '../../Api/Api';
//slice
import {
    setClientsToday, setClientsNew, setClientsNoTask,
    setClientsArchive, setPlanMeeting, setZoom, setAnketa,
    setContract, setPrepaid, setFavorite,
    setLoadToday,
    setLoadNew,
    setLoadNoTask,
    setLoadArchive,
    setLoadPlanMeeting,
    setLoadZoom,
    setLoadAnketa,
    setLoadContract,
    setLoadPrepaid,
    setLoadFavorite
} from '../../store/reducer/MyClients/slice';

const App = () => {
    const [sidebarHiden, setSideBarHiden] = useState(false);
    const [theme, setTheme] = useState('light');
    const [activePoint, setActivePoint] = useState(JSON.parse(localStorage.getItem('point')) || 1);
    const dispatch = useDispatch();
    const location = useLocation();
    const path = location.pathname;

    useEffect(() => {
        setTimeout(() => {
            dispatch(setLoadPage(false))
        }, 700)
    }, [])

    //установка системной темы
    useEffect(() => {
        if (theme == '') {
            const userMedia = window.matchMedia('(prefers-color-scheme: light)')
            if (userMedia.matches) return setTheme('light')
            return setTheme('dark')
        }
    }, [theme])
    document.documentElement.dataset.theme = theme;

    //Тайтл вкладки
    useEffect(() => {
        if (path == '/expert/work' || path == '/') {
            setActivePoint(1)
            document.title = 'Работа с клиентами';
            return
        }

        if (path == '/expert/clients' || path == '/expert/clients/') {
            document.title = 'Мои клиенты';
            setActivePoint(2);
            return
        }

    }, [path]);

    //получение списка моих клиентов

    useEffect(() => {
        getMyClients('today')
            .then(res => {
                const clients = res.data.data;
                const newClients = [...clients];
                newClients.sort(function (a, b) {
                    const dateA = new Date(a?.next_connect);
                    const dateB = new Date(b?.next_connect);
                    if (dateA > dateB) {
                        return 1
                    }

                    if (dateA < dateB) {
                        return -1
                    }
                })

                console.log(clients)
                dispatch(setClientsToday(newClients));
                setTimeout(() => {
                    dispatch(setLoadToday());
                }, 100)
            })
            .catch(err => console.log(err))

        getMyClients('new')
            .then(res => {
                const clients = res.data.data;
                console.log(clients)
                dispatch(setClientsNew(clients));
                setTimeout(() => {
                    dispatch(setLoadNew());
                }, 100)
                console.log(res);
            })
            .catch(err => console.log(err));

    }, []);

    useEffect(() => {
        getMyClients('favorite')
            .then(res => {
                const clients = res.data.data;
                console.log(clients)
                dispatch(setFavorite(clients));
                setTimeout(() => {
                    dispatch(setLoadFavorite());
                }, 100)
                console.log(res);
            })
            .catch(err => console.log(err))
    }, [])



    useEffect(() => {
        getMyClients('no_tasks')
            .then(res => {
                const clients = res.data.data;
                console.log(clients)
                dispatch(setClientsNoTask(clients));
                setTimeout(() => {
                    dispatch(setLoadNoTask());
                }, 100)
                console.log(res);
            })
            .catch(err => console.log(err))

        getMyClients('archive')
            .then(res => {
                const clients = res.data.data;
                console.log(clients)
                dispatch(setClientsArchive(clients));
                setTimeout(() => {
                    dispatch(setLoadArchive());
                }, 100)
                console.log(res);
            })
            .catch(err => console.log(err))

        getMyClients('plan_meeting')
            .then(res => {
                const clients = res.data.data;
                console.log(clients)
                dispatch(setPlanMeeting(clients));
                setTimeout(() => {
                    dispatch(setLoadPlanMeeting());
                }, 100)
                console.log(res);
            })
            .catch(err => console.log(err));

        getMyClients('zoom')
            .then(res => {
                const clients = res.data.data;
                console.log(clients)
                dispatch(setZoom(clients));
                dispatch(setLoadZoom());
                setTimeout(() => {
                    dispatch(setLoadZoom());
                }, 100)
                console.log(res);
            })
            .catch(err => console.log(err))

        getMyClients('anketa')
            .then(res => {
                const clients = res.data.data;
                console.log(clients)
                dispatch(setAnketa(clients));
                setTimeout(() => {
                    dispatch(setLoadAnketa());
                }, 100)
                console.log(res);
            })
            .catch(err => console.log(err))

        getMyClients('contract')
            .then(res => {
                const clients = res.data.data;
                console.log(clients)
                dispatch(setContract(clients));
                setTimeout(() => {
                    dispatch(setLoadContract());
                }, 100)
                console.log(res);
            })
            .catch(err => console.log(err))

        getMyClients('prepaid')
            .then(res => {
                const clients = res.data.data;
                console.log(clients)
                dispatch(setPrepaid(clients));
                setTimeout(() => {
                    dispatch(setLoadPrepaid());
                }, 100)
                console.log(res);
            })
            .catch(err => console.log(err))
    }, [])



    return (
        <div className={s.app}>
            <SideBar sidebarHiden={sidebarHiden} setSideBarHiden={setSideBarHiden} path={path} activePoint={activePoint} />
            <Container sidebarHiden={sidebarHiden} />
        </div>
    )
};

export default App;