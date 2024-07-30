import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import s from './Messenger.module.scss';
import { TextareaAutosize } from '@mui/base';
import { ReactComponent as IconFile } from '../../image/work/iconFile.svg';
import { ReactComponent as IconAdd } from '../../image/messanger/iconAdd.svg';
import { ReactComponent as FonLightsvg } from '../../image/messanger/fonLightsvg.svg';
import { ReactComponent as FonDarksvg } from '../../image/messanger/fonDarksvg.svg';
import IconSend from '../../image/work/iconSend.png';
import LightFon from '../../image/messanger/light.jpeg';
import DarkFon from '../../image/messanger/dark.jpeg';

//API
import { getCurrentStateInstance, getRebootInstance, getMessageHistory, sendMessage, chatCheck, chatRead } from '../../Api/Api';
//components
import Message from './Message/Message';
import AnimEnd from '../AnimEnd/AnimEnd';
import FileAddModal from './FileAddModal/FileAddModal';
import FileList from './FileList/FileList';
//selector
import { selectorMessenger } from '../../store/reducer/Messenger/selector';
import { selectorClient } from '../../store/reducer/Client/selector';
import { selectorExpert } from '../../store/reducer/Expert/selector';
import { selectorCommand } from '../../store/reducer/Command/selector';
//slice
import { setMessageStatus, deleteNotifications } from '../../store/reducer/Messenger/slice';
//utils
import { handleComparisonDate } from '../../utils/dates';
import Fancybox from '../../utils/Fancybox';
const bages = ['Приветствие', 'Визитка', 'Ссылка на Zoom','НД', 'НД2' , 'НД3', 'Одобрение анкеты', "Вход в ЛК"];
const Bage = ({ el, bage, setBage, setMessage, expertName, clientName, message }) => {

    const handleActiveBage = (e) => {
        const value = e.currentTarget.textContent;
        setBage(value);

        if (bage == value) {
            setBage('');
            setMessage('');
            return
        }
        if (value == 'Приветствие') {
            setMessage(`Это ${expertName}, Skilla \nБудем держать связь здесь`);
            return
        }

        if (value == 'НД') {
            setMessage('Добрый день. \nНе получилось с вами связаться, когда сможем пообщаться?');
            return
        }

        if (value == 'Ссылка на Zoom') {
            setMessage('Направляю ссылку на конференцию в ZOOM');
            return
        }

        if (value == 'Одобрение анкеты') {
            setMessage('Анкета вам одобрена, у службы безопасности вопросов к  вам нет 🤝 \nУ вас открылся договор, изучайте. \nОбращаю ваше внимание на пункт договора 12.6, там пользовательское соглашение, в котором указан наш функционал.\nЗавтра созвонимся, обсудим вопросы, если они будут. \nЕсли что, я на связи)');
            return
        }

        if (value == 'Визитка') {
            setMessage(`Добрый день. Это ${expertName}, эксперт по развитию партнерской \nсети компании Skilla. \nНаш сайт Skilla.ru`)
            return
        }

        if (value == 'НД2') {
            setMessage(`${clientName}, здравствуйте! \nМеня зовут ${expertName}, компания Skilla. \nЯ эксперт по открытию и развитию партнеров нашей партнерской сети. \nМне передали вашу заявку, но, к сожалению, не получается до вас дозвониться. \nПодскажите, пожалуйста, когда будет удобно пообщаться по нашему сотрудничеству?`)
            return
        }

        if (value == 'НД3') {
            setMessage(`Добрый день. Это ${expertName}, компания Skilla. \nМы с вами ранее созванивались, переносили разговор, но связаться не получилось. \nПодскажите, когда сможем пообщаться?`)
            return
        }

        if (value == 'Вход в ЛК') {
            setMessage(`Дублирую ссылку на личный кабинет со всей информацией о нашей компании: \nhttps://skilla.ru/enter`);
            return
        }

    }
    return (
        <div onClick={handleActiveBage} className={`${s.bage} ${el == bage && s.bage_active}`}>
            <p>{el}</p>
        </div>
    )
}

const Messenger = ({ loadClose, theme, callButtonAdd }) => {
    const [loadPage, setLoadPage] = useState(false);
    const [loadHistory, setLoadHistory] = useState(false);
    const [bage, setBage] = useState('');
    const [disabledSend, setDisabledSend] = useState(true);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [messagesHistory, setMessagesHistory] = useState([]);
    const [newMessages, setNewMessages] = useState([]);
    const [images, setImages] = useState([]);
    const [startCursor, setStartCursor] = useState(0);
    const [endCursor, setEndCursor] = useState(30);
    const [telCheck, setTelCheck] = useState(false);
    const [loadCheck, setLoadCheck] = useState(true);
    const [openFileModal, setOpenFileModal] = useState(false);
    const [error, setError] = useState(false);
    const [documentFiles, setDocumentFiles] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const [openFileList, setOpenFileList] = useState(false);
    const [typeList, setTypeList] = useState('file');
    const [reactions, setReactions] = useState([]);
    const messageFromSocket = useSelector(selectorMessenger).message;
    const callStatus = useSelector(selectorCommand).callStatus;
    const clientInfo = useSelector(selectorClient);
    const clientName = clientInfo.client_name;
    const expert = useSelector(selectorExpert).expert;
    const expertName = expert.name;
    const areaRef = useRef();
    const chatRef = useRef();
    const buttonRef = useRef();
    const messengerRef = useRef();
    const timerDebounceRef = useRef();
    const textAreaRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        if (imageFiles.length > 0) {
            setTypeList('image')
            setOpenFileList(true);
            return
        }

        if (documentFiles.length > 0) {
            setTypeList('file');
            setOpenFileList(true);
            return
        }

        if (imageFiles.length == 0 && documentFiles.length == 0) {
            setOpenFileList(false);
            return
        }
    }, [imageFiles, documentFiles])

     useEffect(() => {
        setMessages([]);
        !loadClose && handleCheckInstance();
        !loadClose && chatCheck(clientInfo?.client_main_number)
            .then(res => {
                const existsWhatsapp = res.data.data.existsWhatsapp;
                setTelCheck(existsWhatsapp);
                setLoadCheck(false);
                !existsWhatsapp && setLoadHistory(true);
            })
            .catch(err => { setError(true) })
    }, [loadClose, clientInfo.client_main_number])


    useEffect(() => {
        setTimeout(() => {
            setLoadPage(true);
        })

        telCheck && getMessageHistory(clientInfo?.client_main_number, '')
            .then(res => {
                const messages = res.data.data;
                console.log(res)
                setMessages(messages);
                chatRead(clientInfo?.client_main_number, clientInfo.client_id)
                    .then(res => console.log(res))
                    .catch(err => console.log(err))
                setTimeout(() => {
                    setLoadHistory(true);
                }, 50);

             setTimeout(() => {
                dispatch(deleteNotifications(clientInfo.client_id))  
             }, 200)
                setImages(messages.filter(el => el.type == "imageMessage"));

            })
            .catch(err => {
                { setError(true) }
                setMessages([]);
            })

    }, [telCheck, clientInfo]);

  console.log(messageFromSocket)
    //получение сообщения по сокету
    useEffect(() => {
        const data = messageFromSocket?.data;
        data?.idMessage && chatRead(clientInfo.client_main_number, clientInfo.client_id)
            .then(res => console.log(res))
            .catch(err => console.log(err))

        if (data?.idMessage && data?.messageData?.typeMessage == 'textMessage') {
            const messageText = {
                type: "incoming",
                typeMessage: data.messageData.typeMessage,
                idMessage: data.idMessage,
                textMessage: data.messageData.textMessageData.textMessage,
                timestamp: Date.now() / 1000,
            }

            setMessages(prevState => [messageText, ...prevState]);
            return
        }

        if (data?.idMessage && data?.messageData?.typeMessage == 'imageMessage') {
            const messageImage = {
                type: "incoming",
                typeMessage: data.messageData.typeMessage,
                idMessage: data.idMessage,
                caption: data.messageData.fileMessageData.caption,
                jpegThumbnail: data.messageData.fileMessageData.jpegThumbnail,
                downloadUrl: data.messageData.fileMessageData.downloadUrl,
                timestamp: Date.now() / 1000,
            }

            setMessages(prevState => [messageImage, ...prevState]);
            return
        }

        if (data?.idMessage && data?.messageData?.typeMessage == 'documentMessage') {
            const messageDocuments = {
                type: "incoming",
                fileName: data.messageData.fileMessageData.fileName,
                typeMessage: data.messageData.typeMessage,
                idMessage: data.idMessage,
                caption: data.messageData.fileMessageData.caption,
                jpegThumbnail: data.messageData.fileMessageData.jpegThumbnail,
                downloadUrl: data.messageData.fileMessageData.downloadUrl,
                timestamp: Date.now() / 1000,
            }

            setMessages(prevState => [messageDocuments, ...prevState]);
            return
        }
    }, [messageFromSocket]);

    useEffect(() => {
        if (message.length == 0) {
            setDisabledSend(true)
        } else {
            textAreaRef.current.focus()
            setDisabledSend(false)
        }
    }, [message]);

    useEffect(() => {
        const data = messages.filter(el => el.typeMessage == "reactionMessage")
        setReactions(data)
    }, [messages]);

    console.log(reactions)

    const handleCheckInstance = () => {
        getCurrentStateInstance()
            .then(res => {
                if (res.data.success) {
                    console.log('instance authorizade')
                    return true
                } else {
                    getRebootInstance()
                        .then(res => console.log(res))
                        .catch(err => { setError(true) })
                }
            })
            .catch(err => { setError(true) })
    }

    const handleMessage = (e) => {
        const value = e.currentTarget.value;
        value.length == 0 ? setDisabledSend(true) : setDisabledSend(false);
        setMessage(value)
    }


    const handleSendMessage = () => {
        dispatch(setMessageStatus({}));
        sendMessage(clientInfo.client_main_number, message)
            .then(res => {
                const idMessage = res.data.data.idMessage;
                setMessage('');
                setDisabledSend(true)
                const messageForSend = {
                    type: "outgoing",
                    typeMessage: "extendedTextMessage",
                    idMessage: idMessage,
                    textMessage: message,
                    statusMessage: 'sent',
                    timestamp: Date.now() / 1000,
                }
                setMessages(prevState => [messageForSend, ...prevState])
                setTimeout(() => {
                    chatRef.current.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'nearest' });
                }, 100)

            })
            .catch(err => { setError(true) });
    }
    console.log(openFileModal)

    const handleOpenFileModal = () => {
        openFileModal ? setOpenFileModal(false) : setOpenFileModal(true);
    }

    const handleSend = (e) => {

        if (e.shiftKey && e.key === 'Enter') {
            e.preventDefault();
            setMessage(prevState => prevState += "\n");
            return
        }

        if (e.key === 'Enter') {
            e.preventDefault();
            handleSendMessage()
            return
        }
    }



    useEffect(() => {
        areaRef.current.addEventListener('scroll', handleDebounceScroll);
        return () => window.removeEventListener('scroll', handleDebounceScroll)
    }, [])

    const scrollLoad = () => {
        /*   const loadBottom = messengerRef.current.getBoundingClientRect().bottom - areaRef.current.innerHeight < 800;
          const loadTop = areaRef.current.innerHeight - messengerRef.current.getBoundingClientRect().top < 800; */

        const loadTop = areaRef.current.scrollHeight + areaRef.current.scrollTop < 900;
        const loadBottom = areaRef.current.scrollTop > -300;
        console.log(areaRef.current.getBoundingClientRect().bottom, messengerRef.current.innerHeight, areaRef.current.scrollTop, areaRef.current.scrollHeight, areaRef.current.scrollHeight + areaRef.current.scrollTop)
        /*   loadBottom && setEndCursor(50); */

        if(loadTop) {
            setEndCursor(prevState => prevState + 30);
           /*  setStartCursor(prevState => prevState + 50); */
            return
        }

        if(loadBottom) {
            setEndCursor(30)
        }
      /*   loadTop &&  */
       /*  loadTop && setStartCursor(prevState => prevState + 50); */

    }

    function handleDebounceScroll() {
        if (timerDebounceRef.current) {
            clearTimeout(timerDebounceRef.current);
        }

        timerDebounceRef.current = setTimeout(() => {
            scrollLoad()
        }, 100);
    }

    console.log(reactions)

    return (
        <div ref={messengerRef} className={`${s.messenger} ${callButtonAdd && s.messenger_margin} ${!loadHistory && s.messenger_disabled}`}>
            <div className={s.fon}>
                {theme == 'dark' ? <FonDarksvg /> : <FonLightsvg />}
                {/*    <img src={theme == 'dark' ? DarkFon : LightFon}></img> */}
            </div>
            <div className={`${s.noavailable} ${!loadCheck && !telCheck && s.noavailable_vis}`}>
                <p>Выбраного номера нет в WhatsApp</p>
            </div>


            <div className={`${s.loader} ${!loadHistory && s.loader_vis}`}>
                <AnimEnd />
            </div>
            <div ref={areaRef} className={s.area}>
                <div ref={chatRef} style={{ marginTop: '78px' }}></div>
                {messages.slice(0, endCursor).map((el, i) => {
                    const firstMessageDay = i < messages.length - 1 ? handleComparisonDate(el.timestamp, messages[i + 1].timestamp) ? false : true : true;
                    const lastMy = (el.type !== messages?.[i - 1]?.type) ? true : false;

                    const reaction = reactions.find(item => item.quotedMessage.stanzaId == el.idMessage);
                   { return el.typeMessage !== "reactionMessage" && <Message key={el.idMessage} message={el} firstMessageDay={firstMessageDay} lastMy={lastMy} loadHistory={loadHistory} phone={clientInfo.client_main_number} reaction={reaction}/>}
                })}



            </div>

            <div className={`${s.block} ${s.block_top}  ${loadHistory && s.block_disabled}`}>
                <div className={s.bages}>
                    {bages.map((el, i) => {
                        return <Bage key={i} el={el} setBage={setBage} setMessage={setMessage} bage={bage} expertName={expertName} clientName={clientName} message={message}/>
                    })}
                </div>
            </div>

            {openFileList && <FileList setOpenFileList={setOpenFileList} files={typeList == 'file' ? documentFiles : imageFiles} setFiles={typeList == 'file' ? setDocumentFiles : setImageFiles} documentFiles={documentFiles}
                loadPage={loadPage} phone={clientInfo.client_main_number}
                messageText={message} setMessages={setMessages} chatRef={chatRef} typeList={typeList} />}

            <div className={`${s.block} ${s.block_bottom} ${loadHistory && s.block_disabled}`}>
                <FileAddModal openFileModal={openFileModal} setImageFiles={setImageFiles} setDocumentFiles={setDocumentFiles} setOpenFileModal={setOpenFileModal} buttonRef={buttonRef} />
                <button ref={buttonRef} onClick={handleOpenFileModal} className={`${s.button_file} ${openFileModal && s.button_file_active}`}><IconAdd /></button>
                {loadPage && <TextareaAutosize minRows={1} maxRows={7} placeholder="Введите сообщение" value={message || ''} onChange={handleMessage} onKeyDown={handleSend} ref={textAreaRef} />}

                <button onClick={handleSendMessage} className={`${s.button} ${s.button_send} ${disabledSend && s.button_disabled}`}><img src={IconSend}></img></button>
            </div>

            <Fancybox width={430} height={430}>
                {images?.map((item, index) => (
                    <a className="images-block__photo" /* style={{display: 'none'}} */ data-fancybox={clientInfo.client_main_number} href={images.downloadUrl} key={index}></a>
                ))}

            </Fancybox>
        </div>
    )
};

export default Messenger;