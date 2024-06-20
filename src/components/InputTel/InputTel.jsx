import { useEffect, useState } from 'react';
import s from './InputTel.module.scss';
import InputMask from 'react-input-mask';
import { useDispatch, useSelector } from 'react-redux';
//slice
import { setButtonHiden, setNumbersDefault, setClientMain } from '../../store/reducer/Client/slice';
//selector
import { selectorClient } from '../../store/reducer/Client/selector';

const InputTel = ({ id, selectTel, setSelectTel, el }) => {
    const [anim, setAnim] = useState(false);
    const [valueTel, setValueTel] = useState(el === '' ? '7' : el);
    const [telErr, setTelErr] = useState(true);
    const [telAdded, setTelAdded] = useState(false);
    const dispatch = useDispatch();
    const client_numbers = useSelector(selectorClient).client_numbers;

    useEffect(() => {
        client_numbers.includes(valueTel) ? setTelAdded(true) : setTelAdded(false)
    }, [client_numbers]);

    useEffect(() => {
        valueTel?.length < 11 ? setTelErr(true) : setTelErr(false)
    },[valueTel])

    const handleSelectTel = (e) => {
        const id = e.currentTarget.id;
        setSelectTel(id);
        dispatch(setClientMain(el));
    };

    const handleTel = (e) => {
        const value = e.currentTarget.value;
        const regex = /[0-9]/g;
        const cleanValue = value?.match(regex)?.join('');
        console.log(cleanValue)
        value && setValueTel(cleanValue);
    }

    const handleAddTel = () => {
        const index = client_numbers.indexOf('');
        const array = [...client_numbers];
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
                <InputMask disabled={telAdded ? true : false} mask="+7 (999)-999-99-99" onChange={handleTel} value={valueTel || ''}>
                    {() => <input
                        type="tel"
                        placeholder="+7 (___)-___-__-__"
                    />}
                </InputMask>
            </div>

            <button onClick={handleAddTel} className={`${s.button} ${(telErr || telAdded) && s.button_hiden}`}>Добавить</button>
        </div>
    )
};

export default InputTel;