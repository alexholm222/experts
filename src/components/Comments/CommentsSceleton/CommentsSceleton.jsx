import s from './CommentsSceleton.module.scss';
import CommentSceleton from "./CommentSceleton";
import { useEffect, useState } from 'react';


const CommentsSceleton = ({loadClose}) => {
    const [loadComments, setLoadComments] = useState(true);

    useEffect(() => {
        loadClose ? setLoadComments(true) : setLoadComments(false);
    }, [loadClose])

    return (
        <div className={`${s.overlay} ${loadClose && s.overlay_vis}`}>
            <div className={`${s.comments}`}>



                <ul className={`${s.list}`}>
                    {[...Array(3)].map((index) => {

                        return <CommentSceleton key={index} />
                    })}
                </ul>
            </div>
        </div>
    )
};

export default CommentsSceleton;