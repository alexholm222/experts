import { useEffect, useState } from 'react';
import s from './App.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
//websocet
import useWebSocket, { ReadyState } from 'react-use-websocket';
//API
import { getCities, getClientInformation, getPlaner, getPartners, getScenario } from '../../Api/Api';
//components
import SideBar from '../SideBar/SideBar';
import Container from '../Container/Container';
import { useDispatch } from 'react-redux';
import { setLoadPage } from '../../store/reducer/App/slice';
//selector
import { selectorCommand } from '../../store/reducer/Command/selector';
import { selectorClient } from '../../store/reducer/Client/selector';
//slice
import { setCities } from '../../store/reducer/Work/slice';
import { setMessage, setCallStatus, setCommand } from '../../store/reducer/Command/slice';
import { setClientId } from '../../store/reducer/Client/slice';
import {
    setClientName,
    setClientSurname,
    setClientCity,
    setNumbersDefault,
    setClientMain,
    setButtonHiden,
    setFavorite,
    setClientUpdate,
    setMenuIdUpdate,
    setTalkTime
} from '../../store/reducer/Client/slice';
import { setLoadClient } from '../../store/reducer/App/slice';
import { setComments, setDialog, setRoad, setNextConnect, setZoomStatus, setZoomConnect, setLastConnect } from '../../store/reducer/Work/slice';
import { setPlaner, setPlanerLoad } from '../../store/reducer/Planer/slice';
import { setOffices, setCompanies } from '../../store/reducer/Partners/slice';

const App = () => {
    const mangoToken = document.getElementById('root_expert').getAttribute('mango-token');
    const command = useSelector(selectorCommand).command;
    const callStatus = useSelector(selectorCommand).callStatus;
    const [scenario, setScenario] = useState([]);
    const [socketUrl, setSocketUrl] = useState(`wss://lk.skilla.ru:8007/?user=${mangoToken}`);
    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl,
        {
            shouldReconnect: (closeEvent) => true,
            filter: (massage) => {
                if (JSON.parse(massage.data).action == 'manager_status' || JSON.parse(massage.data).action == 'open_bp' || JSON.parse(massage.data).action == 'reaction') {
                    return false
                } else {
                    return true
                }
            },
        });
    const [messageHistory, setMessageHistory] = useState([]);
    const [sidebarHiden, setSideBarHiden] = useState(false);
    const [theme, setTheme] = useState('light');
    const [activePoint, setActivePoint] = useState(JSON.parse(localStorage.getItem('point')) || 1);
    const client_id = useSelector(selectorClient).client_id;
    const clientUpdate = useSelector(selectorClient).clientUpdate;
    const clientName = useSelector(selectorClient).client_name;
    const clientCity = useSelector(selectorClient).client_city;
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname;


    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    console.log(callStatus)

    useEffect(() => {
        sendMessage(JSON.stringify({
            action: command,
            user: mangoToken,
        }))
    }, [command]);



    useEffect(() => {
        if (lastMessage !== null) {
            /* setMessageHistory((prev) => prev.concat(lastMessage.data)); */
            const message = JSON.parse(lastMessage.data);
            console.log(message)
            dispatch(setMessage(message));
            dispatch(setCommand('get_work_status'));
            (message.action == 'wait_client' || message.action == 'open_client') && dispatch(setClientId(message.client_id));
            (message.action == 'wait_client' || message.action == 'open_client') && localStorage.setItem('client_id', JSON.stringify(message.client_id));
            message.action == 'client_update' && dispatch(setClientUpdate(message.client_id));
            message.action == 'client_update' && dispatch(setMenuIdUpdate());

        }
    }, [lastMessage]);

    //Слушатель сокета статуса звонка
    useEffect(() => {
        const wsCall = new WebSocket(`wss://lk.skilla.ru:8001/?user=${mangoToken}`);
        wsCall.onopen = function (e) {
        };

        wsCall.addEventListener('message', (e) => {
            console.log(e.data)
            const data = JSON.parse(e.data);
            dispatch(setCallStatus(data));
            if (data.action == 'new_call_out') {
                const id = Number(data.client_id)
                dispatch(setClientId(id));
                localStorage.setItem('client_id', JSON.stringify(id))
            }
        });
    }, []);

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
        if (path == '/experts/work' || path == '/') {
            setActivePoint(1);
            document.title = `...`;

            setTimeout(() => {
                document.title = `${clientName} ${clientCity}`;
            }, 200)

            return
        }

        if (path == '/experts/clients' || path == '/experts/clients/') {
            document.title = 'Мои клиенты';
            setActivePoint(2);
            return
        }

        if (path == '/experts/planer' || path == '/experts/planer/') {
            document.title = 'Планер';
            setActivePoint(3);
            return
        }

        if (path == '/frmanager/partners' || path == '/frmanager/partners/') {
            document.title = 'Партнеры';
            setActivePoint(4);
            return
        }

        if (path == '/frmanager/analytics' || path == '/frmanager/analytics/') {
            document.title = 'Аналитика';
            setActivePoint(5);
            return
        }

    }, [path, clientName]);



    //Получаем список подходящих городов
    useEffect(() => {
        getCities()
            .then(res => {
                console.log(res);
                dispatch(setCities(res.data.data));
            })
            .catch(err => console.log(err))
    }, []);


    //загружаем данные клиента
    useEffect(() => {
        dispatch(setLoadClient(true));
        dispatch(setButtonHiden(false));
        dispatch(setClientMain(''));
        dispatch(setNumbersDefault([]));
        dispatch(setComments([]));
        dispatch(setDialog([]));
        dispatch(setNextConnect('0000-00-00'));
        dispatch(setZoomStatus(-1));
        dispatch(setZoomConnect('0000-00-00'));

        client_id !== '' && getClientInformation(client_id)
            .then(res => {
                console.log(res)
                const client = res.data.client;
                const dialog = res.data.dialog;
                const road = res.data.road;
                const phone = [client.phone, client.phone2, client.phone3].filter(el => el !== '');
                //записыываем данные клиента
                dispatch(setClientName(client.name));
                dispatch(setClientSurname(client.surname));
                dispatch(setClientCity(client.city !== '' ? client.city : client.city_auto));
                dispatch(setNumbersDefault(phone));
                dispatch(setClientMain(phone[0]));
                dispatch(setFavorite(client.favorite));
                dispatch(setTalkTime(client.talk_time));
                //записываем комментарии клиента
                const comments = client?.partnership_client_logs?.filter(el => el.is_manual == 1 && el.person_id !== 0 && el.comment !== '' && el.newsletter_id == 0 && el.is_sms == 0).reverse();
                dispatch(setComments(comments));
                //Записываем скрипт
                dispatch(setDialog(dialog));
                //Записываем Road
                dispatch(setRoad(road));
                dispatch(setNextConnect(client.next_connect));
                dispatch(setLastConnect(client.last_connect));
                dispatch(setZoomStatus(client.zoom_status));
                dispatch(setZoomConnect(client.zoom_date));

                setTimeout(() => {
                    dispatch(setLoadClient(false));
                }, 150);
            })
            .catch(err => console.log(err));
    }, [client_id]);


    //обновляем Road
    useEffect(() => {
        client_id == clientUpdate && getClientInformation(client_id)
            .then(res => {
                console.log(res)
                const client = res.data.client;
                const dialog = res.data.dialog;
                const road = res.data.road;
                const phone = [client.phone, client.phone2, client.phone3].filter(el => el !== '');
                //записыываем данные клиента
                dispatch(setClientName(client.name));
                dispatch(setClientSurname(client.surname));
                dispatch(setClientCity(client.city !== '' ? client.city : client.city_auto));
                dispatch(setNumbersDefault(phone));
                dispatch(setClientMain(phone[0]));
                dispatch(setFavorite(client.favorite));
                //Записываем скрипт
                dispatch(setDialog(dialog));
                //Записываем Road
                dispatch(setRoad(road));
                dispatch(setNextConnect(client.next_connect));
                dispatch(setLastConnect(client.last_connect));
                dispatch(setZoomStatus(client.zoom_status));
                dispatch(setZoomConnect(client.zoom_date));

                dispatch(setClientUpdate(0));
                setTimeout(() => {

                    dispatch(setLoadClient(false));
                }, 150);
            })
            .catch(err => console.log(err))
    }, [clientUpdate]);

    //Получение данных планера
    useEffect(() => {
        getPlaner()
            .then(res => {
                const data = res.data;
                dispatch(setPlaner(data));
                setTimeout(() => {
                    dispatch(setPlanerLoad(false))
                }, 100)
            })
            .catch(err => console.log(err))
    }, [clientUpdate]);

    //Получаем данные партнерских офисов
    useEffect(() => {
        getPartners(client_id)
            .then(res => {
                const offices = res.data.partner_offices;
                const companies = res.data.companies;
                //записываем информацию о партнерских оффисах и заказчиках
                dispatch(setOffices(offices));
                dispatch(setCompanies(companies));
                console.log(res)
            })
            .catch(err => console.log(err))
    }, [client_id]);

    useEffect(() => {
        getScenario()
            .then(res => {
                console.log(res);
                const data = res.data.data;
                setScenario(data);
            })

            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        client_id == '' && navigate(`/experts/planer`);
    }, [client_id])

    return (
        <div className={s.app}>
            <SideBar sidebarHiden={sidebarHiden} setSideBarHiden={setSideBarHiden} path={path} activePoint={activePoint} />
            <Container sidebarHiden={sidebarHiden} scenario={scenario}/>
        </div>
    )
};

export default App;