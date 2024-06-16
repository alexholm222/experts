import s from './ModalConfirm.module.scss';
import { ReactComponent as IconClose } from '../../../image/iconClose.svg';
import { useState, useEffect, useRef } from 'react';
//Api
import { acceptAnketa, rejectAnketa, retryAnketa } from '../../../Api/Api';
import LoaderButton from '../../LoaderButton/LoaderButton';

const ModalConfirm = ({ confirmType, clientId, setModalConfirm, setNewAnketaState}) => {
    const [anim, setAnim] = useState(false);
    const [load, setLoad] = useState(false);
    const modalRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    }, []);

    const endLoad = () => {
        setTimeout(() => {
            setLoad(false);
            setNewAnketaState(confirmType);
            handleClose();
        }, 200);
    }

    const handleConfirm = () => {
        setLoad(true);
        if(confirmType == 'ok') {
            acceptAnketa(clientId)
            .then(res => {
                console.log(res);
                endLoad();
            })
            .catch(err => console.log(err));
            return
        }

        if(confirmType == 'reject') {
            rejectAnketa(clientId)
            .then(res => {
                console.log(res);
                endLoad();
            })
            .catch(err => console.log(err));
            return
        }

        if(confirmType == 'again') {
            retryAnketa(clientId)
            .then(res => {
                console.log(res);
                endLoad();
            })
            .catch(err => console.log(err));
            return
        }
        
    }

    const handleClose = () => {
        !load && setAnim(false);
        !load && setTimeout(() => {
            setModalConfirm(false)
        }, 200)
    }

    const closeModal = (e) => {
        e.stopPropagation()
        if (modalRef.current && !modalRef.current.contains(e.target) && !load) {
            handleClose();
        }
    }
    useEffect(() => {
        document.addEventListener('mouseup', closeModal);

        return () => document.removeEventListener('mouseup', closeModal);
    }, [load]);
    return (
        <div className={s.overlay}>
            <div ref={modalRef} className={`${s.modal} ${anim && s.modal_anim}`}>
                <div className={s.header}>
                    <h2>
                        {confirmType == 'again' && 'Повторное заполнение'}
                        {confirmType == 'reject' && 'Подтвердить отказ'}
                        {confirmType == 'ok' && 'Подтвердить одобрение'}
                    </h2>
                    <div onClick={handleClose}><IconClose /></div>
                </div>

                <p className={s.text}>
                    {confirmType == 'again' && 'Уверен, что хочешь отправить анкету на повторное заполнение клиентом?'}
                    {confirmType == 'reject' && 'Уверен, что хочешь отклонить анкету?'}
                    {confirmType == 'ok' && 'Подтверждаешь одобрение?'}
                </p>
                <button onClick={handleConfirm} className={s.button}><p>Подтвердить</p> {load && <LoaderButton/>}</button>
            </div>
        </div>
    )
};

export default ModalConfirm;