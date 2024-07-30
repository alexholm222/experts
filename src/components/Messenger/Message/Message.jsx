import s from './Message.module.scss';
import { ReactComponent as Check } from '../../../image/messanger/check.svg';
import { ReactComponent as SendCheck } from '../../../image/messanger/sendCheck.svg';
import { useEffect, useState, memo } from 'react';
import { useSelector } from 'react-redux';
import DefaultAvatar from '../../../image/messanger/defaultAvatar.png';
//Api 

//selector
import { selectorExpert } from '../../../store/reducer/Expert/selector';
import { selectorMessenger } from '../../../store/reducer/Messenger/selector';
//utils
import { handleTimeMessage, handleDateMessage } from '../../../utils/dates';
//components
import ImageComponent from './ImageComponent/ImageComponent';
import DocumentComponent from './DocumentComponent/DocumentComponent';
import AudioComponent from './AudioComponent/AudioComponent';
import VideoComponent from './VideoComponent/VideoComponent';
import StickerComponent from './StickerComponent/StickerComponent';

const Message = ({ message, firstMessageDay, lastMy, loadHistory, phone, reaction }) => {
    const expertInfo = useSelector(selectorExpert).expert;
    const messageStatus = useSelector(selectorMessenger).messageStatus;
    const [anim, setAnim] = useState(false);
    const [status, setStatus] = useState(message.statusMessage || 'sent');
    const type = message.type;
    const typeMessage = message.typeMessage;
    const statusMessage = message.statusMessage;
    const textMessage = message?.textMessage;
    const caption = message?.caption;
    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    }, []);

    useEffect(() => {
        if (messageStatus.status == 'read' && status !== 'read') {
            setStatus('read')
        }
        if (message.idMessage == messageStatus.idMessage && messageStatus.status !== 'read') {
            setStatus(messageStatus.status)
            return
        }
    }, [messageStatus]);

    return (
        <>

            <div id={message.idMessage} className={`${s.message} ${lastMy && s.message_margin} ${type == "outgoing" && s.message_outgoing} ${reaction && s.message_margin}`}>
                <div className={`${s.content} ${anim && s.content_anim} ${type == "outgoing" && s.content_outgoing} 
                                 ${(typeMessage == 'imageMessage' || typeMessage == 'documentMessage' || typeMessage == 'videoMessage') && s.content_image} ${typeMessage == 'stickerMessage' && s.content_sticker}`}>
                    {(typeMessage == "textMessage" || typeMessage == "extendedTextMessage") && <p className={s.text}>{textMessage}</p>}

                    {typeMessage == "imageMessage" && <ImageComponent message={message} phone={phone} />}
                    {typeMessage == "documentMessage" && <DocumentComponent message={message} />}
                    {typeMessage == "audioMessage" && <AudioComponent message={message} avatar={type == "outgoing" ? expertInfo.avatar : DefaultAvatar}/>}
                    {typeMessage == "videoMessage" && <VideoComponent message={message} />}
                    {typeMessage == "stickerMessage" && <StickerComponent message={message} />}
                    {typeMessage == "reactionMessage" && <AudioComponent message={message} />}

                    <div className={`${s.time} ${(caption == '' || caption == null) && typeMessage == "imageMessage" && s.time_image}`}>
                        <span>{handleTimeMessage(message.timestamp).time}</span>
                        {type == "outgoing" && <div className={s.icons}>
                            <div className={`${s.icon} ${status == 'read' && s.icon_read}`}>
                                <Check />
                            </div>

                            <div className={`${s.icon} ${status == 'delivered' && s.icon_delivered} ${(caption == '' || caption == null) && typeMessage == "imageMessage" && s.icon_image}`}>
                                <Check />
                            </div>

                            <div className={`${s.icon} ${status == 'sent' && s.icon_send} ${(caption == '' || caption == null) && typeMessage == "imageMessage" && s.icon_image}`}>
                                <SendCheck />
                            </div>

                        </div>
                        }
                    </div>

                    {reaction && <div className={`${s.reaction} ${type == "outgoing" && s.reaction_outgoing}`}>
                             <p>{reaction.extendedTextMessageData.text}</p>
                    </div>}
                </div >

                {< div className={`${s.avatar} ${loadHistory && s.avatar_anim}`} >
                    {lastMy && <img src={type == "outgoing" ? expertInfo.avatar : DefaultAvatar}></img>}
                </div >
                }
            </div >
            {firstMessageDay && <div className={s.date}><p>{handleDateMessage(message.timestamp)}</p></div>}
        </>


    )
};

export default memo(Message);