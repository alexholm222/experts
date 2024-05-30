import { useEffect, useState } from 'react';
import s from './InputTel.module.scss';
import InputMask from 'react-input-mask';
import { useDispatch, useSelector } from 'react-redux';
//slice
import { setButtonHiden, setNumbersDefault } from '../../store/reducer/Client/slice';
//selector
import { selectorClient } from '../../store/reducer/Client/selector';

const InputTel = ({ id, selectTel, setSelectTel, el }) => {
    const [anim, setAnim] = useState(false);
    const [valueTel, setValueTel] = useState(el === '' ? '7' : el);
    const [telErr, setTelErr] = useState(true);
    const [telAdded, setTelAdded] = useState(false);
    const dispatch = useDispatch();
    const numbers = useSelector(selectorClient).numbers;

    useEffect(() => {
        numbers.includes(valueTel) ? setTelAdded(true) : setTelAdded(false)
    }, [numbers]);

    useEffect(() => {
        valueTel?.length < 11 ? setTelErr(true) : setTelErr(false)
    },[valueTel])

    const handleSelectTel = (e) => {
        const id = e.currentTarget.id;
        setSelectTel(id)
    };

    const handleTel = (e) => {
        const value = e.currentTarget.value;
        const regex = /[0-9]/g;
        const cleanValue = value?.match(regex)?.join('');
        console.log(cleanValue)
        value && setValueTel(cleanValue);
    }

    const handleAddTel = () => {
        const index = numbers.indexOf('');
        const array = [...numbers];
        array.splice(index, 1, valueTel)
        dispatch(setNumbersDefault(array))
        dispatch(setButtonHiden(false))
    }

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    }, [])

    return (
        <div className={`${s.tel} ${anim && s.tel_anim}`}>
            <div id={id} onClick={handleSelectTel} className={`${s.block} ${telAdded && s.block_hiden}`}>
                <div className={`${s.radio}  ${selectTel % 2 == 0 && s.radio_2} ${selectTel == id && s.radio_active}`}>
                    <div></div>
                </div>
            </div>
            <div className={`${s.input} ${telAdded && s.input_disabled}`}>
                <InputMask disabled={telAdded ? true : false} mask="+7 (999)-999-9999" onChange={handleTel} value={valueTel || ''}>
                    {() => <input
                        type="tel"
                        placeholder="+7 (___)-___-____"
                    />}
                </InputMask>
            </div>

            <button onClick={handleAddTel} className={`${s.button} ${(telErr || telAdded) && s.button_hiden}`}>Добавить</button>
        </div>
    )
};

export default InputTel;