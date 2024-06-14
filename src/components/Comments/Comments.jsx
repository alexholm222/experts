import s from './Comments.module.scss';
import Comment from './Comment';
import CommentNew from './CommentNew';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
//selector
import { selectorWork } from '../../store/reducer/Work/selector';

const Comments = ({ loadClose, loadVisible }) => {
    const comments = useSelector(selectorWork).comments;
    const [anim, setAnim] = useState(false)
    const [openList, setOpenList] = useState(false);
    const [firstListLength, setFirstListLength] = useState(1);
    const [height, setHeight] = useState(65);
    const [heightHiden, setHeightHiden] = useState(65);
    const heightRef = useRef();
    const heightHiddenRef = useRef();
    console.log(comments)

    useEffect(() => {
        setHeight(heightRef?.current?.offsetHeight);
        setHeightHiden(heightHiddenRef?.current?.offsetHeight)
    });

    useEffect(() => {
        setFirstListLength(comments.length)
        setAnim(true);
    }, [])

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
        <div className={`${s.comments} ${comments.length == 0 && s.comments_hiden}`}>
            <div className={s.header}>
                <p>Комментарий</p>
                {comments.length > 3 && <button onClick={handleOpenList}>{openList ? 'скрыть' : 'Показать все'}</button>}
            </div>
            <ul ref={heightRef} className={`${s.list_hiden}`}>
                {comments.map((el) => {
                    return <Comment el={el} key={el.id}/>
                })}
            </ul>

            <ul ref={heightHiddenRef} className={`${s.list_hiden}`}>
                {comments.slice(0, 3).map((el) => {
                    return <Comment el={el} key={el.id}/>
                })}
            </ul>

            <ul style={{ maxHeight: openList ? `${height}px` : `${heightHiden}px` }} className={`${s.list} ${anim && s.list_anim}`}>
                {comments.map((el, index) => {
                    return (index == 0 || index == 1) && firstListLength < comments.length ?
                        <CommentNew key={el.id} el={el} id={index} loadClose={loadClose} loadVisible={loadVisible} />
                        :
                        <Comment key={el.id} el={el} id={index} loadClose={loadClose} loadVisible={loadVisible} />
                })}
            </ul>
        </div>
    )
};

export default Comments;