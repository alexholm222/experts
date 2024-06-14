import s from './Anketa.module.scss';
import { useState, useEffect, useRef } from 'react';

const Anketa = () => {
    const [anim, setAnim] = useState(false);
    const modalRef = useRef();

    useEffect(() => {
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = "8px";
        return () => {
            document.body.style.overflow = "auto";
            document.body.style.paddingRight = "0";
        };
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    },[])


    function closeModal(e) {
        e.stopPropagation()
        if(modalRef.current && !modalRef.current.contains(e.target)) {
            setAnim(false);
 
        }
    }
    useEffect(() => {
        document.addEventListener('mouseup', closeModal);

        return () => document.removeEventListener('mouseup', closeModal);
    }, []);
    return (
        <div className={s.modal}>
             <div ref={modalRef} className={s.anketa}></div>
        </div>
    )
};

export default Anketa;