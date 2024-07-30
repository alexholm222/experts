import s from './FileAddModal.module.scss';
import { useState, useRef, useEffect} from 'react';
import { ReactComponent as IconDocument } from '../../../image/messanger/iconDocument.svg';
import { ReactComponent as IconPhoto } from '../../../image/messanger/iconPhoto.svg';
import uuid from 'react-uuid';

const FileAddModal = ({ openFileModal, setImageFiles, setDocumentFiles, setOpenFileModal, buttonRef }) => {
    const [error, setError] = useState(false);
    const fileInputRef = useRef();
    const fileDocInputRef = useRef();
    const modalRef = useRef();

    const closeModal = (e) => {
        e.stopPropagation()
        if (modalRef.current && !modalRef.current.contains(e.target) && !buttonRef.current.contains(e.target)) {
            setOpenFileModal(false)
        }
    }
    useEffect(() => {
        document.addEventListener('mouseup', closeModal);

        return () => document.removeEventListener('mouseup', closeModal);
    }, [buttonRef]);

    
    const handleWriteImage = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            console.log(reader.result)
            setImageFiles((prevState) =>
                [...prevState, {
                    id: uuid(),
                    file: file,
                    name: file.name,
                    size: file.size / 1048576,
                    timestamp: Date.now() / 1000,
                    fileBase64: reader.result,
                }]
            );

            setOpenFileModal(false)
        };
    }

    const handleWriteDoc = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            console.log(reader.result)
            setDocumentFiles((prevState) =>
                [...prevState, {
                    id: uuid(),
                    file: file,
                    name: file.name,
                    size: file.size / 1048576,
                    timestamp: Date.now() / 1000,
                    fileBase64: reader.result,
                }]
            );

            setOpenFileModal(false)
        };
    }


    const handleFile = async (e) => {
        const id = e.currentTarget.id;
        const files = Object.values(e.currentTarget.files);
        console.log(files)
        files.forEach((file) => {
            if (file.size > 150 * 1048576) {
                console.log("большой файл");
                setError(true)
            }
            else {
                setError(false);
                id == 'image-input' ? handleWriteImage(file) : handleWriteDoc(file);
                fileInputRef.current && (fileInputRef.current.value = '');
                fileDocInputRef.current && (fileDocInputRef.current.value = '');
            }
        })
    }
    return (
        <div ref={modalRef} className={`${s.modal} ${openFileModal && s.modal_open}`}>
            <ul className={s.list}>
                <input ref={fileDocInputRef} multiple id="document-input" type='file' accept=".pdf,.doc,.docx,.xls,.xlsx" onInput={handleFile}></input>
                <input ref={fileInputRef} multiple id="image-input" type='file' accept=".png,.jpg,.jpeg" onInput={handleFile}></input>
                <label for="document-input"><IconDocument /><p>Документ</p></label>
                <label for="image-input"><IconPhoto /><p>Фото</p></label>
            </ul>
        </div>
    )
};

export default FileAddModal;