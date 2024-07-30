import s from './CompanyItem.module.scss';
import { ReactComponent as IconChewron } from '../../../image/clients/iconChewron.svg';
import { ReactComponent as IconWeb } from '../../../image/work/iconWeb.svg';
import { useEffect, useState } from 'react';
//api 
import { handleOkved, handleInnInfo } from '../../../Api/ApiDaData';
import logoDefault from '../../../image/work/logoDefault.png';

const CompanyItem = ({ company, openCompany, setOpenCompany }) => {
    const [okved, setOkved] = useState('');
    const [site, setSite] = useState('');

    useEffect(() => {
        company?.okved !== '' && handleOkved(company?.okved)
            .then(res => {
                const data = res.data?.suggestions?.[0].value;
                setOkved(data)
            })
            .catch(err => console.log(err))
    }, [company])

    const handleOpen = (e) => {
        const id = e.currentTarget.id;
        company.id == openCompany ? setOpenCompany(0) : setOpenCompany(id)
    }



    return (
        <div className={`${s.container} ${company.id == openCompany && s.container_open}`}>
            <div id={company.id} onClick={handleOpen} className={s.header}>
                <div className={s.logo}>
                    <img src={company?.description?.logo == '' ? logoDefault : `https://lk.skilla.ru/images/companies/logo/${company?.description?.logo}`}></img>
                </div>

                    <p>{company?.name}</p>
                  

                <div className={`${s.arrow} ${company.id == openCompany && s.arrow_open}`}>
                    <IconChewron />
                </div>
            </div>

            <div className={s.content}>
                <div className={s.block}>
                    <div>
                        <p className={s.text_bold}>{company?.name}</p>
                        <p className={s.text_small}>ИНН {company?.inn}</p>
                    </div>

                     {site !== '' && <a><p>Web-сайт</p> <IconWeb /></a>}
                </div>
                <div>
                    <p className={s.sub}>О компании</p>
                    <p className={s.text}>{company?.description?.description}</p>
                </div>

                {company?.okved !== '' && <div>
                    <p className={s.sub}>ОКВЭД</p>
                    <p className={s.text}>{company?.okved} «{okved}».</p>
                </div>
                }
            </div>

        </div>
    )
};

export default CompanyItem;