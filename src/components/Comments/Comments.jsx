import s from './Comments.module.scss';
import Comment from './Comment';
import CommentNew from './CommentNew';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
//selector
import { selectorWork } from '../../store/reducer/Work/selector';
//component
import CommentsSceleton from './CommentsSceleton/CommentsSceleton';

const Comments = ({ loadClose, loadVisible }) => {
    const comments = useSelector(selectorWork).comments;
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
            {<CommentsSceleton loadClose={loadClose} />}
        </div>
    )
};

export default Comments;