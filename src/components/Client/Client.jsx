import s from './Client.module.scss';
import { ReactComponent as IconEdit } from '../../image/work/iconEdit.svg';
import { ReactComponent as IconStar } from '../../image/work/IconStar.svg';
import { ReactComponent as IconStarActive } from '../../image/work/IconStarActive.svg';
import { ReactComponent as IconClose } from '../../image/iconClose.svg';
import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//API 
import { addFavorite } from '../../Api/Api';
//selector
import { selectorApp } from '../../store/reducer/App/selector';
import { selectorClient } from '../../store/reducer/Client/selector';
import { selectorWork } from '../../store/reducer/Work/selector';
//slice
import { setNumbersDefault, setButtonHiden } from '../../store/reducer/Client/slice';
//component
import Loader from '../Loader/Loader';
import LoaderTitle from '../Loader/LoaderTitle';
import LoaderSub from '../Loader/LoaderSub';
import ClientEdit from '../ClientEdit/ClientEdit';
//utils
import { handleTimeForCity, handleTotalCallTime } from '../../utils/dates';

const Client = ({ loadClose, loadVisible }) => {
    const [favorite, setFavorite] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [openList, setOpenList] = useState(false);
    const [hidenList, setHidenList] = useState(false);
    const [heightBlock, setHeightBlock] = useState(322);
    const [time, setTime] = useState('');
    const buttonAddHiden = useSelector(selectorClient).buttonHiden;
    const client_numbers = useSelector(selectorClient).client_numbers;
    const client_id = useSelector(selectorClient).client_id;
    const stage = useSelector(selectorClient).stage;
    const cities = useSelector(selectorWork).cities;
    const clientInfo = useSelector(selectorClient);
    console.log(loadClose)
    const dispatch = useDispatch();

  //убрать - 36 когда вернешь добовление номера
    useEffect(() => {
        setHeightBlock(322 - 36 + (client_numbers.length == 1 ? 46 : (client_numbers.length - 1) * 54 + 46) - (buttonAddHiden ? 20 - 36 : 0))
    }, [client_numbers, buttonAddHiden])

    useEffect(() => {
        if (openList && editOpen) {
            setHidenList(true);
            return
        }

        if (!editOpen) {
            setOpenList(false);
            setTimeout(() => {
                setHidenList(false);
                if (client_numbers.includes('')) {
                    const index = client_numbers.indexOf('');
                    const array = [...client_numbers];
                    array.splice(index, 1)
                    dispatch(setNumbersDefault(array));
                    dispatch(setButtonHiden(false))
                }
            }, 200)
            return
        }
    }, [openList, editOpen]);

    useEffect(() => {
        const timeZone = cities?.find(el => el.name == clientInfo.client_city)?.time_zone;
        setTime(handleTimeForCity(clientInfo.client_city == 'Орел' ? 3 : timeZone));
        clientInfo?.favorite == 0 ? setFavorite(0) : setFavorite(1)
    }, [cities, clientInfo]);

    useEffect(() => {
        setOpenList(false);
    }, [client_id]);

    useEffect(() => {
        loadClose && setEditOpen(false)
    }, [loadClose]);

    const handleOpenList = () => {
        if (openList) {
            setOpenList(false);
        } else {
            setOpenList(true)
        }
    }

    const handleEditOpen = () => {
        if (editOpen && !openList) {
            setEditOpen(false);
            return
        }

        if (editOpen && openList) {
            setTimeout(() => {
                setEditOpen(false);
            }, 200)

            return
        }

        if (!editOpen) {
            setEditOpen(true);
        }
    }



    const handleFavorite = () => {
        if (favorite) {
            addFavorite({ id: clientInfo?.client_id })
                .then(res => {
                    setFavorite(false);
                })
                .catch(err => {
                    console.log(err);
                })
        } else {

            addFavorite({ id: clientInfo?.client_id })
                .then(res => {
                    setFavorite(true);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    return (
        <div style={{ height: editOpen ? `${heightBlock}px` : '94px', overflow: hidenList && 'visible' }} className={`${s.client}  ${loadClose && s.client_dis}`}>
            <div className={s.block}>
                <div onClick={handleEditOpen} className={`${s.container}`}>
                    <div className={s.loader}>
                        <p className={`${s.city} ${loadClose && s.hiden}`}>{clientInfo?.client_city}<sup>{time}</sup></p>
                        {loadClose && <LoaderSub load={loadVisible} />}
                    </div>

                    <div className={s.loader}>
                        <p className={`${s.name} ${loadClose && s.hiden}`}>{clientInfo?.client_name} {clientInfo?.client_surname}</p>
                        {/* <p className={s.time}>{handleTotalCallTime(clientInfo?.talkTime)}</p> */}
                        {loadClose && <LoaderTitle load={loadVisible} />}
                    </div>
                    <div className={`${s.icon_edit} ${editOpen && s.hidden}`}>
                        <IconEdit />
                    </div>
                    <div className={`${s.icon_close} ${!editOpen && s.hidden}`}>
                        <IconClose />
                    </div>
                </div>

                <div className={s.favorite}>
                    <IconStar onClick={handleFavorite} className={`${s.icon} ${!favorite && s.icon_active}`} />
                    <IconStarActive onClick={handleFavorite} className={`${s.icon_2} ${favorite && s.icon_active}`} />
                </div>
            </div>
            <ClientEdit handleOpenList={handleOpenList} openList={openList} setOpenList={setOpenList} city={clientInfo?.client_city} setEditOpen={setEditOpen} stage={stage}/>
        </div>
    )
};

export default Client;