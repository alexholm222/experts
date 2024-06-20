import s from './ModalConfirm.module.scss';
import { ReactComponent as IconClose } from '../../../image/iconClose.svg';
import { useState, useEffect, useRef } from 'react';
//Api
import { cancelTraning } from '../../../Api/Api';
import LoaderButton from '../../LoaderButton/LoaderButton';

const ModalConfirm = ({ clientId, setModalCancel }) => {
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
            handleClose();
        }, 200);
    }

    const handleConfirm = () => {
        setLoad(true);
        cancelTraning(clientId)
            .then(res => {
                console.log(res)
                endLoad()
            })
            .catch(err => console.log(err))

    }

    const handleClose = () => {
        !load && setAnim(false);
        !load && setTimeout(() => {
            setModalCancel(false)
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
        <div className={`${s.overlay} ${anim && s.overlay_anim}`}>
            <div ref={modalRef} className={`${s.modal} ${anim && s.modal_anim}`}>
                <div className={s.header}>
                    <h2>
                        Отмена обучения
                    </h2>
                    <div onClick={handleClose}><IconClose /></div>
                </div>

                <p className={s.text}>
                    Уверен, что хочешь отменить обучение?
                </p>
                <button onClick={handleConfirm} className={s.button}><p>Подтвердить</p> {load && <LoaderButton />}</button>
            </div>
        </div>
    )
};

export default ModalConfirm;