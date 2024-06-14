import { useEffect, useRef, useState } from 'react';
import s from './Comments.module.scss';
import Loader from '../Loader/Loader';
//utils
import { handleDateForComment } from '../../utils/dates';

const CommentNew = ({ loadClose, loadVisible, el, id }) => {
    const [anim, setAnim] = useState(false);
    const commentRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    }, [])

    return (
        <>
            <li id={id} style={{height: commentRef?.current?.offsetHeight}} className={`${s.comment} ${s.new} ${anim && s.new_anim}`}>
                <p>{el.comment} {loadClose && <Loader load={loadVisible} />}</p>
                <span>{handleDateForComment(el.date)}{loadClose && <Loader load={loadVisible} />}</span>
            </li>

            <li ref={commentRef} id={id} className={`${s.comment} ${s.comment_hidden}`}>
                <p>{el.comment}</p>
                <span>{handleDateForComment(el.date)}</span>
            </li>
        </>

    )
};

export default CommentNew;