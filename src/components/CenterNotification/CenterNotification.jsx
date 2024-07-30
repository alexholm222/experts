import s from './CenterNotification.module.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
//selector
import { selectorMessenger } from '../../store/reducer/Messenger/selector';
import { selectorClient } from '../../store/reducer/Client/selector';

const Notification = ({ el, type, textMessage, i, length }) => {
    const [anim, setAnim] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    }, [])

  

    return (

        <div style={{ top: `${i > 2 ? -12 : -i * 6}px` }} className={`${s.notification} ${anim && s.notification_anim} ${i > 0 && s.notification_absolute} ${(length > 3 && i > 2 && i < length - 1) && s.notification_opacity}`}>
            <div className={s.header}><p>{el.client.name} {el.client.city}</p></div>
            <div className={s.message}>
                {type == "textMessage" && <p className={s.text}>{textMessage}</p>}
                {type == "documentMessage" && <p className={s.text}>Документ</p>}
                {type == "imageMessage" && <p className={s.text}>Изображение</p>}
                {type == "audioMessage" && <p className={s.text}>Аудио сообщение</p>}
                {type == "videoMessage" && <p className={s.text}>Видео</p>}
                {type == "stickerMessage" && <p className={s.text}>Стикер</p>}
                {type == "reactionMessage" && <p className={s.text}>Реакция на ваше сообщение</p>}
            </div>
        </div>
    )
}

const CenterNotification = () => {
    const notifications = useSelector(selectorMessenger).notifications;
    const client_id = useSelector(selectorClient).client_id;
    const [idClients, setIdClients] = useState([]);
    console.log(notifications)

    useEffect(() => {
        const idArray = notifications.map((el) => (el.client.id));

        const result = idArray.reduce((acc, item) => {
            if (acc.includes(item)) {
                return acc; // если значение уже есть, то просто возвращаем аккумулятор
            }
            return [...acc, item]; // добавляем к аккумулятору и возвращаем новый аккумулятор
        }, []);
        setIdClients(result)
        console.log(result)
    }, [notifications])

    const handleOpenClient = () => {
     
            localStorage.removeItem('widget');
            localStorage.removeItem('prevWidget');
            localStorage.removeItem('comment');
            localStorage.removeItem('tab');
            localStorage.removeItem('sms');
            localStorage.removeItem('screenShots')
     
        
    }


    return (
        <div className={s.container}>

            {idClients.map(id => {
                const notificationsFilter = notifications.filter(el => el.client.id == id)
                return <Link onClick={handleOpenClient} to={`/experts/work/client=${id}`}>
                    <div style={{ marginTop: `${notificationsFilter.length > 2 ? 12 : (notificationsFilter.length - 1) * 6}px` }} className={`${s.block} ${client_id == id && s.block_hidden}`}>
                        {notificationsFilter.map((el, i) => {
                            return el.client.id == id && <Notification i={i} clientId={el.client.id} el={el} type={el.data.messageData.typeMessage} textMessage={el.data?.messageData?.textMessageData?.textMessage} length={notificationsFilter.length} />
                        })}
                    </div>
                </Link>
            })}

        </div>
    )
};

export default CenterNotification;