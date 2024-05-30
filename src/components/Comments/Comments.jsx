import s from './Comments.module.scss';
import Comment from './Comment';
import CommentNew from './CommentNew';
import { useEffect, useRef, useState } from 'react';

const Comments = ({ loadClose, loadVisible }) => {
    const [anim, setAnim] = useState(false)
    const [openList, setOpenList] = useState(false);
    const [firstListLength, setFirstListLength] = useState(1);
    const [comments, setComments] = useState([{ text: 'комментарий 1', time: '24 января' }, { text: 'комментарий 2', time: '24 января' }, { text: 'комментарий 3', time: '24 января' }, { text: 'комментарий 4', time: '24 января' }, { text: 'комментарий 5', time: '24 января' }]);
    const [height, setHeight] = useState(65);
    const [heightHiden, setHeightHiden] = useState(65);
    const heightRef = useRef();
    const heightHiddenRef = useRef();

    useEffect(() => {
        setHeight(heightRef?.current?.offsetHeight);
        setHeightHiden(heightHiddenRef?.current?.offsetHeight)
    });

    useEffect(() => {
        setFirstListLength(comments.length)
        setAnim(true);
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setComments(prevState => [{ text: 'комментарий новый', time: '11 марта' }, ...prevState])
        }, 5500)
    }, [])
    const handleOpenList = () => {
        if (openList) {
            setOpenList(false);
        } else {
            setOpenList(true);
        }
    }
    return (
        <div className={s.comments}>
            <div className={s.header}>
                <p>Комментарий</p>
                {comments.length > 3 && <button onClick={handleOpenList}>{openList ? 'скрыть' : 'Показать все'}</button>}
            </div>
            <ul ref={heightRef} className={`${s.list_hiden}`}>
                {comments.map((el) => {
                    return <Comment el={el} />
                })}
            </ul>

            <ul ref={heightHiddenRef} className={`${s.list_hiden}`}>
                {comments.slice(0, 3).map((el) => {
                    return <Comment el={el} />
                })}
            </ul>

            <ul style={{ maxHeight: openList ? `${height}px` : `${heightHiden}px` }} className={`${s.list} ${anim && s.list_anim}`}>
                {comments.map((el, index) => {
                    return (index == 0 || index == 1) && firstListLength < comments.length ?
                        <CommentNew el={el} id={index} loadClose={loadClose} loadVisible={loadVisible} />
                        :
                        <Comment el={el} id={index} loadClose={loadClose} loadVisible={loadVisible} />
                })}
            </ul>
        </div>
    )
};

export default Comments;