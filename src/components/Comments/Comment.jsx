import s from './Comments.module.scss';
import Loader from '../Loader/Loader';
import LoaderSub from '../Loader/LoaderSub';
//utils
import { handleDateForComment } from '../../utils/dates';

const Comment = ({ loadClose, loadVisible, el, id }) => {
    return (
        <>
            {<li id={id} className={`${s.comment}`}>
                <div>
                    <div className={s.loader}>
                        <p className={`${loadClose && s.hiden}`}>{el?.comment}</p>
                    </div>
                    <div className={s.loader}>
                        <span className={`${loadClose && s.hiden}`}>{handleDateForComment(el?.date)}</span>
                    </div>
                </div>

                <div className={`${s.images} ${(el?.files?.length > 0 || (el.fileForView?.length > 0 && el.fileForView?.[0])) && s.images_open}`}>
                    {(el.fileForView?.[0] ? el.fileForView : el?.files)?.map((el) => {
                        console.log(el)
                        return <div className={s.image}>
                            <img src={el?.id ? `https://api2.skilla.ru/file/${el.file}` : el}></img>
                        </div>
                    })}
                </div>
            </li>
            }

        </>

    )
};

export default Comment;