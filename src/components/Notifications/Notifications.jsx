import s from './Notifications.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as IconClose } from '../../image/iconClose.svg';
import { Link } from 'react-router-dom';
//selector
import { selectorMessenger } from '../../store/reducer/Messenger/selector';
import { selectorClient } from '../../store/reducer/Client/selector';
//slice 
import { setNotification } from '../../store/reducer/Messenger/slice';
//components
import Timer from '../../utils/Timer';

const Message = ({ text, clientId, clientName, clientCity, setTimer, setOpen, type }) => {
    const client_id = useSelector(selectorClient).client_id;
    const [anim, setAnim] = useState(false);
    const [textMessage, setTextMessage] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        setAnim(false)
        setTextMessage('')
        setTimeout(() => {
            setAnim(true)
            setTextMessage(text)
        }, 150)
    }, [clientId, text]);

    const handleClose = () => {
        setAnim(false)
        setTimeout(() => {
            setOpen(false);
            setTimer(0);
        }, 150)
    }

    const handleOpenClient = () => {
        handleClose()
        if (client_id !== clientId) {
            localStorage.removeItem('widget');
            localStorage.removeItem('prevWidget');
            localStorage.removeItem('comment');
            localStorage.removeItem('tab');
            localStorage.removeItem('sms');
            localStorage.removeItem('screenShots')
            return
        }
    }

    return (
        <div className={`${s.message} ${anim ? s.message_anim : ''}`}>
            <Link onClick={handleOpenClient} to={`/experts/work/client=${clientId}`}>
                <div className={s.block_top}>
                {type !== "reactionMessage" && <p className={s.sub}>Новое сообщение от</p>}
                    <p className={s.title}>{clientName} г.{clientCity}</p>
                </div>
            </Link>
            <Link onClick={handleOpenClient} to={`/experts/work/client=${clientId}`}>
                {type == "textMessage" && <p className={s.text}>{textMessage}</p>}
                {type == "documentMessage" && <p className={s.text}>Документ</p>}
                {type == "imageMessage" && <p className={s.text}>Изображение</p>}
                {type == "audioMessage" && <p className={s.text}>Аудио сообщение</p>}
                {type == "videoMessage" && <p className={s.text}>Видео</p>}
                {type == "stickerMessage" && <p className={s.text}>Стикер</p>}
                {type == "reactionMessage" && <p className={s.text}>Реакция на ваше сообщение</p>}
            </Link>
            <div onClick={handleClose} className={s.close}><IconClose /></div>
        </div>
    )
}


const Notifications = () => {
    const messageFromSocket = useSelector(selectorMessenger).notification;
    const clientInfo = useSelector(selectorClient);
    const dispatch = useDispatch();
    const [newMessage, setNewMessage] = useState({});
    const [timer, setTimer] = useState(0);
    const [rebut, setRebut] = useState(0);
    const [open, setOpen] = useState(false);
    const time = new Date();
    time.setSeconds(time.getSeconds() + 5)
console.log(messageFromSocket)
    useEffect(() => {
        if (messageFromSocket?.client?.id) {
            setRebut(prevState => prevState + 1)
            setNewMessage({
                clientId: messageFromSocket.client.id,
                clientName: messageFromSocket?.client.name,
                clientCity: messageFromSocket?.client.city,
                messageText: messageFromSocket?.data?.messageData?.textMessageData?.textMessage,
                type: messageFromSocket?.data?.messageData?.typeMessage,
            })
            return
        }

    }, [messageFromSocket])

    useEffect(() => {
        if (timer == 0) {
            setOpen(false);
            setNewMessage({});
            return
        } else {
            setOpen(true)
        }
    }, [timer])

    console.log(timer)


    return (
        <div className={s.notifications}>
            {newMessage.clientId && <Timer expiryTimestamp={time} setTimer={setTimer} status={'end'} rebut={rebut} />}
            {newMessage.clientId && open && <Message key={newMessage.clientId} text={newMessage.messageText} clientId={newMessage.clientId} clientName={newMessage.clientName} clientCity={newMessage.clientCity} type={newMessage.type} setOpen={setOpen} setTimer={setTimer} />
            }
        </div>

    )
};

export default Notifications;