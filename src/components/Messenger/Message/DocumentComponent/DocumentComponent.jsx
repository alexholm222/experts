import s from './DocumentComponent.module.scss';
import iconPdf from '../../../../image/messanger/iconPdf.png';
import iconWord from '../../../../image/messanger/iconWord.png';
import iconExcel from '../../../../image/messanger/iconExcel.png';
import iconDefault from '../../../../image/messanger/iconDefault.png';
import {ReactComponent as IconDownload} from '../../../../image/messanger/iconDownload.svg';
import { useEffect, useState } from 'react';

const DocumentComponent = ({ message }) => {
    const fileType = message.fileName.split('.').pop();
    const [iconDocument, setIconDocument] = useState(iconDefault);

    useEffect(() => {

        if (fileType == 'pdf') {
            setIconDocument(iconPdf);
            return
        }

        if (fileType == 'docx') {
            setIconDocument(iconWord);
            return
        }

        if (fileType == 'xls' || fileType == 'xlsx') {
            setIconDocument(iconExcel);
            return
        }
    }, [message]);

    return (
        <div className={s.document}>
            <a download target={(fileType == 'pdf' || fileType == 'JPG' || fileType == 'JPEG' || fileType == 'PNG') ? '_blank' : '_self'} href={message.downloadUrl} className={`${s.container} ${message.type == "incoming" && s.container_in}`}>
                <div className={s.icon}>
                    <img src={iconDocument}></img>
                </div>
                <div className={s.info}>
                    <p className={s.name}>{message.fileName}</p>
                    <p className={s.sub}>{fileType.toUpperCase()}</p>
                </div>
                <div className={s.download}>
                    <IconDownload />
                </div>
            </a>
            <p className={s.caption}>{message.caption !== '' && message.caption !== message.fileName && message.caption}</p>
        </div>
    )
};

export default DocumentComponent;