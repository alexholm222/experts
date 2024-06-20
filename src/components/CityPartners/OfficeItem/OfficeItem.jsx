import s from './OfficeItem.module.scss';
import { ReactComponent as IconChewron } from '../../../image/clients/iconChewron.svg';
import { ReactComponent as IconAttach } from '../../../image/work/IconAttach.svg';
import { useEffect, useState } from 'react';
import Fancybox from "../../../utils/Fancybox";
//utils
import { handleDatePartnerOffice } from '../../../utils/dates';

const Company = ({ el }) => {
    const [tooltip, setTooltip] = useState(false);

    const handleOpenTooltip = () => {
        setTooltip(true)
    }

    const handleCloseTooltip = () => {
        setTooltip(false)
    }
    return (<div onMouseEnter={handleOpenTooltip} onMouseLeave={handleCloseTooltip} className={`${s.logo} ${s.logo_2}`}>
            <img src={`https://lk.skilla.ru/images/companies/logo/${el?.description?.logo}`}></img>
            {<div className={`${s.tooltip} ${tooltip && s.tooltip_open}`}>
                {el.name}
            </div>
            }
        </div>

    )
}

const OfficeItem = ({ office, openOffice, setOpenOffice }) => {
    const [officePhoto, setOfficePhoto] = useState([]);
    const [company, setCompany] = useState([]);

    useEffect(() => {
        const filterCompany = office?.companies.filter(el => el.description?.logo !== '')
        setCompany(filterCompany.slice(0, 4)) 
    }, [office])
    

    useEffect(() => {
        const photo = [office?.office_photo_1, office?.office_photo_2, office?.office_photo_3];
        const filterPhoto = photo.filter(el => el !== null);
        setOfficePhoto(filterPhoto)

    }, [office]);


    const handleOpen = (e) => {
        const id = e.currentTarget.id;
        office.id == openOffice ? setOpenOffice(0) : setOpenOffice(id)
    }

  

    return (
        <div id={office.id} className={`${s.container} ${office.id == openOffice && s.container_open}`}>
            <div id={office.id} onClick={handleOpen} className={s.header}>
                <div className={s.logo}>
                    <img src={`https://lk.skilla.ru/documents/brands/${office?.brand_type}/ico.png`}></img>
                </div>
                <div className={s.adress}>
                    <p>{office?.office_adress}</p>
                    <span>с {handleDatePartnerOffice(office.start_month)} {office.start_year}</span>
                </div>
                <div className={`${s.arrow} ${office.id == openOffice && s.arrow_open}`}>
                    <IconChewron />
                </div>
            </div>

            <div className={s.content}>
                <div className={s.block}>
                    <div className={s.block_sub}>
                        <p className={s.sub}>Данные партнера</p>
                        {/* <a><p>Кейс на skilla.ru</p> <IconAttach /></a> */}
                    </div>
                    <p className={s.text}>{office.signature}</p>
                    <p className={s.text}>{office.name} ИНН {office.inn}</p>
                </div>
                {office?.companies?.length > 0 && <div className={s.block}>
                    <p className={s.sub}>Ключевые заказчики</p>
                    <ul className={`${s.list} ${s.list_company}`}>
                        {company.map((el) => {
                            return <Company el={el}/>
                        })}
                    </ul>
                </div>
                }

                <div className={s.block}>
                    <p className={s.sub}>Выручка</p>
                    <p className={s.text}>{office.signature}</p>
                </div>

                <div className={s.block}>
                    <p className={s.sub}>Клиентская база</p>
                    <p className={s.text}>{office.signature}</p>
                </div>

                {officePhoto.length > 0 && <div className={s.block}>
                    <p className={s.sub}>Фото офиса</p>
                    <div className={s.block}>
                        <ul className={s.list}>
                            <Fancybox>
                                {officePhoto.map((el, i) => {
                                    return <div key={i} className={s.photo}>
                                        <a
                                            className={s.photo}
                                            data-fancybox={`gallery_${office.inn}`}
                                            href={`https://lk.skilla.ru/${el}`}>
                                            <img src={`https://lk.skilla.ru/${el}`} alt="изображение" />
                                        </a>
                                    </div>
                                })}
                            </Fancybox>
                        </ul>

                    </div>
                </div>
                }

                {office.fr_comment !== '' && <div className={s.block}>
                    <p className={s.sub}>Комментарий</p>
                    <p className={s.text}>{office.fr_comment}</p>
                </div>
                }

            </div>

        </div>
    )
};

export default OfficeItem;