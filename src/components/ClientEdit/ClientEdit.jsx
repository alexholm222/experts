import s from './ClientEdit.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as IconChewron } from '../../image/work/iconChewron.svg';
import { ReactComponent as IconPlus } from '../../image/work/iconPlus.svg';
//api
import { editClient } from '../../Api/Api';
//slice 
import { setNumbersDefault, setNumbers, setButtonHiden, setClientCity, setClientUpdate } from '../../store/reducer/Client/slice';
//selector
import { selectorClient } from '../../store/reducer/Client/selector';
import { selectorWork } from '../../store/reducer/Work/selector';
//utils
import HandleCityList from '../../utils/cityList';
//component
import InputTel from '../InputTel/InputTel';
import LoaderButton from '../LoaderButton/LoaderButton';

const ClientEdit = ({ handleOpenList, openList, setOpenList, setEditOpen, stage }) => {
    const buttonAddHiden = useSelector(selectorClient).buttonHiden;
    const client_numbers = useSelector(selectorClient).client_numbers;
    const client_main_number = useSelector(selectorClient).client_main_number;
    const client_city = useSelector(selectorClient).client_city;
    const client_id = useSelector(selectorClient).client_id;
    const client_name = useSelector(selectorClient).client_name;
    const client_surname = useSelector(selectorClient).client_surname;
    const cities = useSelector(selectorWork).cities;
    const [valueCity, setVlueCity] = useState('');
    const [citiesList, setCitiesList] = useState([]);
    const [heightList, setHeightList] = useState(0);
    const [scrollList, setScrollList] = useState(false);
    const [selectTel, setSelectTel] = useState(1);
    const [load, setLoad] = useState(false);
    const listRef = useRef();
    const buttonRef = useRef();
    const dispatch = useDispatch();


    useEffect(() => {
        setCitiesList(cities)
    }, [cities]);

    useEffect(() => {
        setVlueCity(client_city)
    }, [client_city])

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
        if (client_numbers.length > 2) {
            dispatch(setButtonHiden(true))
        }
    }, [client_numbers])

    useEffect(() => {
        document.addEventListener('click', closeModal);
        return () => document.removeEventListener('click', closeModal);
    }, []);



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
        setOpenList(false);
    }

    const handleSave = () => {
        const phones = client_numbers.filter(el => el !== client_main_number);
        console.log(phones)
        setLoad(true)
        const data = {
            id: client_id,
            name: client_name,
            surname: client_surname,
            city: valueCity,
            phone: client_main_number,
            phone2: phones[0] ? phones[0] : '',
            phone3: phones[1] ? phones[1] : '',
        }
        console.log(data)
        editClient(data)
            .then(res => {
                console.log(res);

                setTimeout(() => {
                    setLoad(false);
                }, 200)

                setTimeout(() => {
                    setEditOpen(false);
                }, 400)
            })
            .catch(err => console.log(err))
        dispatch(setClientCity(valueCity));
    }



    return (
        <div className={`${s.edit}`}>
            <p className={s.sub}>Город</p>
            <div className={`${s.block}`}>
                <div onClick={handleOpenList} ref={buttonRef}
                    className={`${s.container_city} ${(stage == 'finishAnketa' || stage == 'signContract' || stage == 'prepaid' || stage == 'ReqTraining' || stage == 'finishTraining' || stage == 'access') && s.container_city_dis} ${openList && citiesList.length > 0 && s.container_city_open}`}>
                    <input onChange={handleInputCity} placeholder='Город' value={valueCity || ''} type='text'></input>
                    <IconChewron />
                </div>
                <ul style={{ height: `${heightList}px` }} ref={listRef} className={`${s.list} ${openList && s.list_open} ${scrollList && s.list_scroll}`}>
                    {citiesList?.map((el) => {
                        return <li key={el.id} onClick={handleSelectCity} className={s.item}>{el.name}</li>
                    })}
                </ul>
            </div>


            <p className={s.sub}>Номер телефона для чата</p>
            <div className={s.listTel}>
                {client_numbers.map((el, index) => {
                    return <InputTel key={index} id={index + 1} el={el} setSelectTel={setSelectTel} selectTel={selectTel} />
                })}
            </div>

           {/*  <button onClick={handleAddInput} className={`${s.button} ${s.button_add} ${buttonAddHiden && s.button_hiden}`}><IconPlus />Номер телефона</button> */}
            <button style={{marginTop: '20px'}} onClick={handleSave} className={`${s.button} ${s.button_save}`}><p>Сохранить и закрыть</p> {load && <LoaderButton color={'#ffff'} />}</button>
        </div>
    )
};

export default ClientEdit;