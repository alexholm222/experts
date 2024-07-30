import s from './OfficeItem.module.scss';
import { ReactComponent as IconChewron } from '../../../image/clients/iconChewron.svg';
import { ReactComponent as IconAttach } from '../../../image/work/IconAttach.svg';
import { useEffect, useState } from 'react';
import Fancybox from "../../../utils/Fancybox";
//utils
import { handleDatePartnerOffice } from '../../../utils/dates';
import { addSpaceNumber } from '../../../utils/addSpaceNumber';
import logoDefault from '../../../image/work/logoDefault.png';

const Company = ({ el }) => {
    const [tooltip, setTooltip] = useState(false);

    const handleOpenTooltip = () => {
        setTooltip(true)
    }

    const handleCloseTooltip = () => {
        setTooltip(false)
    }
    return (<div onMouseEnter={handleOpenTooltip} onMouseLeave={handleCloseTooltip} className={`${s.logo} ${s.logo_2}`}>
        <img src={el?.description?.logo !== '' ? `https://lk.skilla.ru/images/companies/logo/${el?.description?.logo}` : logoDefault}></img>
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
    const [tooltip, setTooltip] = useState(false);

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

    const handleOpenTooltip = () => {
        setTooltip(true)
    }

    const handleCloseTooltip = () => {
        setTooltip(false)
    }



    return (
        <div id={office.id} className={`${s.container} ${office.id == openOffice && s.container_open}`}>
            <div id={office.id} onClick={handleOpen} className={s.header}>
                <div className={s.logo} onMouseEnter={handleOpenTooltip} onMouseLeave={handleCloseTooltip}>
                    <img src={office?.brand_type !== 0 && office?.brand_type !== 5 ? `https://lk.skilla.ru/documents/brands/${office?.brand_type}/ico.png` : logoDefault}></img>
                    <div className={`${s.tooltip} ${s.tooltip_2} ${tooltip && s.tooltip_open}`}>
                        {office.unoficial_name}
                    </div>
                </div>
                <div className={s.adress}>
                    <p>{office.name}</p>
                    <span>с {handleDatePartnerOffice(office.start_month)} {office.start_year}</span>
                </div>
                <div className={`${s.arrow} ${office.id == openOffice && s.arrow_open}`}>
                    <IconChewron />
                </div>
            </div>

            <div className={s.content}>

                {office?.office_adress !== '' && <div className={s.block}>
                    <p className={s.sub}>Адрес офиса</p>
                    <p className={s.text}>{office?.office_adress}</p>
                </div>
                }
                <div className={s.block}>
                    <div className={s.block_sub}>
                        <p className={s.sub}>Данные партнера</p>
                        {/* <a><p>Кейс на skilla.ru</p> <IconAttach /></a> */}
                    </div>
                    <p className={s.text}>{office.signature}</p>
                    <p className={s.text}>{office.name} <br></br><span className={s.text_small}>ИНН {office.inn}</span></p>
                    {office.additionals.map((el) => {
                        return <p className={s.text}>{el.name}<br></br><span className={s.text_small}>ИНН {el.inn}</span></p>
                    })}
                </div>
                {office?.companies?.length > 0 && <div className={s.block}>
                    <p className={s.sub}>Крупнейшие заказчики</p>
                    <ul className={`${s.list} ${s.list_company}`}>
                        {company.map((el) => {
                            return <Company el={el} />
                        })}
                    </ul>
                </div>
                }

                <div className={s.block}>
                    <p className={s.sub}>Выручка</p>
                    <p className={s.text}>{addSpaceNumber(office?.revenue?.last_quarter)} ₽ за квартал</p>
                    <p className={s.text}>{addSpaceNumber(office?.revenue?.last_year)} ₽ за 2023 год</p>

                </div>

                <div className={s.block}>
                    <p className={s.sub}>Клиентская база</p>
                    <p className={s.text}>{office?.customer_base?.companies} Заказчиков</p>
                    <p className={s.text}>{office?.customer_base?.workers} Исполнителей</p>
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