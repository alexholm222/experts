import s from './ClientItem.module.scss';
import { ReactComponent as IconComment } from '../../../image/clients/iconComment.svg';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as IconStar } from '../../../image/work/IconStar.svg';
import { ReactComponent as IconStarActive } from '../../../image/work/IconStarActive.svg';
import { ReactComponent as IconZoomSmall } from '../../../image/clients/iconZoomSmall.svg';
import { ReactComponent as IconMissingCall } from '../../../image/clients/iconMissingCall.svg';
import { useNavigate  } from 'react-router-dom';
//utils
import { handleTaskTime, handleDateDifference } from '../../../utils/dates';
import { addSpaceNumber } from '../../../utils/addSpaceNumber';
//API
import { addFavorite } from '../../../Api/Api';
//slice
import { setAddFavorite, setRemoveFavorite } from '../../../store/reducer/MyClients/slice';
import {
    setUpdateFavorites,
    setDeleteUpdateFavorites,
    setUpdateNoFavorites,
    setDeleteUpdateNoFavorites
} from '../../../store/reducer/Updater/slice';
import { setClientId } from '../../../store/reducer/Client/slice';
//selector
import { selectorUpdater } from '../../../store/reducer/Updater/selector';
import { selectorClient } from '../../../store/reducer/Client/selector';
import { selectorApp } from '../../../store/reducer/App/selector';


const ClientItem = ({ client, id }) => {
    const client_id = useSelector(selectorClient).client_id;
    const disabledMyClients = useSelector(selectorApp).disabledMyClients;
    const [anim, setAnim] = useState(false);
    const [tooltip, setTooltip] = useState(false);
    const [favorite, setFavorite] = useState(false);
    const [viewFavorite, setViewFavorite] = useState(false);
    const [lastRoadDate, setLastRoadDate] = useState('');
    const [lastComment, setLastComment] = useState('');
    const [status, setStatus] = useState(0);
    const [statusText, setStatusText] = useState('');
    const [missedCall, setMissedCall] = useState(false);
    const dispatch = useDispatch();
    const updater = useSelector(selectorUpdater);
    const navigate = useNavigate();
    //Бизнес-план (1): - Сформирован бизнес-план (1) ClientOpenPlan
    //запись на ZOOM (2): - Клиент запросил Zoom(2.1) ReqZoom,  Запись на Zoom-встречу (2.2) ClientZoomSet
    //ZOOM (3): - Проведена встреча Zoom (3.2) ClientZoomFinish,  Zoom не состоялся (3.1) - парсим дату записи на ZOOM и сравниваем с текущей датой если текущая дата больше берем этот статус и последний статус < 3.2
    //ANKETA (4): - Проверь анкету клиента (4.1) SendForm,  Анкета отклонена (4.2) - ,  Анкета кандидата(4.3) ClientAnketaAccept
    //CONTRACT (6): - Договор не подписан (6.1) ContractСancelled,  Договор  (6.2) ClientContractSign
    //PREPAID (7): - Предоплата не внесена (7.1) - , Предоплата 90 000 ₽ (7.2) ClientPrepaid
    //REJECT (-1): - Отправлен в отказ (-1) ClientStatusReject

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    }, []);

    useEffect(() => {
        if (client.events_call == 1) {
            setMissedCall(true)
        } else {
            setMissedCall(false)
        }
    }, [client])

    useEffect(() => {
        const comment = client.partnership_client_logs?.filter(el => el.is_manual == 1 && el.type !== 'newsletter_action').at(-1)?.comment;
        comment && setLastComment(comment)
    }, [client])

    useEffect(() => {
        const cleanRoad = client?.lk_road_logs?.filter(el => el.type == 'ClientOpenPlan' ||
            el.type == 'ReqZoom' || el.type == 'ClientZoomSet' ||
            el.type == 'ClientZoomFinish' || el.type == 'SendForm' ||
            el.type == 'ClientAnketaAccept' || el.type == 'ContractСancelled' ||
            el.type == 'ClientContractSign' || el.type == 'ClientPrepaid');
        const lastRoad = cleanRoad?.at(-1);
        setLastRoadDate(lastRoad?.date);

        if (lastRoad?.type == 'ClientOpenPlan') {
            setStatus(1);
            setStatusText('Бизнес-план');
            return
        }

        if (lastRoad?.type == 'ReqZoom') {
            setStatus(2.1);
            setStatusText('Клиент запросил Zoom');
            return
        }

        if (lastRoad?.type == 'ClientZoomSet') {
            setStatus(2.2);
            setStatusText('Запись на Zoom-встречу');
            return
        }

        if (lastRoad?.type == 'ClientZoomReject') {
            setStatus(3.1);
            setStatusText('Zoom не состоялся');
            return
        }

        if (lastRoad?.type == 'ClientZoomFinish') {
            setStatus(3.2);
            setStatusText('Проведена встреча');
            return
        }

        if (lastRoad?.type == 'SendForm') {
            setStatus(4.1);
            setStatusText('Проверь анкету клиента');
            return
        }

        if (lastRoad?.type == 'FormReject') {
            setStatus(4.2);
            setStatusText('Анкета отклонена');
            return
        }

        if (lastRoad?.type == 'ClientAnketaAccept') {
            setStatus(4.3);
            setStatusText('Анкета кандидата');
            return
        }

        if (lastRoad?.type == 'ContractСancelled') {
            setStatus(6.1);
            setStatusText('Договор не подписан');
            return
        }

        if (lastRoad?.type == 'ClientContractSign') {
            setStatus(6.2);
            setStatusText('Договор подписан');
            return
        }

        if (lastRoad?.type == 'ClientPrepaidReject') {
            setStatus(7.1);
            setStatusText('Предоплата не внесена');
            return
        }

        if (lastRoad?.type == 'ClientPrepaid') {
            setStatus(7.2);
            const comment = lastRoad?.comment;
            const regex = /[0-9]/g;
            const sum = comment?.match(regex)?.join('').slice(0, -2);
            setStatusText(`Предоплата ${addSpaceNumber(sum)} ₽`);
            return
        }

    }, [client]);

    useEffect(() => {

        if (updater.updateFavorites.find(el => el == id)) {
            setFavorite(true)
            return
        }

        if (updater.updateNoFavorites.find(el => el == id)) {
            setFavorite(false)
            return
        }

        if (client.favorite == 1) {
            setFavorite(true)
            return
        }

        if (client.favorite == 0) {
            setFavorite(false)
            return
        }
    }, [client])

    const handleOpenTooltip = () => {
        setTooltip(true)
    }

    const handleCloseTooltip = () => {
        setTooltip(false)
    }

    const handleFavorite = () => {
        if (favorite) {
            addFavorite({ id })
                .then(res => {
                    const client = res.data.client;
                    dispatch(setRemoveFavorite(client));
                    dispatch(setDeleteUpdateFavorites(id));
                    dispatch(setUpdateNoFavorites(id));
                    setFavorite(false);
                })
                .catch(err => {
                    console.log(err);
                })
        } else {

            addFavorite({ id })
                .then(res => {
                    const client = res.data.client;
                    dispatch(setAddFavorite(client));
                    dispatch(setUpdateFavorites(id));
                    dispatch(setDeleteUpdateNoFavorites(id));
                    setFavorite(true);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    const handleViewFavorite = () => {
        setViewFavorite(true)
    }

    const handleHidenFavorite = () => {
        setViewFavorite(false)
    }

    const handleOpenClient = () => {
        dispatch(setClientId(id));
        localStorage.setItem('client_id', JSON.stringify(id));
        navigate(`/experts/work`); 
        if (client_id !== id) {
            localStorage.removeItem('widget');
            localStorage.removeItem('prevWidget');
            localStorage.removeItem('comment');
            localStorage.removeItem('tab');
            localStorage.removeItem('sms');
            localStorage.removeItem('screenShots')
            return
        }
    }

    return (
        <div id={id} onMouseEnter={handleViewFavorite} onMouseLeave={handleHidenFavorite} className={`${s.item} ${disabledMyClients && s.item_disabled} ${anim && s.item_anim} ${missedCall && s.item_attention}`}>
         
                <div onClick={handleOpenClient} className={s.empty}>
                    {missedCall && <IconMissingCall />}
                </div>
           

           
                <div onClick={handleOpenClient} className={s.client}>
                    <p>{client.name}</p> <span>{client.city == '' ? client.city_auto : client.city}</span>
                </div>
        
                <div onClick={handleOpenClient} className={s.task}>
                    <p>{handleTaskTime(client.next_connect)}</p>
                    {client.next_connect == client.zoom_date && <div className={s.zoom}>
                        <IconZoomSmall />
                    </div>}
                </div>
         
                <div onClick={handleOpenClient} className={s.task}>
                    <p>{handleDateDifference(client.last_connect)}</p> <span></span>
                </div>
        
                <div onClick={handleOpenClient} className={s.step}>
                    <div className={s.bars}>
                        <div className={`${s.bar} ${status == 2.1 && s.bar_yellow} ${status >= 2.2 && s.bar_green}`}></div>
                        <div className={`${s.bar}  ${status >= 3.2 && s.bar_green}`}></div>
                        <div className={`${s.bar} ${status == 4.1 && s.bar_yellow} ${status == 4.2 && s.bar_red} ${status >= 4.3 && s.bar_green}`}></div>
                        <div className={`${s.bar}  ${status == 6.1 && s.bar_red} ${status >= 6.2 && s.bar_green}`}></div>
                        <div className={`${s.bar} ${status == 7.1 && s.bar_red} ${status >= 7.2 && s.bar_green}`}></div>
                    </div>

                    <div className={s.step_text}>
                        <p>{statusText}</p>

                        <sup>{handleDateDifference(lastRoadDate)}</sup>
                    </div>

                </div>
           

            <div onClick={handleOpenClient} className={s.comment} onMouseEnter={handleOpenTooltip} onMouseLeave={handleCloseTooltip}>
                {lastComment !== '' && <IconComment />}
                <p className={s.text}>{lastComment}</p>
                {lastComment.length > 55 && <div className={`${s.tooltip} ${tooltip && s.tooltip_open}`}>
                    <p>{lastComment}</p>
                    <div></div>
                </div>
                }
            </div>



            <div className={`${s.favorite} ${!viewFavorite && !favorite && s.favorite_hiden}`}>
                <IconStar onClick={handleFavorite} className={`${s.icon} ${!favorite && s.icon_active}`} />
                <IconStarActive onClick={handleFavorite} className={`${s.icon_2} ${favorite && s.icon_active}`} />
            </div>
        </div >
    )
};

export default ClientItem;