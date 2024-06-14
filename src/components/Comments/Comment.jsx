import s from './Comments.module.scss';
import Loader from '../Loader/Loader';
import LoaderSub from '../Loader/LoaderSub';
//utils
import { handleDateForComment } from '../../utils/dates';

const Comment = ({ loadClose, loadVisible, el, id }) => {
    return (
        <>
            {<li id={id} className={`${s.comment}`}>
                <div className={s.loader}>
                    <p className={`${loadClose && s.hiden}`}>{el?.comment}</p>
               {/*      {loadClose && <Loader load={loadVisible} />} */}
                </div>
                <div className={s.loader}>
                    <span className={`${loadClose && s.hiden}`}>{handleDateForComment(el?.date)}</span>
                   {/*  {loadClose && <LoaderSub load={loadVisible} />} */}
                </div>
            </li>
            }

        </>

    )
};

export default Comment;