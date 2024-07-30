import { useEffect, useState } from 'react';
import s from './App.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
//websocet
import useWebSocket, { ReadyState } from 'react-use-websocket';
//API
import { getCities, getClientInformation, getPlaner, getPartners, getScenario, getExpertStatic, getManagerInfo } from '../../Api/Api';
//components
import SideBar from '../SideBar/SideBar';
import Container from '../Container/Container';
import { useDispatch } from 'react-redux';
import { setLoadPage } from '../../store/reducer/App/slice';
//selector
import { selectorCommand } from '../../store/reducer/Command/selector';
import { selectorClient } from '../../store/reducer/Client/selector';
import { selectorWork } from '../../store/reducer/Work/selector';
import { selectorApp } from '../../store/reducer/App/selector';
import { selectorExpert } from '../../store/reducer/Expert/selector';
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
    setTalkTime,
    setMissCall,
    setCallMe,
    setClientStatus,
    setDayWithoutMove
} from '../../store/reducer/Client/slice';
import { setLoadClient, setLoadPartners } from '../../store/reducer/App/slice';
import { setComments, setDialog, setRoad, setNextConnect, setZoomStatus, setZoomConnect, setLastConnect } from '../../store/reducer/Work/slice';
import { setPlaner, setPlanerLoad } from '../../store/reducer/Planer/slice';
import { setOffices, setCompanies, setCompaniesNum } from '../../store/reducer/Partners/slice';
import { setMessageMessanger, setMessageStatus, setNotification, setNotifications } from '../../store/reducer/Messenger/slice';
import { setExpert } from '../../store/reducer/Expert/slice';
import { setLoadManager } from '../../store/reducer/App/slice';
import { setStatisticToday } from '../../store/reducer/Statistic/slice';
//utils
import { handleDifDate, handleDateToday2 } from '../../utils/dates';


//сокеты whats app
const userToken = document.getElementById('root_expert').getAttribute('token');
window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.REACT_APP_PUSHER_APP_KEY,
    wsHost: process.env.REACT_APP_PUSHER_APP_HOST,
    wssPort: 6001,
    forceTLS: true,
    disableStats: true,
    cluster: "mt1",
    encrypted: true,
    enabledTransports: ['ws', 'wss'],
    authEndpoint: `${process.env.REACT_APP_API_URL}api/broadcasting/auth`,
    auth: {
        headers: {
            Authorization: `Bearer ${userToken}`,
            Accept: "application/json"
        }
    }
});

const App = () => {
    const mangoToken = document.getElementById('root_expert').getAttribute('mango-token');
    const command = useSelector(selectorCommand).command;
    const callStatus = useSelector(selectorCommand).callStatus;
    const workInfoUpdate = useSelector(selectorWork).workInfoUpdate;
    const message = useSelector(selectorCommand).message;
    const themeApp = useSelector(selectorApp).theme;
    const loadClient = useSelector(selectorApp).loadClient;
    const expertInfo = useSelector(selectorExpert).expert;
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
    const [messageSocket, setMessageSocket] = useState({});
    const [sidebarHiden, setSideBarHiden] = useState(false);
    const [theme, setTheme] = useState(JSON.parse(localStorage.getItem('theme')) || 'dark');
    const [activePoint, setActivePoint] = useState(JSON.parse(localStorage.getItem('point')) || 1);
    const client_id = useSelector(selectorClient).client_id;
    const clientUpdate = useSelector(selectorClient).clientUpdate;
    const clientName = useSelector(selectorClient).client_name;
    const clientCity = useSelector(selectorClient).client_city;
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname;
    const dateToday = handleDateToday2();
    const monthToday = handleDateToday2().slice(0, 7);


    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];


    useEffect(() => {
        sendMessage(JSON.stringify({
            action: command,
            user: mangoToken,
        }))
    }, [command]);


    useEffect(() => {
        if (lastMessage !== null) {
            const message = JSON.parse(lastMessage.data);
            console.log(message)
            dispatch(setMessage(message));
            dispatch(setCommand('get_work_status'));
            (message.action == 'wait_client' || message.action == 'open_client') && navigate(`/experts/work/client=${message.client_id}`);
            message.action == 'client_update' && dispatch(setClientUpdate(message.client_id));
            message.action == 'client_update' && dispatch(setMenuIdUpdate());
            message.action == 'next_client' && dispatch(setCommand('pause'));


        }
    }, [lastMessage]);


    //сообщения whats up
    useEffect(() => {
        const channel = window.Echo.private(`clients.${mangoToken}`)
            .listen('.whatsapp', (e) => {
                console.log('Event received:', e.whatsapp);
                setMessageSocket(e.whatsapp)
            });

        return () => {
            channel.stopListening('.whatsapp');
            window.Echo.leave('clients');
        };
    }, []);

    useEffect(() => {
        const data = messageSocket?.data;
        const client = messageSocket?.client;

        data?.typeWebhook == 'incomingMessageReceived' && client.id == client_id && dispatch(setMessageMessanger({
            clientId: client.id, data: {
                idMessage: data.idMessage,
                messageData: data.messageData,
            }
        }));

        data?.typeWebhook == 'incomingMessageReceived' && dispatch(setNotification({
            client: client, data: {
                idMessage: data.idMessage,
                messageData: data.messageData,
            }
        }));

        data?.typeWebhook == 'incomingMessageReceived' && dispatch(setNotifications({
            client: client, data: {
                idMessage: data.idMessage,
                messageData: data.messageData,
            }
        }));

        data?.typeWebhook == 'outgoingMessageStatus' && client.id == client_id && dispatch(setMessageStatus({
            clientId: client.id,
            idMessage: data.idMessage,
            status: data.status,
        }))

    }, [messageSocket])

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
                navigate(`/experts/work/client=${id}`)
                return
            }

            if (data.action == 'end_call_out') {
                dispatch(setCommand('pause'))
                return
            }
        });
    }, []);


    useEffect(() => {
        setTimeout(() => {
            dispatch(setLoadPage(false))
        }, 700)
    }, [])

    useEffect(() => {
        setTheme(themeApp);
        localStorage.setItem('theme', JSON.stringify(themeApp));
    }, [themeApp])

    //установка системной темы
    useEffect(() => {
        if (theme == '') {
            const userMedia = window.matchMedia('(prefers-color-scheme: light)')
            if (userMedia.matches) return setTheme('light')
            return setTheme('dark')
        }
    }, [theme])
    document.documentElement.dataset.theme = theme;

    //загрузка клиента
    useEffect(() => {
        const currentUrl = window.location.href;

        if (path.includes('/work/client=')) {
            const idClientUrl = Number(path.split('/work/client=').pop());
            dispatch(setClientId(idClientUrl));
            navigate(`/experts/work/client=${idClientUrl}`);
            return
        }

        if (currentUrl.includes('/?id=')) {
            const idClientUrl = Number(currentUrl.split('/?id=').pop());
            dispatch(setClientId(idClientUrl));
            navigate(`/experts/work/client=${idClientUrl}`);
            return
        }
    }, [path])

    //Тайтл вкладки
    useEffect(() => {
        const currentUrl = window.location.href;

        if (path == '/') {
            document.title = 'Планер';
            setActivePoint(3);
            return
        }

        if (path == '') {
            document.title = '...';
            return
        }

        if (path.includes('/work/client=')) {
            setActivePoint(1);
            loadClient ? document.title = `...` : document.title = `${clientName} ${clientCity}`
            return
        }

        if (currentUrl.includes('/?id=')) {
            setActivePoint(1);
            document.title = `...`;
            loadClient ? document.title = `...` : document.title = `${clientName} ${clientCity}`
            return
        }


        if (path == '/experts/clients' || path == '/experts/clients/') {
            document.title = 'Мои клиенты';
            setActivePoint(2);
            return
        }

        if (path == '/experts/planer' || path == '/experts/planer/' /* || '/' */) {
            document.title = 'Планер';
            setActivePoint(3);
            return
        }

        if (path == '/experts/calendar' || path == '/experts/calendar/') {
            document.title = 'Календарь событий';
            setActivePoint(4);
            return
        }

        if (path == '/experts/options' || path == '/experts/options/') {
            document.title = 'Настройки';
            setActivePoint(5);
            return
        }

    }, [path, clientName, loadClient]);



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
        dispatch(setClientName(''));
        dispatch(setClientSurname(''));
        /*  dispatch(setClientName(''));
         dispatch(setClientCity('')); */

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
                client.events_call !== 0 ? dispatch(setMissCall(true)) : dispatch(setMissCall(false));
                client.is_call_me !== 0 ? dispatch(setCallMe(true)) : dispatch(setCallMe(false));

                dispatch(setClientStatus(client.status))
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
                const lastMoves = Object.values(road).findLast((el, i) => el.status == 'finished' && i < 10);
                dispatch(setDayWithoutMove(handleDifDate(lastMoves.date)))

                setTimeout(() => {
                    dispatch(setLoadClient(false));
                });
            })
            .catch(err => console.log(err));
    }, [client_id]);

    console.log(client_id, clientUpdate)

    //обновляем Road
    useEffect(() => {
        dispatch(setNumbersDefault([]));
        client_id == clientUpdate && client_id !== '' && getClientInformation(client_id)
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
                client.events_call !== 0 ? dispatch(setMissCall(true)) : dispatch(setMissCall(false));
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
                dispatch(setClientUpdate(0));

                setTimeout(() => {

                    dispatch(setLoadClient(false));
                });
            })
            .catch(err => console.log(err))
    }, [clientUpdate]);

    //Получение данных планера
    useEffect(() => {
        getPlaner()
            .then(res => {
                const data = res.data;
                console.log('Планер', res)
                dispatch(setPlaner(data));
                setTimeout(() => {
                    dispatch(setPlanerLoad(false))
                }, 100)
            })
            .catch(err => console.log(err))
    }, [clientUpdate]);

    //Получаем данные партнерских офисов
    useEffect(() => {
        dispatch(setLoadPartners(true))
        client_id !== '' && getPartners(client_id, '')
            .then(res => {
                console.log(res)
                const data = res.data;
                const offices = data.partner_offices;
                const companies = data.companies_info.companies;
                const companiesNum = data.companies_info.total;
                //записываем информацию о партнерских оффисах и заказчиках
                dispatch(setOffices(offices));
                dispatch(setCompanies(companies));
                dispatch(setCompaniesNum(companiesNum));
                setTimeout(() => {
                    dispatch(setLoadPartners(false));
                }, 50);
            })
            .catch(err => console.log(err))
    }, [client_id, workInfoUpdate]);

    //Получаем скрипт
    useEffect(() => {
        getScenario()
            .then(res => {
                console.log(res);
                const data = res.data.data;
                setScenario(data);
            })

            .catch(err => console.log(err))
    }, [])

    //Получаем данные эксперта
    useEffect(() => {
        getManagerInfo()
            .then(res => {
                const data = res.data.data;
                const expert = { name: data.name, surname: data.surname, avatar: data.avatar, id: data.id }
                localStorage.setItem('expert', JSON.stringify(expert))
                console.log(res)
                dispatch(setExpert(expert));
                dispatch(setLoadManager(false));
            })
            .catch(err => console.log(err))
    }, []);

    //Получаем статистику эксперта
    useEffect(() => {
        expertInfo.id && getExpertStatic(expertInfo.id, monthToday)
            .then(res => {
                console.log(res);
                const data = res.data.data;
                const zoomArr = data.zoom;
                const anketaArr = data.anketa_send;
                const prepayArr = data.prepay;
                const zoomToday = zoomArr.find(el => el.date == dateToday);
                const anketaToday = anketaArr.find(el => el.date == dateToday);
                const prepayToday = prepayArr.find(el => el.date == dateToday);
                dispatch(setStatisticToday({
                    zoom: zoomToday,
                    anketa: anketaToday,
                    prepay: prepayToday
                }))
            })
            .catch(err => console.log(err))
    }, [expertInfo])

    console.log(dateToday)

    return (
        <div className={s.app}>
            <SideBar sidebarHiden={sidebarHiden} setSideBarHiden={setSideBarHiden} path={path} activePoint={activePoint} />
            <Container sidebarHiden={sidebarHiden} scenario={scenario} theme={theme} />
        </div>
    )
};

export default App;