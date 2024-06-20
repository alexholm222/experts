import s from './Comments.module.scss';
import Loader from '../Loader/Loader';
import LoaderSub from '../Loader/LoaderSub';
import ModalImage from './ModalImage/ModalImage';
//utils
import { handleDateForComment } from '../../utils/dates';
import { useState } from 'react';

const Comment = ({ loadClose, loadVisible, el, id }) => {
    const [openImage, setOpenImage] = useState(false);

    const handleOpenImg = () => {
        setOpenImage(true);
    }
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
                 
                        return <div onClick={handleOpenImg} className={s.image}>
                            <img className={s.image_inner} src={el?.id ? `https://api2.skilla.ru/file/${el.file}` : el}></img>
                            {openImage && <ModalImage img={el?.id ? `https://api2.skilla.ru/file/${el.file}` : el} setOpenImage={setOpenImage}/>}
                        </div>
                    })}
                </div>
            </li>
            }
          
        </>

    )
};

export default Comment;