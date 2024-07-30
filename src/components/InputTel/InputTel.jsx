import { useEffect, useState } from 'react';
import s from './InputTel.module.scss';
import InputMask from 'react-input-mask';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as IconDelete } from '../../image/iconDelete.svg';
//Api
import { deleteNumber, checkPhone } from '../../Api/Api';
//slice
import { setButtonHiden, setNumbersDefault, setClientMain, setNumbers, setDeleteNumber } from '../../store/reducer/Client/slice';
//selector
import { selectorClient } from '../../store/reducer/Client/selector';

const InputTel = ({ id, selectTel, setSelectTel, el, handleSave }) => {
    const [anim, setAnim] = useState(false);
    const [valueTel, setValueTel] = useState('7');
    const [telErr, setTelErr] = useState(true);
    const [error, setError] = useState(false)
    const [telAdded, setTelAdded] = useState(false);
    const dispatch = useDispatch();
    const client_numbers = useSelector(selectorClient).client_numbers;

    console.log(valueTel)

    useEffect(() => {
        const value = el === '' ? '7' : el;
        setValueTel(value)
    }, [el])

    useEffect(() => {
        client_numbers.includes(valueTel) ? setTelAdded(true) : setTelAdded(false)
    }, [client_numbers, valueTel]);

    useEffect(() => {
        valueTel?.length < 11 ? setTelErr(true) : setTelErr(false)
    }, [valueTel])

    const handleSelectTel = (e) => {
        const id = e.currentTarget.id;
        setSelectTel(id);
        dispatch(setClientMain(el));
    };

    const handleTel = (e) => {
        setError(false)
        const value = e.currentTarget.value;
        const regex = /[0-9]/g;
        const cleanValue = value?.match(regex)?.join('');
        value && setValueTel(cleanValue);
    }

    const handleAddTel = () => {
        const index = client_numbers.indexOf('');
                const array = [...client_numbers];

        checkPhone(valueTel)
            .then(res => {
                console.log(res);
               
                array.splice(index, 1, valueTel)
                dispatch(setNumbersDefault(array))
                dispatch(setButtonHiden(false))
            })
            .catch(err => {
                setTelErr(true)
                setError(true)
                console.log(err)
            })
    }

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    }, [])

    const handleDelete = () => {
        dispatch(deleteNumber(valueTel))
      /*   deleteNumber(valueTel)
            .then(res => {
                console.log(res)
                
            })
            .catch(err => console.log(err)) */
    }

    return (
        <div className={`${s.tel} ${error && s.tel_error} ${anim && s.tel_anim}`}>
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
          {/*   <div onClick={handleDelete} className={`${s.delete} ${selectTel == id && s.delete_hidden}`}>
                <IconDelete />
            </div> */}
            <button onClick={handleAddTel} className={`${s.button} ${(telErr || telAdded) && s.button_hiden}`}>Добавить</button>

            <div className={`${s.error} ${error && s.error_open}`}>
                <p>Номер телефона уже зарегистрирован</p>
            </div>
        </div>
    )
};

export default InputTel;