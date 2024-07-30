import s from './CityPartners.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { ReactComponent as IconChewron } from '../../image/work/iconChewron.svg';
//API
import { getPartners } from '../../Api/Api';
//selector
import { selectorPartners } from '../../store/reducer/Partners/selector';
import { selectorApp } from '../../store/reducer/App/selector';
import { selectorWork } from '../../store/reducer/Work/selector';
import { selectorClient } from '../../store/reducer/Client/selector';
//slice
import { setLoadPartners } from '../../store/reducer/App/slice';
import { setOffices, setCompanies, setCompaniesNum } from '../../store/reducer/Partners/slice';
//components
import OfficeItem from './OfficeItem/OfficeItem';
import CompanyItem from './CompanyItem/CompanyItem';
import OfficeItemSceleton from './Skeletons/OfficeItemSceleton/OfficeItemSceleton';
import CompanyItemSceleton from './Skeletons/CompanyItemSceleton/CompanyItemSceleton';
//utils
import HandleCityList from '../../utils/cityList';

const CityPartners = () => {
    const loadPartners = useSelector(selectorApp).loadPartners;
    const offices = useSelector(selectorPartners).offices;
    const companies = Object.values(useSelector(selectorPartners)?.companies);
    const companiesNum = useSelector(selectorPartners).companiesNum;
    const cities = useSelector(selectorWork).cities;
    const client_city = useSelector(selectorClient).client_city;
    const [openOffice, setOpenOffice] = useState(0);
    const [openCompany, setOpenCompany] = useState(0);
    const [city, setCity] = useState('');
    const [cityValue, setCityValue] = useState(client_city || '');
    const [citiesList, setCitiesList] = useState([]);
    const [heightList, setHeightList] = useState(0);
    const [openList, setOpenList] = useState(false);
    const [scrollList, setScrollList] = useState(false);
    const dispatch = useDispatch();
    const listRef = useRef();
    const buttonRef = useRef();

    useEffect(() => {
        setCitiesList(cities)
    }, [cities]);

    useEffect(() => {
       /*  setCity(client_city); */
        setCityValue(client_city)
    }, [client_city])

    useEffect(() => {
        setHeightList(citiesList.length * 38)
        /*  if (citiesList.length == 0) {
             setOpenList(false)
         } else {
             setOpenList(true)
         } */

        if (citiesList.length > 7) {
            setScrollList(true)
        } else {
            setScrollList(false)
        }
    }, [citiesList]);

    //Получаем данные партнерских офисов
    useEffect(() => {
        city !== '' && setOpenList(false)
        city !== '' && dispatch(setLoadPartners(true))
        city !== '' && getPartners('', city)
            .then(res => {
                console.log(res)
                const data = res.data;
                const offices = data.partner_offices;
                const companies = data.companies_info.companies;
                const companiesNum = data.companies_info.total;
                //записываем информацию о партнерских оффисах и заказчиках
                dispatch(setOffices(offices));
                dispatch(setCompanies(companies));
                dispatch(setCompaniesNum(companiesNum));
                setTimeout(() => {
                    dispatch(setLoadPartners(false));
                }, 100);
            })
            .catch(err => console.log(err))
    }, [city]);

    useEffect(() => {
        document.addEventListener('click', closeModal);
        return () => document.removeEventListener('click', closeModal);
    }, []);

    const closeModal = (e) => {
        e.stopPropagation()
        if (listRef.current && !listRef.current.contains(e.target) && !buttonRef.current.contains(e.target)) {
            setOpenList(false);
        }
    }

    const handleOpenList = () => {
        if (openList) {
            setOpenList(false);
        } else {
            setOpenList(true);
            setCitiesList(cities)

        }
    }

    const handleInputCity = (e) => {
        setOpenList(true)
        const value = e.target.value;
        const citiesList = HandleCityList(value, cities);
        setCityValue(value);
        setCitiesList(citiesList);
    }

    const handleSelectCity = (e) => {
        const city = e.target.textContent;
        setCity(city);
        setCityValue(city)
        setOpenList(false);
    }

    console.log(offices)
    return (
        <div style={{ height: loadPartners ? '468px' : '', overflow: loadPartners ? 'hidden' : ''}} className={s.window}>

            <div className={s.header}>
                <h3>Аналитика по городу</h3>
                <div className={`${s.block_city}`}>
                    <div onClick={handleOpenList} ref={buttonRef}
                        className={`${s.container_city} ${openList && citiesList.length > 0 && s.container_city_open}`}>
                        <input onChange={handleInputCity} placeholder='Город' value={cityValue || ''} type='text'></input>
                        <IconChewron />
                    </div>
                    <ul style={{ height: `${heightList}px` }} ref={listRef} className={`${s.list_city} ${openList && s.list_city_open} ${scrollList && s.list_city_scroll}`}>
                        {citiesList?.map((el) => {
                            return <li key={el.id} onClick={handleSelectCity} className={s.item_city}>{el.name}</li>
                        })}
                    </ul>
                </div>
            </div>



            <div className={s.container}>
                <div className={s.block}>
                    <h2 className={s.title}>Партнерские офисы <sup>{offices.length}</sup></h2>
                    <ul className={s.list}>
                        {offices.map((el) => {
                            return <OfficeItem key={el.id} office={el} openOffice={openOffice} setOpenOffice={setOpenOffice} />
                        })
                        }
                    </ul>

                    <ul className={`${s.list} ${s.list_sceleton} ${!loadPartners && s.list_sceleton_hiden}`}>
                        {[...Array(4)].map((el, i) => {
                            return <OfficeItemSceleton key={i} loadPartners={loadPartners}/>
                        })}
                    </ul>
                </div>
                <div style={{height: loadPartners ? '414px' : ''}} className={s.block}>
                    <h2 className={s.title}>Заказчики <sup>{companiesNum}</sup></h2>
                    <ul className={s.list}>
                        {companies?.map((el) => {
                            return <CompanyItem key={el.id} company={el} openCompany={openCompany} setOpenCompany={setOpenCompany} />
                        })
                        }
                    </ul>

                    <ul className={`${s.list} ${s.list_sceleton} ${!loadPartners && s.list_sceleton_hiden}`}>
                        {[...Array(4)].map((el, i) => {
                            return <CompanyItemSceleton key={i} loadPartners={loadPartners}/>
                        })}
                    </ul>
                </div>
            </div>

        </div>
    )
};

export default CityPartners;