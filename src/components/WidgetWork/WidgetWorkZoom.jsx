import { useEffect, useRef, useState } from 'react';
import s from './WidgetWork.module.scss';
import { ReactComponent as IconCancel } from '../../image/work/widget/iconCancel.svg';
import { ReactComponent as IconPersonAdding } from '../../image/work/widget/IconPersonAdding.svg';
import { ReactComponent as IconBackForward } from '../../image/work/widget/iconBackForward.svg';
import { ReactComponent as IconCloseShot } from '../../image/work/widget/iconCloseShot.svg';
import { useDispatch, useSelector } from 'react-redux';
//utils
import { timeNow } from '../../utils/dates';
//selector
import { selectorClient } from '../../store/reducer/Client/selector';
import { selectorWork } from '../../store/reducer/Work/selector';
//slice
import { setHeight } from '../../store/reducer/Widget/slice';
import { addComment, replaceComment, setCommentsForSend } from '../../store/reducer/Work/slice';

const ScreenShot = ({ el, handleDeleteScreen }) => {
    const [anim, setAnim] = useState(false);
    const [animDelete, setAnimDelete] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        }, 100)
    }, [el])

    const handleDelete = () => {
        setAnimDelete(true);
        setTimeout(() => {
            handleDeleteScreen(el.id)
        }, 200)
    }

    return (
        <div key={el.id} className={`${s.shot} ${anim && s.shot_anim} ${animDelete && s.shot_delete}`}>
            <img src={el.fileForView}></img>
            <div className={s.overlay}>
                <IconCloseShot onClick={handleDelete} />
            </div>
        </div>
    )
}

const WidgetWorkZoom = ({ setWidget, setPrevWidget, setPlanWithoutCall }) => {
    const client_id = useSelector(selectorClient).client_id;
    const commentForSend = useSelector(selectorWork).commentsForSend;
    const [anim, setAnim] = useState(false);
    const [screenShots, setScreenShots] = useState(JSON.parse(localStorage.getItem('screenShots')) || []);
    const [comment, setComment] = useState(JSON.parse(localStorage.getItem('comment')) || '');
    const dispatch = useDispatch();
    const textRef = useRef();
    console.log(screenShots, comment)
    useEffect(() => {
        if (screenShots.length > 0) {
            dispatch(setHeight(436))
        } else {
            dispatch(setHeight(316))
        }
    }, [screenShots])


    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        }, 100)
    }, []);

    const handleDeleteScreen = (id) => {
        const newArray = screenShots.filter(el => el.id !== id);
        setScreenShots(newArray);
    }

    const handleBack = () => {
        setWidget('');
        setPrevWidget('');
        localStorage.setItem('widget', JSON.stringify(''));
        localStorage.setItem('prevWidget', JSON.stringify(''));
    }


    const handlePastImage = (e) => {
        const file = e.clipboardData.files[0]
        if (file && (file.type === "image/png" || file.type === "image/jpg" || file.type === "image/jpeg") && screenShots?.length == 0) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                setScreenShots(prevState => [...prevState, { fileForView: reader.result, file: file, id: timeNow(), size: file.size / 1048576 }]);
                localStorage.setItem('screenShots', JSON.stringify([{ fileForView: reader.result, file: file, id: timeNow(), size: file.size / 1048576 }]))
            };
            
        };
    };

    const handleComment = (e) => {
        const value = e.currentTarget.value;
        setComment(value);
        localStorage.setItem('comment', JSON.stringify(value));
    }


    const handleOpenPlan = () => {
        const message = { id: 0, person_id: 0, client_id: client_id, comment: comment, date: new Date(), sms: false, file: screenShots[0], fileForView: [screenShots[0]?.fileForView]}
        if (!commentForSend.comment) {
            dispatch(addComment(message));
            dispatch(setCommentsForSend(message));
        } else {
            dispatch(replaceComment(message));
            dispatch(setCommentsForSend(message));
        }
        setWidget('planZoom');
        localStorage.setItem('widget', JSON.stringify('planZoom'))
        setPlanWithoutCall(false)
    }

    const handleCancelZoom = () => {
        setWidget('reject')
    }

    const handleHandOver = () => {
        setWidget('handOver')
    }

    return (
        <div className={`${s.work} ${anim && s.work_anim}`}>
            <p className={s.title}>Работа по Zoom-встрече</p>
            <textarea onPaste={handlePastImage} value={comment || ''} ref={textRef} onChange={handleComment} className={s.area} placeholder='Прикрепи скриншот со встречи (ctrl+v)'></textarea>
            <div className={`${s.screenshots} ${screenShots.length === 0 && s.screenshots_hiden}`}>
                {screenShots.map((el) => {
                    return <ScreenShot key={el.id} el={el} handleDeleteScreen={handleDeleteScreen} />
                })}
            </div>
            <div className={s.buttons}>
                <button onClick={handleBack} className={s.button_second}><IconBackForward /> Назад</button>
                <button disabled={comment.length == 0} onClick={handleOpenPlan} style={{ width: '168px' }} className={`${s.button}`}>Далее</button>
            </div>

            <div className={s.container}>
                <button onClick={handleCancelZoom} className={s.button_small}><p>Клиент отказался</p> <IconCancel /></button>
              {/*   <button onClick={handleHandOver} className={s.button_small}><p>Передать клиента</p> <IconPersonAdding /></button> */}
            </div>
        </div>
    )
};

export default WidgetWorkZoom;
