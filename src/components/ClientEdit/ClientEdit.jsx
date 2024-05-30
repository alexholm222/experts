import s from './ClientEdit.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as IconChewron } from '../../image/work/iconChewron.svg';
import { ReactComponent as IconPlus } from '../../image/work/iconPlus.svg';
//slice 

import { setNumbersDefault, setNumbers, setButtonHiden } from '../../store/reducer/Client/slice';
//selector
import { selectorClient } from '../../store/reducer/Client/selector';
//utils
import HandleCityList from '../../utils/cityList';
//component
import InputTel from '../InputTel/InputTel';

const cities = ['Новосибирск', 'Москва', 'Залупинск', 'Машонка', 'Краснодар', 'Сочи', 'Москва', 'Залупинск', 'Машонка', 'Краснодар', 'Сочи']

const ClientEdit = ({ handleOpenList, openList, setOpenList }) => {
    const [valueCity, setVlueCity] = useState('Новосибирск');
    const [citiesList, setCitiesList] = useState(['Новосибирск', 'Москва', 'Залупинск', 'Машонка', 'Краснодар', 'Сочи', 'Москва', 'Залупинск', 'Машонка', 'Краснодар', 'Сочи']);
    const [heightList, setHeightList] = useState(0);
    const [scrollList, setScrollList] = useState(false);
    const [selectTel, setSelectTel] = useState(1);
    const listRef = useRef();
    const buttonRef = useRef();
    const dispatch = useDispatch();
    const buttonAddHiden = useSelector(selectorClient).buttonHiden;
    const numbersTel = useSelector(selectorClient).numbers;

    const handleAddInput = () => {
        dispatch(setNumbers(''))
        dispatch(setButtonHiden(true))
    }

    const closeModal = (e) => {
        e.stopPropagation()
        if (listRef.current && !listRef.current.contains(e.target) && !buttonRef.current.contains(e.target)) {
            setOpenList(false);
        }
    }

    const handleInputCity = (e) => {
        setOpenList(true)
        const value = e.target.value;
        const citiesList = HandleCityList(value, cities);
        setVlueCity(value);
        setCitiesList(citiesList);
    }

    const handleSelectCity = (e) => {
        const city = e.target.textContent;
        setVlueCity(city);
        setOpenList(false)
    }

    useEffect(() => {
        setHeightList(citiesList.length * 38)
        if (citiesList.length == 0) {
            setOpenList(false)
        } else {
            setOpenList(true)
        }

        if (citiesList.length > 7) {
            setScrollList(true)
        } else {
            setScrollList(false)
        }
    }, [citiesList]);

    useEffect(() => {
       if(numbersTel.length > 4) {
        dispatch(setButtonHiden(true))
       }
    },[numbersTel])

    useEffect(() => {
        document.addEventListener('click', closeModal);
        return () => document.removeEventListener('click', closeModal);
    }, []);

    return (
        <div className={`${s.edit}`}>
            <p className={s.sub}>Город</p>
            <div className={`${s.block}`}>
                <div onClick={handleOpenList} ref={buttonRef} className={`${s.container_city} ${openList && citiesList.length > 0 && s.container_city_open}`}>
                    <input onChange={handleInputCity} placeholder='Город' value={valueCity || ''} type='text'></input>
                    <IconChewron />
                </div>
                <ul  style={{ height: `${heightList}px` }} ref={listRef} className={`${s.list} ${openList && s.list_open} ${scrollList && s.list_scroll}`}>
                    {citiesList?.map((el) => {
                        return <li onClick={handleSelectCity} className={s.item}>{el}</li>
                    })}
                </ul>
            </div>


            <p className={s.sub}>Номер телефона для чата</p>
            <div className={s.listTel}>
                {numbersTel.map((el, index) => {
                    return <InputTel id={index + 1} el={el} setSelectTel={setSelectTel} selectTel={selectTel} />
                })}
            </div>

            <button onClick={handleAddInput} className={`${s.button} ${s.button_add} ${buttonAddHiden && s.button_hiden}`}><IconPlus />Номер телефона</button>
            <button className={`${s.button} ${s.button_save}`}>Сохранить и закрыть</button>
        </div>
    )
};

export default ClientEdit;