import { useEffect, useRef, useState } from 'react';
import s from './WidgetWork.module.scss';
import { ReactComponent as IconBackForward } from '../../image/work/widget/iconBackForward.svg';
import { ReactComponent as IconCloseShot } from '../../image/work/widget/iconCloseShot.svg';
import { useDispatch, useSelector } from 'react-redux';
//Api
import { sendComment } from '../../Api/Api';
//slice
import { setHeight } from '../../store/reducer/Widget/slice';
import { addComment, replaceComment, setCommentsForSend } from '../../store/reducer/Work/slice';
import { setMenuIdUpdate } from '../../store/reducer/Client/slice';
import { setClientUpdate } from '../../store/reducer/Client/slice';
//selector
import { selectorClient } from '../../store/reducer/Client/selector';
import { selectorWork } from '../../store/reducer/Work/selector';
//utils
import { timeNow } from '../../utils/dates';
//component
import LoaderButton from '../LoaderButton/LoaderButton';
const tabs = ['Не взял', 'Сбросил', 'Недоступен', 'Перенос', 'Zoom'];

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

const WidgetWorkComment = ({ setWidget, setPrevWidget, setPlanWithoutCall, callStatus }) => {
    const client_id = useSelector(selectorClient).client_id;
    const commentForSend = useSelector(selectorWork).commentsForSend;
    const client_main_number = useSelector(selectorClient).client_main_number;
    const [type, setType] = useState('zoom');
    const [tab, setTab] = useState(JSON.parse(localStorage.getItem('tab')) || '');
    const [comment, setComment] = useState(JSON.parse(localStorage.getItem('comment')) || '');
    const [anim, setAnim] = useState(false);
    const [sms, setSms] = useState(JSON.parse(localStorage.getItem('sms')) || false);
    const [screenShots, setScreenShots] = useState(JSON.parse(localStorage.getItem('screenShots')) || []);
    const [dialing, setDialing] = useState(false);
    const [load, setLoad] = useState(false);
    const dispatch = useDispatch();
    const textRef = useRef();
    console.log(screenShots)

    useEffect(() => {
        if (tab !== '') {
            textRef.current.value = tab;
            return
        }
        if (textRef.current.value !== tab) {
            setTab('');
            localStorage.setItem('tab', JSON.stringify(''));
            return
        }
    }, [tab, textRef]);

    useEffect(() => {
        if (screenShots.length == 0) {
            dispatch(setHeight(278));
            return
        }


        if (screenShots.length > 0) {
            dispatch(setHeight(398));
            return
        }


    }, [screenShots]);

    /*   useEffect(() => {
          if(callStatus.action !== 'end_call_out' || message.action !== 'call_client') {
              setDialing(false);
              return 
          }
      }, [message]);
   */

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        }, 100)
    }, []);

    const handleCleanTab = () => {
        const value = textRef.current.value;
        if (tabs.includes(value)) {
            setTab(value);
            localStorage.setItem('tab', JSON.stringify(value));
        } else {
            setTab('');
            setComment(value);
            localStorage.setItem('comment', JSON.stringify(value));
            localStorage.setItem('tab', JSON.stringify(''));
        }
    }


    const handleCLickTab = (e) => {
        const value = e.currentTarget.textContent;
        if (value === tab) {
            setTab('');
            textRef.current.value = '';
            setComment('');
            localStorage.setItem('tab', JSON.stringify(''));
            localStorage.setItem('comment', JSON.stringify(''))
        } else {
            setTab(value);
            setComment(value);
            localStorage.setItem('tab', JSON.stringify(value));
            localStorage.setItem('comment', JSON.stringify(value))
        }
    }

    const handleSmsSend = () => {
        if (sms) {
            setSms(false);
            localStorage.setItem('sms', JSON.stringify(false));
            return
        }

        if (!sms) {
            setSms(true);
            localStorage.setItem('sms', JSON.stringify(true));
            return
        }
    }

    const handleDeleteScreen = (id) => {
        const newArray = screenShots.filter(el => el.id !== id);
        setScreenShots(newArray);
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

    const handleOpenPlan = () => {
        const message = { id: 0, person_id: 0, client_id: client_id, comment: comment, date: new Date(), sms, file: screenShots[0], fileForView: [screenShots[0]?.fileForView] }
        localStorage.setItem('widget', JSON.stringify(''));
        localStorage.setItem('prevWidget', JSON.stringify(''));
        const formData = new FormData();
        formData.append('id', client_id);
        formData.append('comment', message.comment);
        formData.append('is_sms', message.sms ? 1 : 0);
        message?.file?.file && formData.append('screenshot', message.file?.file);
        setLoad(true)
        sendComment(formData)
            .then(res => {
                
                setTimeout(() => {
                    dispatch(setClientUpdate(client_id));
                    setLoad(false)
                    handleBack()
                }, 200)
            })
            .catch(err => console.log(err))
    }

    const handleBack = () => {
        setWidget('');
        setPrevWidget('');
        localStorage.removeItem('widget');
        localStorage.removeItem('prevWidget');
        localStorage.removeItem('comment');
        localStorage.removeItem('tab');
        localStorage.removeItem('sms');
        localStorage.removeItem('screenShots');
        localStorage.setItem('widget', JSON.stringify(''));
        localStorage.setItem('prevWidget', JSON.stringify(''));
    }

    return (
        <>
            <div className={`${s.work} ${anim && s.work_anim}`}>
                <p className={s.title}>Оставить комментарий</p>
               


                <textarea onPaste={handlePastImage} onChange={handleCleanTab} ref={textRef} className={s.area} placeholder='Комментарий, прикрепить скриншот (ctrl+v)' value={comment || ''}></textarea>
                <div className={`${s.block} ${tab == '' && s.block_hiden}`}>
                    <div onClick={handleSmsSend} className={`${s.switch} ${sms && s.switch_on} ${tab == '' && s.switch_hiden}`}>
                        <div></div>
                    </div>
                    <p> Отправить СМС клиенту о недозвоне</p>
                </div>
                <div className={`${s.screenshots} ${screenShots.length === 0 && s.screenshots_hiden}`}>
                    {screenShots.map((el) => {
                        return <ScreenShot key={el.id} el={el} handleDeleteScreen={handleDeleteScreen} />
                    })}
                </div>

                <div className={`${s.buttons} ${tab == '' && s.button_margin}`}>
                    <button onClick={handleBack} className={s.button_second}><IconBackForward /> Назад</button>
                    <button style={{width: '200px'}} disabled={comment.length == 0} onClick={handleOpenPlan} className={`${s.button} `}><p>Отправить</p> {load && <LoaderButton color={'#ffff'} />}</button>
                </div>
            </div>





        </>

    )
};

export default WidgetWorkComment;
