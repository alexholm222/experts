import s from './HandOverClient.module.scss';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as IconBackForward } from '../../image/work/widget/iconBackForward.svg';
//Api
import { transferClient } from '../../Api/Api';
//slice
import { setHeight } from '../../store/reducer/Widget/slice';
//selector
import { selectorClient } from '../../store/reducer/Client/selector';

import LoaderButton from '../../components/LoaderButton/LoaderButton';

const HandOverWidget = ({setWidget, prevWidget, setEndType}) => {
    const client_id = useSelector(selectorClient).client_id;
    const [anim, setAnim] = useState(false);
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            setAnim(true);
            dispatch(setHeight(208));
        })
    }, []);


    const handleBack = () => {
        setWidget(prevWidget)
    }

    const handleTransferClient = () => {
        setLoader(true)
        transferClient({id: client_id, manager: 3686})
        .then(res => {
            console.log(res);
            setWidget('end');
            setEndType('handOver');
            setLoader(false)
        })
        .catch(err => console.log(err))
       
    }


    return (
        <div className={`${s.modal} ${anim && s.modal_anim}`}>
            <h3>Передать руководителю</h3>
            <div  className={s.expert}>
                <div className={s.block}>
               
                    <p className={s.name}>{'Анна Шуляк'}</p>
                </div>

             

    
            </div>
            <div className={s.buttons}>
                <button onClick={handleBack} className={s.button_second}><IconBackForward /> Назад</button>
                <button onClick={handleTransferClient} className={s.button}><p>Передать клиента</p>{loader && <LoaderButton color={'#fff'} />}</button>
            </div>
        </div>
    )
};

export default HandOverWidget;