import s from './CommentsSceleton.module.scss';
import LoaderSceleton from '../../Loader/LoaderSceleton';

const CommentSceleton = () => {


    return (

        <li className={`${s.comment}`}>
            <div>
                <div className={s.text}>
                    <LoaderSceleton />
                </div>
                <div className={s.span}>
                    <LoaderSceleton />
                </div>
            </div>

            <div className={`${s.images}`}>

            </div>
        </li>


    )
};

export default CommentSceleton;