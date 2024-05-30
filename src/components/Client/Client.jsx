import s from './Client.module.scss';
import { ReactComponent as IconEdit } from '../../image/work/iconEdit.svg';
import { ReactComponent as IconStar } from '../../image/work/IconStar.svg';
import { ReactComponent as IconStarActive } from '../../image/work/IconStarActive.svg';
import { ReactComponent as IconClose } from '../../image/iconClose.svg';
import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//selector
import { selectorApp } from '../../store/reducer/App/selector';
import { selectorClient } from '../../store/reducer/Client/selector';
//slice
import { setNumbersDefault, setButtonHiden } from '../../store/reducer/Client/slice';
//component
import Loader from '../Loader/Loader';
import LoaderTitle from '../Loader/LoaderTitle';
import LoaderSub from '../Loader/LoaderSub';
import ClientEdit from '../ClientEdit/ClientEdit';

const Client = ({ loadClose, loadVisible }) => {
    const [favorite, setFavorite] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [openList, setOpenList] = useState(false);
    const [hidenList, setHidenList] = useState(false);
    const [heightBlock, setHeightBlock] = useState(322);
    const buttonAddHiden = useSelector(selectorClient).buttonHiden;
    const numbersTel = useSelector(selectorClient).numbers;
    const dispatch = useDispatch();

    useEffect(() => {
        setHeightBlock(322 + (numbersTel.length == 1 ? 46 : (numbersTel.length - 1) * 54 + 46) - (buttonAddHiden ? 20 : 0))
    }, [numbersTel, buttonAddHiden])

    useEffect(() => {
        if (openList && editOpen) {
            setHidenList(true);
            return
        }

        if (!editOpen) {
            setOpenList(false);
            setTimeout(() => {
                setHidenList(false);
                if (numbersTel.includes('')) {
                    const index = numbersTel.indexOf('');
                    const array = [...numbersTel];
                    array.splice(index, 1)
                    dispatch(setNumbersDefault(array));
                    dispatch(setButtonHiden(false))
                }
            }, 200)
            return
        }
    }, [openList, editOpen])

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
            setFavorite(false)
        } else {
            setFavorite(true)
        }
    }

    return (
        <div style={{ height: editOpen ? `${heightBlock}px` : '94px', overflow: hidenList && 'visible' }} className={s.client}>
            <div className={s.block}>
                <div onClick={handleEditOpen} className={s.container}>
                    <div className={s.loader}>
                        <p className={`${s.city} ${loadClose && s.hiden}`}>Новосибирск<sup>16:13</sup></p>
                        {loadClose && <LoaderSub load={loadVisible} />}
                    </div>

                    <div className={s.loader}>
                        <p className={`${s.name} ${loadClose && s.hiden}`}>MR. Pipiskin</p>
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
            <ClientEdit handleOpenList={handleOpenList} openList={openList} setOpenList={setOpenList} />
        </div>
    )
};

export default Client;