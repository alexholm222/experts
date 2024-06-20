import s from './CityPartners.module.scss';
import { useSelector } from 'react-redux';
//selector
import { selectorPartners } from '../../store/reducer/Partners/selector';
//components
import OfficeItem from './OfficeItem/OfficeItem';
import CompanyItem from './CompanyItem/CompanyItem';
import { useState } from 'react';

const CityPartners = () => {
    const offices = useSelector(selectorPartners).offices;
    const companies = Object.values(useSelector(selectorPartners)?.companies);
    const [openOffice, setOpenOffice] = useState(0);
    const [openCompany, setOpenCompany] = useState(0);

    console.log(offices, companies)
    return (
        <div className={s.container}>
            <div className={s.block}>
                <h2 className={s.title}>Партнерские офисы <sup>{offices.length}</sup></h2>
                <ul className={s.list}>
                    {offices.map((el) => {
                        return el.office_adress !== '' && <OfficeItem key={el.id} office={el} openOffice={openOffice} setOpenOffice={setOpenOffice}/>
                    })
                    }
                </ul>
            </div>
            <div className={s.block}>
                <h2 className={s.title}>Заказчики <sup>{companies.length}</sup></h2>
                <ul className={s.list}>
                    {companies?.map((el) => {
                        return <CompanyItem key={el.id} company={el} openCompany={openCompany} setOpenCompany={setOpenCompany}/>
                    })
                    }
                </ul>
            </div>
        </div>
    )
};

export default CityPartners;