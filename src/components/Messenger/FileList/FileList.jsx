import s from './FileList.module.scss';
import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TextareaAutosize } from '@mui/base';
import IconSend from '../../../image/work/iconSend.png';
import { ReactComponent as IconClose } from '../../../image/iconClose.svg';
import iconPdf from '../../../image/messanger/iconPdf.png';
import iconWord from '../../../image/messanger/iconWord.png';
import iconExcel from '../../../image/messanger/iconExcel.png';
import iconDefault from '../../../image/messanger/iconDefault.png';
//API
import { sendFile } from '../../../Api/Api';
//slice
import { setMessageStatus } from '../../../store/reducer/Messenger/slice';


const FileList = ({ setOpenFileList, files, setFiles, loadPage, phone, messageText, setMessages, chatRef, typeList }) => {
    const textAreaRef = useRef();
    const [anim, setAnim] = useState(false);
    const [message, setMessage] = useState('');
    const [image, setImage] = useState('');
    const [activeImage, setActiveImage] = useState(files[0]?.id);
    const [iconDocument, setIconDocument] = useState(iconDefault);
    const [fileData, setFileData] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        }, 100);
    }, []);


    useEffect(() => {
        if (message.length == 0) {
        } else {
            textAreaRef.current.focus()
        }
    }, [message]);

    useEffect(() => {
        const findFile = files.find(el => el.id == activeImage);
        console.log(findFile)
        if(typeList == 'image') {
            setImage(findFile.fileBase64);
            return
        }
        
        if(typeList == 'file') {
            const fileType = findFile.name.split('.').pop();
            setFileData({name: findFile.name, size: findFile.size})
            if (fileType == 'pdf') {
                setIconDocument(iconPdf);
            } else if (fileType == 'docx') {
                setIconDocument(iconWord);
            } else if (fileType == 'xls') {
                setIconDocument(iconExcel);
            } else {
                setIconDocument(iconDefault);
            }
        }
    }, [files, activeImage]);

    useEffect(() => {
        setMessage(messageText)
    }, [messageText])


    const handleMessage = (e) => {
        const value = e.currentTarget.value;
        setMessage(value)
    }


    const handleSend = (e) => {

        if (e.shiftKey && e.key === 'Enter') {
            e.preventDefault();
            setMessage(prevState => prevState += "\n");
            return
        }

        if (e.key === 'Enter') {
            e.preventDefault();
            handleSendFiles();
            return
        }
    }

    const handleActiveImage = (e) => {
        const id = e.currentTarget.id;
        setActiveImage(id)
    }

    const handleSendFiles = () => {
        files.forEach(el => {
            handleFile(el);
        });
        handleClose();
        setTimeout(() => {
            chatRef.current.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'nearest' });
        }, 100)
    }

    console.log(typeList)

    const handleFile = (el) => {
        const formData = new FormData();
        formData.append('phone', phone);
        formData.append('file', el.file);
        formData.append('caption', message);
        dispatch(setMessageStatus({}));
        sendFile(formData)
            .then(res => {
                const data = res.data.data;
                console.log(res)
                const messageImage = {
                    type: "outgoing",
                    typeMessage: "imageMessage",
                    idMessage: data.idMessage,
                    caption: message,
                    jpegThumbnail: '',
                    downloadUrl: data.urlFile,
                    timestamp: Date.now() / 1000,
                }

                const messageDocuments = {
                    type: "outgoing",
                    fileName: el.file.name,
                    typeMessage: "documentMessage",
                    idMessage: data.idMessage,
                    caption: message,
                    downloadUrl: data.urlFile,
                    timestamp: Date.now() / 1000,
                }

                setMessages(prevState => [typeList == 'image' ? messageImage : messageDocuments, ...prevState])
            })
            .catch(err => console.log(err))

    }

    const handleClose = () => {
        setAnim(false)

        setTimeout(() => {
            setOpenFileList(false)
        }, 150)



        setTimeout(() => {
            setFiles([]);
        }, 200)
    }

    console.log(files)

    return (
        <div className={`${s.files} ${anim && s.files_open}`}>
            <div onClick={handleClose} className={s.close}>
                <IconClose />
            </div>
            <div className={s.container}>
                <div className={s.block}>
                    {typeList == 'image' && <div className={`${s.image}`}>
                        <img src={image}></img>
                    </div>}

                    {typeList == 'file' && <div className={s.icon}>
                        <img src={iconDocument}></img>

                        <p>{fileData.name} - <span>{fileData?.size?.toFixed(2)} MB</span></p>
                    </div>}
                </div>

                {loadPage && <TextareaAutosize minRows={1} maxRows={5} placeholder="Добавьте подпись" value={message || ''} onChange={handleMessage} onKeyDown={handleSend} ref={textAreaRef} />}
            </div>
            <div className={s.block_bottom}>
                <div className={s.list}>
                    {files.map((el, i) => {
                        let icon = iconDefault;
                        const fileType = el.name.split('.').pop();


                        if (fileType == 'pdf') {
                            icon = iconPdf;
                        } else if (fileType == 'docx') {
                            icon = iconWord;
                        } else if (fileType == 'xls') {
                            icon = iconExcel;
                        } else {
                            icon = iconDefault;
                        }


                        return <div onClick={handleActiveImage} id={el.id} key={i} className={`${s.image_small} ${typeList == 'file' && s.image_small_file} ${el.id == activeImage && s.image_small_active}`}>
                            {typeList == 'image' && <img src={el.fileBase64}></img>}

                            {typeList == 'file' && <img src={icon}></img>}
                        </div>
                    })}
                </div>

                <button onClick={handleSendFiles} className={`${s.button} ${s.button_send}`}><img src={IconSend}></img></button>
            </div>


        </div>
    )
};

export default FileList;