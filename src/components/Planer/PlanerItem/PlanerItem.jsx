import s from './PlanerItem.module.scss';
import { ReactComponent as BadgeCallGreen } from '../../../image/clients/bages/badgeCallGreen.svg';
import { ReactComponent as BadgeCallRed } from '../../../image/clients/bages/badgeCallRed.svg';
import { ReactComponent as BageAnketaGreen } from '../../../image/clients/bages/bageAnketaGreen.svg';
import { ReactComponent as BadgeZoomGreen } from '../../../image/clients/bages/badgeZoomGreen.svg';
import { ReactComponent as BageZoomRed } from '../../../image/clients/bages/bageZoomRed.svg';
import { ReactComponent as BadgeCallGrey } from '../../../image/clients/bages/badgeCallGrey.svg';
import { ReactComponent as BageZoomGrey } from '../../../image/clients/bages/bageZoomGrey.svg';
import { ReactComponent as BageAnketaBlue } from '../../../image/clients/bages/bageAnketaBlue.svg';
import { ReactComponent as BageZoomBlue } from '../../../image/clients/bages/bageZoomBlue.svg';
import { ReactComponent as BadgeCallBlue } from '../../../image/clients/bages/badgeCallBlue.svg';
import { ReactComponent as BadgeContractGreen } from '../../../image/clients/bages/badgeContractGreen.svg';
import { ReactComponent as BadgePrePayGreen } from '../../../image/clients/bages/badgePrePayGreen.svg';
import { ReactComponent as BageZoom } from '../../../image/clients/bages/bageZoom.svg';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//utils
import { handleTimeText, handleDateZoomDiff, handleCurrentHour } from '../../../utils/dates';
//selector
import { selectorClient } from '../../../store/reducer/Client/selector';
import { selectorApp } from '../../../store/reducer/App/selector';
//slice
import { setClientId } from '../../../store/reducer/Client/slice';

const PlanerItem = ({ state, el, date }) => {
    const client_id = useSelector(selectorClient).client_id;
    const disabledMyClients = useSelector(selectorApp).disabledMyClients;
    const [stage, setStage] = useState('call');

    const [now, setNow] = useState(false);
    const [type, setType] = useState('call');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const lastLog = el?.lk_road_logs?.at();
        console.log(lastLog)
        if (handleDateZoomDiff(el.zoom_date, date)) {
            const result = handleCurrentHour(el.zoom_date);
            setNow(result);
            setType('zoom');
            return
        }

        if (handleDateZoomDiff(el.anketa, date)) {
            const result = handleCurrentHour(el.anketa);
            setNow(result);
            setType('anketa');
            return
        }

        if (!handleDateZoomDiff(el.anketa, date) && !handleDateZoomDiff(el.zoom_date, date)) {
            const result = handleCurrentHour(el.next_connect);
            setNow(result);
            setType('call');
            return
        }
    }, [el]);

    useEffect(() => {
        const zoomReq = el.lk_road_logs.find(el => el.type == 'ReqZoom');
        const zoomSetLog = el.lk_road_logs.find(el => el.type == 'ClientZoomSet');
        const zoomLog = el.lk_road_logs.find(el => el.type == 'ClientZoomFinish');
        const anketaSend = el.lk_road_logs.find(el => el.type == 'SendForm');
        const anketaLog = el.lk_road_logs.find(el => el.type == 'ClientAnketaAccept');
        const contractLog = el.lk_road_logs.find(el => el.type == 'ClientContractSign');
        const prePayLog = el.lk_road_logs.find(el => el.type == 'ClientPrepaid');

        if (prePayLog) {
            setStage('prepay');
            return
        }

        if (contractLog) {
            setStage('contract');
            return
        }

        if (anketaLog) {
            setStage('anketa');
            return
        }

        if (anketaSend) {
            setStage('anketaSend');
            return
        }

        if (zoomLog) {
            setStage('zoom');
            return
        }

        if (zoomSetLog) {
            setStage('zoomSet');
            return
        }

        if (zoomReq) {
            setStage('zoomReq');
            return
        }

    }, [el]);

    const handleOpenClient = () => {
        dispatch(setClientId(el.id));
        localStorage.setItem('client_id', JSON.stringify(el.id));
        navigate(`/experts/work`);
        if (client_id !== el.id) {
            localStorage.removeItem('widget');
            localStorage.removeItem('prevWidget');
            localStorage.removeItem('comment');
            localStorage.removeItem('screenShots')
            localStorage.removeItem('tab');
            localStorage.removeItem('sms');
        }
    }


    return (

        <div onClick={handleOpenClient} className={`${s.container} ${disabledMyClients && s.container_disabled} ${now && s.container_now} ${type == 'call' && state == -1 && s.container_miss} ${type == 'zoom' && state == -1 && el.zoom_status == 2 && s.container_miss}`}>
            <div className={s.block}>
                <div className={s.time}>
                    {type == 'call' && <p>{handleTimeText(el.next_connect)}</p>}
                    {type == 'zoom' && <p>{handleTimeText(el.zoom_date)}</p>}
                    {type == 'anketa' && <p>{handleTimeText(el.anketa)}</p>}

                    {type == 'call' && state == -1 && <div className={`${s.bage} ${s.bage_red}`}><BadgeCallRed /></div>}
                    {type == 'zoom' && state == -1 && el.zoom_status == 3 && <div className={`${s.bage} ${s.bage_red}`}><BadgeZoomGreen /></div>}
                    {type == 'zoom' && state == -1 && el.zoom_status == 2 && <div className={`${s.bage} ${s.bage_red}`}><BageZoomRed /></div>}
                    {type == 'anketa' && state == -1 && <div className={`${s.bage} ${s.bage_red}`}><BageAnketaGreen /></div>}
                    {/*  {type == 'call' && state == -1 && el.zoom_status == 3 && <div className={`${s.bage} ${s.bage_red}`}><BadgeZoomGreen /></div>} */}

                    {/*   {type == 'call' && state == 0 && <div className={`${s.bage} ${s.bage_blue}`}><BadgeCallBlue /></div>} */}
                    {/*  {type == 'zoom' && state == 0 && el.zoom_status == 2 && <div className={`${s.bage} ${s.bage_blue}`}><BageZoomBlue /></div>} */}
                    {/* {type == 'zoom' && state == 0 && el.zoom_status == 3 && <div className={`${s.bage} ${s.bage_red}`}><BadgeZoomGreen /></div>} */}
                    {/*   {type == 'anketa' && state == 0 && <div className={`${s.bage} ${s.bage_blue}`}><BageAnketaBlue /></div>}
 */}
                    {/*    {stage == 'call' && state == 0 && <div className={`${s.bage} ${s.bage_blue}`}><BadgeCallGrey /></div>}
                    {stage == 'zoom' && state == 0 && el.zoom_status !== 3 && <div className={`${s.bage} ${s.bage_blue}`}><BageZoomGrey /></div>}
                    {stage == 'anketa' && state == 0 && <div className={`${s.bage} ${s.bage_blue}`}><BageAnketaGreen /></div>}
                    {stage == 'contract' && state == 0 && <div className={`${s.bage} ${s.bage_blue}`}><BadgeContractGreen /></div>}
                    {stage == 'prepay' && state == 0 && <div className={`${s.bage} ${s.bage_blue}`}><BadgePrePayGreen /></div>} */}

                    {stage == 'call' && state == 0 && <div className={`${s.bage} ${s.bage_blue}`}><BadgeCallGrey /></div>}
                    {stage == 'zoomReq' && state == 0 && <div className={`${s.bage} ${s.bage_yellow}`}><BageZoomGrey /></div>}
                    {stage == 'zoomSet' && state == 0 && <div className={`${s.bage} ${s.bage_blue}`}><BageZoomGrey /></div>}
                    {stage == 'zoomSet' && state == 0 && el.zoom_status == 3 && <div className={`${s.bage} ${s.bage_red}`}><BadgeZoomGreen /></div>}
                   {/*  {stage == 'zoom' && state == 0 && el.zoom_status == 2 && <div className={`${s.bage} ${s.bage_red}`}><BageZoomRed /></div>} */}
                    {stage == 'zoom' && state == 0 && <div className={`${s.bage} ${s.bage_blue}`}><BageAnketaGreen /></div>}
                    {stage == 'anketaSend' && state == 0 && <div className={`${s.bage} ${s.bage_yellow}`}><BageAnketaGreen /></div>}
                    {stage == 'anketa' && state == 0 && <div className={`${s.bage} ${s.bage_blue}`}><BadgeContractGreen /></div>}
                    {stage == 'contract' && state == 0 && <div className={`${s.bage} ${s.bage_blue}`}><BadgePrePayGreen /></div>}
                    {stage == 'prepay' && state == 0 && <div className={`${s.bage} ${s.bage_blue}`}><BadgePrePayGreen /></div>}



                    {stage == 'call' && state == 1 && <div className={`${s.bage} ${s.bage_grey}`}><BadgeCallGrey /></div>}
                    {stage == 'zoomReq' && state == 1 && <div className={`${s.bage} ${s.bage_yellow}`}><BageZoomGrey /></div>}
                    {stage == 'zoomSet' && state == 1 && <div className={`${s.bage} ${s.bage_grey}`}><BageZoomGrey /></div>}
                    {stage == 'zoom' && state == 1 && <div className={`${s.bage} ${s.bage_grey}`}><BageAnketaGreen /></div>}
                    {stage == 'anketaSend' && state == 1 && <div className={`${s.bage} ${s.bage_yellow}`}><BageAnketaGreen /></div>}
                    {stage == 'anketa' && state == 1 && <div className={`${s.bage} ${s.bage_grey}`}><BadgeContractGreen /></div>}
                    {stage == 'contract' && state == 1 && <div className={`${s.bage} ${s.bage_grey}`}><BadgePrePayGreen /></div>}
                    {stage == 'prepay' && state == 1 && <div className={`${s.bage} ${s.bage_grey}`}><BadgePrePayGreen /></div>}
                </div>



            </div>

            <div className={s.text}>
                <p>{el.name}</p>
                <span>{el.city == '' ? el.city_auto : el.city}</span>
            </div>
        </div>

    )
};

export default PlanerItem;