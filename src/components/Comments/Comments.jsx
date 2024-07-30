import s from './Comments.module.scss';
import { ReactComponent as IconMissingCall } from '../../image/clients/iconMissingCall.svg';
import { ReactComponent as Attention } from '../../image/clients/attention.svg';
import { ReactComponent as IconReject } from '../../image/clients/iconReject.svg';
import { ReactComponent as Icon7Days } from '../../image/clients/icon7Days.svg';
import { ReactComponent as Icon14Days } from '../../image/clients/icon14Days.svg';
import Comment from './Comment';
import CommentNew from './CommentNew';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
//selector
import { selectorWork } from '../../store/reducer/Work/selector';
import { selectorClient } from '../../store/reducer/Client/selector';
//component
import CommentsSceleton from './CommentsSceleton/CommentsSceleton';

const Comments = ({ loadClose, loadVisible }) => {
    const comments = useSelector(selectorWork).comments;
    const missCall = useSelector(selectorClient).missCall;
    const dayWithoutMove = useSelector(selectorClient).dayWithoutMove;
    const callMe = useSelector(selectorClient).callMe;
    const clientStatus = useSelector(selectorClient).clientStatus;
    const [anim, setAnim] = useState(false)
    const [openList, setOpenList] = useState(false);
    const [firstListLength, setFirstListLength] = useState(JSON.parse(localStorage.getItem('length')) || 3);
    const [height, setHeight] = useState(560);
    const [heightHiden, setHeightHiden] = useState(177);
    const heightRef = useRef();
    const heightHiddenRef = useRef();

    useEffect(() => {
        setHeight(heightRef?.current?.offsetHeight);
        setHeightHiden(heightHiddenRef?.current?.offsetHeight)
    }, [comments]);

    useEffect(() => {
        setTimeout(() => {
            setAnim(true);
        })
    }, []);

    useEffect(() => {

        !loadClose && setFirstListLength(comments.length);
        !loadClose && localStorage.setItem('length', comments.length);



    }, [comments.length, loadClose])

    /* useEffect(() => {
        setTimeout(() => {
            setComments(prevState => [{ text: 'комментарий новый', time: '11 марта' }, ...prevState])
        }, 5500)
    }, []) */
    const handleOpenList = () => {
        if (openList) {
            setOpenList(false);
        } else {
            setOpenList(true);
        }
    }
    return (
        <>
            <div className={`${s.bage} ${s.bage_green} ${clientStatus == 10 && !loadClose && s.bage_vis}`}><p>Клиент стал партнером</p></div>
            <div className={`${s.bage} ${clientStatus == 3 && !loadClose && s.bage_vis}`}><IconReject /> <p>Клиент отказался от сотрудничества</p></div>
            <div className={`${s.bage} ${dayWithoutMove > 14 && !loadClose && s.bage_vis}`}><Icon14Days /> <p>По клиенту не было движения больше 14 дней</p></div>
            <div className={`${s.bage} ${s.bage_request} ${dayWithoutMove > 7 && dayWithoutMove <= 14 && !loadClose && s.bage_vis}`}><Icon7Days /> <p>По клиенту не было движения больше 7 дней</p></div>
            <div className={`${s.bage} ${missCall && !loadClose && s.bage_vis}`}><IconMissingCall /> <p>Пропущенный звонок</p></div>

            <div className={`${s.bage} ${s.bage_request} ${callMe && !loadClose && s.bage_vis}`}><Attention /> <p>Запрошен звонок</p></div>

            <div className={`${s.comments} ${anim && s.comments_anim} ${firstListLength == 0 && s.comments_hiden}`}>
                <div className={s.header}>
                    <p>Комментарий</p>
                    {firstListLength > 3 && <button onClick={handleOpenList}>{openList ? 'скрыть' : 'Показать все'}</button>}
                </div>
                <ul ref={heightRef} className={`${s.list_hiden}`}>
                    {comments.map((el) => {
                        return <Comment el={el} key={el.id} />
                    })}
                </ul>

                <ul ref={heightHiddenRef} className={`${s.list_hiden}`}>
                    {comments.slice(0, 3).map((el) => {
                        return <Comment el={el} key={el.id} />
                    })}
                </ul>

                <ul style={{ maxHeight: openList ? `${height}px` : `${heightHiden}px` }} className={`${s.list} ${anim && s.list_anim} ${openList && s.list_open}`}>
                    {comments.map((el, index) => {
                        /*  return (index == 0 || index == 1) && firstListLength < comments.length ?
                             <CommentNew key={el.id} el={el} id={index} loadClose={loadClose} loadVisible={loadVisible} />
                             : */
                        return <Comment key={el.id} el={el} id={index} loadClose={loadClose} loadVisible={loadVisible} />
                    })}
                </ul>
                {loadClose && <CommentsSceleton loadClose={loadClose} />}
            </div>
        </>

    )
};

export default Comments;