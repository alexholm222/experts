import s from './Anketa.module.scss';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as IconClose } from '../../image/iconClose.svg';
import { ReactComponent as IconUpdate } from '../../image/work/widget/iconUpdate.svg';
//slice
import { setAnketaOpen } from '../../store/reducer/Work/slice';
//selector
import { selectorWork } from '../../store/reducer/Work/selector';
import { selectorClient } from '../../store/reducer/Client/selector';
//utils
import { handleDateFormat } from '../../utils/dates';
//components
import ModalConfirm from './ModalConfirm/ModalConfirm';

const Anketa = () => {
    const client_id = useSelector(selectorClient).client_id;
    const [anim, setAnim] = useState(false);
    const [modalConfirm, setModalConfirm] = useState(false);
    const [confirmType, setConfirmType] = useState('');
    const [newAnketaState, setNewAnketaState] = useState('');
    const anketa = useSelector(selectorWork)?.anketaForm;
    const stageRoad = useSelector(selectorClient).stage;
    const answers = JSON.parse(anketa?.answers)[0];
    const dispatch = useDispatch();
    const modalRef = useRef();
    console.log(anketa, answers)


    useEffect(() => {
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = "8px";
        return () => {
            document.body.style.overflow = "auto";
            document.body.style.paddingRight = "0";
        };
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    }, [])

    const handleClose = () => {
        setAnim(false);
        setTimeout(() => {
            dispatch(setAnketaOpen(false))
        }, 200)
    }

    const handleOpenConfirm = (e) => {
        const id = e.currentTarget.id;
        setConfirmType(id);
        setModalConfirm(true);
    }


    const closeModal = (e) => {
        e.stopPropagation()
        if (modalRef.current && !modalRef.current.contains(e.target) && !modalConfirm) {
            handleClose();
        }
    }
    useEffect(() => {
        document.addEventListener('mouseup', closeModal);

        return () => document.removeEventListener('mouseup', closeModal);
    }, [modalConfirm]);
    return (
        <div className={`${s.overlay} ${anim && s.overlay_anim}`}>
            <div ref={modalRef} className={`${s.anketa} ${anim && s.anketa_anim}`}>
                <div className={s.header}>
                    <h2 className={s.title}>Анкета партнера</h2>
                    <div onClick={handleClose} className={s.icon_close}><IconClose /></div>
                </div>
                <div className={s.container}>
                    <div className={s.persondata}>
                        <div className={s.block}>
                            <span>ФИО</span>
                            <p>{anketa.surname} {anketa.name} {anketa.middlename}</p>
                        </div>

                        <div className={s.block}>
                            <span>Документ</span>
                            <p>{anketa.passport_s} {anketa.passport_n}</p>
                        </div>

                        <div className={s.block}>
                            <span>Выдан</span>
                            <p>{handleDateFormat(anketa.passport_date)} {anketa.passport_kem} {anketa.passport_kp}</p>
                        </div>

                        <div className={s.block}>
                            <span>Дата рождения</span>
                            <p>{answers['Дата рождения']}</p>
                        </div>

                        <div className={s.block}>
                            <span>Место рождения</span>
                            <p>{anketa.hb_address}</p>
                        </div>

                        <div className={s.block}>
                            <span>Адрес регистрации</span>
                            <p>{anketa.address}</p>
                        </div>

                        <div className={s.block}>
                            <span>Образование</span>
                            <p>{answers['Образование']}</p>
                        </div>

                    </div>
                    <div className={s.answers}>
                        <div className={s.block}>
                            <span>В какой сфере есть предпринимательский опыт (если есть), ваша роль в своем бизнесе?</span>
                            <p>{answers['В какой сфере есть предпринимательский опыт (если есть), ваша роль в своем бизнесе?']}</p>
                        </div>

                        <div className={s.block}>
                            <span>Ваши действия в случае, если вы получили жалобу от клиента на качество конечного продукта вашей компании</span>
                            <p>{answers['Ваши действия в случае, если вы получили жалобу от клиента на качество конечного продукта вашей компании']}</p>
                        </div>

                        <div className={s.block}>
                            <span>Вы понимаете, что партнерство со Skilla - это бизнес, предпринимательство, а не работа по найму?</span>
                            <p>{answers['Вы понимаете, что партнерство со Skilla - это бизнес, предпринимательство, а не работа по найму?']}</p>
                        </div>

                        <div className={s.block}>
                            <span>Главная причина вашего интереса к бизнесу со Skilla?</span>
                            <p>{answers['Главная причина вашего интереса к бизнесу со Skilla?']}</p>
                        </div>

                        <div className={s.block}>
                            <span>Деньги инвестора млн руб.</span>
                            <p>{answers['Деньги инвестора млн руб']}</p>
                        </div>

                        {answers['Есть ли на данный момент успешный (приносящий доход) собственный бизнес? (Свой вариант)'] !== '' && <div className={s.block}>
                            <span>Есть ли на данный момент успешный (приносящий доход) собственный бизнес?</span>
                            <p>{answers['Есть ли на данный момент успешный (приносящий доход) собственный бизнес? (Свой вариант)']}</p>
                        </div>
                        }

                        {answers['Есть ли на данный момент успешный (приносящий доход) собственный бизнес?'] !== 'Свой вариант' && <div className={s.block}>
                            <span>Есть ли на данный момент успешный (приносящий доход) собственный бизнес?</span>
                            <p>{answers['Есть ли на данный момент успешный (приносящий доход) собственный бизнес?']}</p>
                        </div>
                        }

                        {answers['Есть ли у вас опыт работы по франшизе, лицензионному договору или дилерскому договору? (Свой вариант)'] !== '' && <div className={s.block}>
                            <span>Есть ли у вас опыт работы по франшизе, лицензионному договору или дилерскому договору?</span>
                            <p>{answers['Есть ли у вас опыт работы по франшизе, лицензионному договору или дилерскому договору? (Свой вариант)']}</p>
                        </div>
                        }

                        {answers['Есть ли у вас опыт работы по франшизе, лицензионному договору или дилерскому договору?'] !== 'Свой вариант' && <div className={s.block}>
                            <span>Есть ли у вас опыт работы по франшизе, лицензионному договору или дилерскому договору?</span>
                            <p>{answers['Есть ли у вас опыт работы по франшизе, лицензионному договору или дилерскому договору?']}</p>
                        </div>
                        }

                        <div className={s.block}>
                            <span>Есть ли у вас уже команда для реализации этого проекта?</span>
                            <p>{answers['Есть ли у вас уже команда для реализации этого проекта?']}</p>
                        </div>

                        <div className={s.block}>
                            <span>Есть опыт работы в It-компаниях?</span>
                            <p>{answers['Есть опыт работы в It-компаниях?']}</p>
                        </div>

                        <div className={s.block}>
                            <span>Есть предпринимательский опыт?</span>
                            <p>{answers['Есть предпринимательский опыт?']}</p>
                        </div>

                        <div className={s.block}>
                            <span>Есть решение управляющей (головной) компании, которое вы считаете глупым?</span>
                            <p>{answers['Есть решение управляющей (головной) компании, которое вы считаете глупым?']}</p>
                        </div>

                        <div className={s.block}>
                            <span>Какой срок окупаемости вкладываемых средств в проект вы ожидаете?</span>
                            <p>{answers['Какой срок окупаемости вкладываемых средств в проект вы ожидаете?']}</p>
                        </div>

                        <div className={s.block}>
                            <span>Какую роль вы отводите себе в проекте со Skilla?</span>
                            <p>{answers['Какую роль вы отводите себе в проекте со Skilla?']}</p>
                        </div>

                        <div className={s.block}>
                            <span>Какую сумму средств, в случае непредвиденных расходов, вы дополнительно готовы вложить в данный бизнес млн руб ?</span>
                            <p>{answers['Какую сумму средств, в случае непредвиденных расходов, вы дополнительно готовы вложить в данный бизнес млн руб ?']}</p>
                        </div>

                        <div className={s.block}>
                            <span>Кредитные млн руб</span>
                            <p>{answers['Кредитные млн руб']}</p>
                        </div>

                        <div className={s.block}>
                            <span>Личные средства млн руб на текущий момент</span>
                            <p>{answers['Личные средства млн руб на текущий момент']}</p>
                        </div>

                        <div className={s.block}>
                            <span>Опыт работы на руководящих должностях</span>
                            <p>{answers['Опыт работы на руководящих должностях']}</p>
                        </div>

                        {answers['Расскажите о вашей карьере за последние 5 лет (Свой вариант)'] !== '' && <div className={s.block}>
                            <span>Расскажите о вашей карьере за последние 5 лет</span>
                            <p>{answers['Расскажите о вашей карьере за последние 5 лет (Свой вариант)']}</p>
                        </div>
                        }


                        {answers['Расскажите о вашей карьере за последние 5 лет']?.length > 0 && <div className={s.block}>
                            <span>Расскажите о вашей карьере за последние 5 лет</span>
                            <p>{answers['Расскажите о вашей карьере за последние 5 лет']}</p>
                        </div>
                        }

                        <div className={s.block}>
                            <span>Укажите свои сильные стороны, которые, как вам кажется, помогут в этом проекте</span>
                            <p>{answers['Укажите свои сильные стороны, которые, как вам кажется, помогут в этом проекте']}</p>
                        </div>

                        {answers['Что-нибудь хотите еще добавить?'] !== '' && <div className={s.block}>
                            <span>Что-нибудь хотите еще добавить?</span>
                            <p>{answers['Что-нибудь хотите еще добавить?']}</p>
                        </div>
                        }
                    </div>
                </div>
                { <div className={`${s.buttons} ${(stageRoad !== 'sendAnketa' || newAnketaState !== '') && s.buttons_hiden}`}>
                    <button onClick={handleOpenConfirm} id='again' className={s.button_again}>Заполнить заново <IconUpdate /></button>
                    <div className={s.buttons_right}>
                        <button onClick={handleOpenConfirm} id='reject' className={`${s.button} ${s.button_reject}`}>Отклонить</button>
                        <button onClick={handleOpenConfirm} id='ok' className={s.button}>Одобрить анкету</button>
                    </div>
                </div>}
                {modalConfirm && <ModalConfirm confirmType={confirmType} setModalConfirm={setModalConfirm} setNewAnketaState={setNewAnketaState} clientId={client_id}/>}
                <span className={`${s.status} ${newAnketaState == 'reject' && s.status_reject} ${newAnketaState == 'ok' && s.status_ok}`}>
                    {newAnketaState == 'ok' && 'Анкета одобрена!'}
                    {newAnketaState == 'reject' && 'Анкета отклонена'}
                    {newAnketaState == 'again' && 'Анкета отправлена на повторное заполнение'}
                </span>
            </div>
        </div>
    )
};

export default Anketa;