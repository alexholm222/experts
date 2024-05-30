import { useEffect, useRef, useState } from 'react';
import s from './WidgetWork.module.scss';
import { ReactComponent as IconCancel } from '../../image/work/widget/iconCancel.svg';
import { ReactComponent as IconPersonAdding } from '../../image/work/widget/IconPersonAdding.svg'; 
import { ReactComponent as IconBackForward } from '../../image/work/widget/iconBackForward.svg';
import { ReactComponent as IconCloseShot } from '../../image/work/widget/iconCloseShot.svg';
import { useDispatch } from 'react-redux';
//utils
import { timeNow } from '../../utils/dates';
//slice
import { setHeight } from '../../store/reducer/Widget/slice';

const ScreenShot = ({ el, handleDeleteScreen }) => {
    const [anim, setAnim] = useState(false);
    const [animDelete, setAnimDelete] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        }, 100)
    }, [el])

    const handleDelete = () => {
        setAnimDelete(true);
        setTimeout(() => {
            handleDeleteScreen(el.id)
        }, 200)  
    }

    return (
        <div key={el.id} className={`${s.shot} ${anim && s.shot_anim} ${animDelete && s.shot_delete}`}>
            <img src={el.file}></img>
            <div className={s.overlay}>
                <IconCloseShot onClick={handleDelete} />
            </div>
        </div>
    )
}



const WidgetWorkZoom = ({setWidget}) => {
    const [anim, setAnim] = useState(false);
    const [screenShots, setScreenShots] = useState([]);
    const dispatch = useDispatch();
    const textRef = useRef();
    console.log(screenShots)
    useEffect(() => {
        if (screenShots.length > 0) {
            dispatch(setHeight(436))
        } else {
            dispatch(setHeight(316))
        }
    }, [screenShots])


    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        }, 100)
    }, []);

    const handleDeleteScreen = (id) => {
        const newArray = screenShots.filter(el => el.id !== id);
        setScreenShots(newArray);
    }

    const handleBack = () => {
        setWidget('');
    }


    const handlePastImage = (e) => {
        const file = e.clipboardData.files[0]
        if (file && (file.type === "image/png" || file.type === "image/jpg" || file.type === "image/jpeg") && screenShots.length < 3) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                setScreenShots(prevState => [...prevState, { file: reader.result, id: timeNow(), size: file.size / 1048576 }]);
            };
        };
    }

    const handleOpenPlan = () => {
        setWidget('planZoom');
    }


    return (
        <div className={`${s.work} ${anim && s.work_anim}`}>
            <p className={s.title}>Работа по Zoom-встрече</p>
            <textarea onPaste={handlePastImage} ref={textRef} className={s.area} placeholder='Прикрепи скриншот со встречи (ctrl+v)'></textarea>
            <div className={`${s.screenshots} ${screenShots.length === 0 && s.screenshots_hiden}`}>
                {screenShots.map((el) => {
                    return <ScreenShot key={el.id} el={el} handleDeleteScreen={handleDeleteScreen}/>
                })}
            </div>
            <div className={s.buttons}>
                <button onClick={handleBack} className={s.button_second}><IconBackForward /> Назад</button>
                <button onClick={handleOpenPlan} style={{ width: '168px' }} className={`${s.button}`}>Далее</button>
            </div>

            <div className={s.container}>
                <button className={s.button_small}><p>Клиент отказался</p> <IconCancel /></button>
                <button className={s.button_small}><p>Передать клиента</p> <IconPersonAdding /></button>
            </div>
        </div>
    )
};

export default WidgetWorkZoom;
