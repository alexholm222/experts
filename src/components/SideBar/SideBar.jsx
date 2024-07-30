import s from './SideBar.module.scss';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//image 
import avatar from '../../image/avatar.png';
import { ReactComponent as MenuWorkIcon } from '../../image/sideBar/menuWork.svg';
import { ReactComponent as MenuClientsIcon } from '../../image/sideBar/menuClients.svg';
import { ReactComponent as IconPhone } from '../../image/sideBar/iconPhone.svg';
import { ReactComponent as IconPartners } from '../../image/sideBar/iconPartners.svg';
import { ReactComponent as IconAnalytics } from '../../image/sideBar/iconAnalytics.svg';
import { ReactComponent as IconPlaner } from '../../image/sideBar/iconPlaner.svg';
import { ReactComponent as IconSetting } from '../../image/sideBar/iconSetting.svg';
import { ReactComponent as IconEvent } from '../../image/sideBar/iconEvent.svg';
//components
import LoaderSide from '../Loader/LoaderSide';
import LoaderAvatar from '../Loader/LoaderAvatar';
import { useDispatch, useSelector } from 'react-redux';
import { selectorApp } from '../../store/reducer/App/selector';
import WidgetSideBar from '../WidgetSideBar/WidgetSideBar';
import CenterNotification from '../CenterNotification/CenterNotification';
//selector
import { selectorClient } from '../../store/reducer/Client/selector';
import { selectorExpert } from '../../store/reducer/Expert/selector';
import { selectorCommand } from '../../store/reducer/Command/selector';
import { selectorStatistic } from '../../store/reducer/Statistic/selector';
//slice
import { setDisabledMyClients } from '../../store/reducer/App/slice';

const SideBar = ({ sidebarHiden, setSideBarHiden, activePoint }) => {
  const expertInfo = useSelector(selectorExpert).expert;
  const [anim, setAnim] = useState(false);
  const [loadClose, setLoadClose] = useState(true);
  const [loadVisible, setLoadVisible] = useState(true);
  const [workDayResult, setWorkDayResult] = useState(0);
  const loadPage = useSelector(selectorApp).loadPage;
  const loadManager = useSelector(selectorApp).loadManager;
  const client_id = useSelector(selectorClient).client_id;
  const message = useSelector(selectorCommand).message;
  const statistic = useSelector(selectorStatistic).statisticToday;
  const [color, setColor] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const planDay = 5;
  console.log('статистика за сегондя', statistic)

  //Лоадер для сайдбара (инфо о менеджере)
  useEffect(() => {
    if (!loadPage && !loadManager) {
      setLoadVisible(false)
      setTimeout(() => {
        setLoadClose(false)
      }, 50)
    } else {
      setLoadClose(true)
    }
  }, [loadPage, loadManager])


  useEffect(() => {
    setTimeout(() => {
      setAnim(true)
    })
  }, []);

  //записываем результаты дня
  useEffect(() => {
    const num = statistic?.zoom?.count + statistic?.anketa?.count + statistic?.prepay?.count;
    setWorkDayResult(num)
  }, [statistic])

  useEffect(() => {
    if (message.action == 'call_client' || message.action == 'call_client_talk' || message.action == 'next_client') {
      dispatch(setDisabledMyClients(true));
      /*   navigate(`/experts/work/client=${client_id}`); */
    } else {
      dispatch(setDisabledMyClients(false));
    }
  }, [message]);

  useEffect(() => {
    if (workDayResult / planDay < 0.21) {
      setColor('red2');
    } else if (workDayResult / planDay < 0.40 && workDayResult / planDay >= 0.21) {
      setColor('orange2');
    } else if (workDayResult / planDay < 0.60 && workDayResult / planDay >= 0.40) {
      setColor('yellow');
    } else if (workDayResult / planDay < 0.80 && workDayResult / planDay >= 0.60) {
      setColor('green');
    } else {
      setColor('green3');
    }
  }, [workDayResult, planDay]);

  const handleSideBar = () => {
    if (sidebarHiden) {
      setSideBarHiden(false);
      localStorage.setItem('sidebar', false);
    } else {
      setSideBarHiden(true);
      localStorage.setItem('sidebar', true);
    }
  }

  console.log(workDayResult)

  return (
    <div className={`${s.sidebar} ${anim && s.sidebar_anim} ${sidebarHiden && s.sidebar_hiden}`}>
      <div onClick={handleSideBar} className={`${s.button} ${sidebarHiden && s.button_hiden}`}></div>
      <div className={s.container}>
        <div className={`${s.logo} ${sidebarHiden && s.logo_hiden}`}></div>
        <div className={`${s.profile} ${sidebarHiden && s.profile_hiden}`}>
          <div className={`${s.container_profile} ${sidebarHiden && s.container_hiden}`}>

            <div className={`${s.overlay} ${sidebarHiden && s.overlay_hiden}`}>
              {loadClose ? <LoaderAvatar load={loadPage} /> :
                <img
                  src={expertInfo?.avatar ? expertInfo?.avatar : avatar}
                  className={`${s.avatar} ${sidebarHiden && s.avatar_hiden}`}>
                </img>}
            </div>

          {/*   <div className={`${s.rewardcount} ${sidebarHiden && s.rewardcount_hiden}`}>
              <div className={s.rewardcount_overlay}></div>
              <div className={s.rewardcount_reward}></div>
              <p className={s.rewardcount_count}>{10}</p>
            </div> */}

          </div>
          <div className={s.loader}>
            <p className={`${s.text} ${s.text_name} ${sidebarHiden && s.text_hiden} ${loadClose && s.hiden}`}>{expertInfo?.name} {expertInfo?.surname}</p>
            {loadClose && <LoaderSide load={loadVisible} />}
          </div>
          <div className={s.loader}>
            <p className={`${s.text} ${s.text_rank} ${sidebarHiden && s.text_hiden} ${loadClose && s.hiden}`}>Эксперт по открытию бизнеса</p>
            {loadClose && <LoaderSide load={loadVisible} />}
          </div>

          <div className={s.box}>
            <div className={`${s.bar} ${sidebarHiden && s.bar_hiden}`}>
              {[...Array(5)].map((el, i) =>
                <div className={`${s.item} ${workDayResult >= i + 1 ? color: ''}`}></div>
              )}
            </div>

          </div>

          {/*  <div className={`${s.react} ${sidebarHiden && s.react_hiden}`}>

          </div> */}
        </div>
        <ul className={`${s.menu} ${sidebarHiden && s.menu_hiden}`}>
          <div className={`${s.point_overlay} ${(client_id == '' && message.action !== 'not_work' && message.action !== 'end_work' || message.action == 'end_work') && s.point_overlay_dis}`}>
            <Link to={message.action == 'end_work' ? '/experts/work' : `/experts/work/client=${client_id}`}>
              <li className={`${s.point} ${s.point_tel} ${sidebarHiden && s.point_hiden} ${activePoint == 1 && s.point_tel_active}`}>
                <MenuWorkIcon />
                <p className={`${s.point_text} ${sidebarHiden && s.point_text_hiden}`}>Работа с клиентами</p>
              </li>
            </Link>
          </div>

          <div className={`${s.point_overlay} ${message.action == 'end_work' && s.point_overlay_dis}`}>
            <Link to={message.action == 'end_work' ? '/experts/work' : '/experts/planer'}>
              <li className={`${s.point} ${s.point_tel} ${sidebarHiden && s.point_hiden} ${activePoint == 3 && s.point_tel_active}`}>
                <IconPlaner />
                <p className={`${s.point_text} ${sidebarHiden && s.point_text_hiden}`}>Планер</p>
              </li>
            </Link>
          </div>

          <div className={`${s.point_overlay} ${message.action == 'end_work' && s.point_overlay_dis}`}>
            <Link to={message.action == 'end_work' ? '/experts/work' : '/experts/clients'}>
              <li className={`${s.point} ${s.point_tel} ${sidebarHiden && s.point_hiden} ${activePoint == 2 && s.point_tel_active}`}>
                <MenuClientsIcon />
                <p className={`${s.point_text} ${sidebarHiden && s.point_text_hiden}`}>Мои клиенты</p>
              </li>
            </Link>
          </div>

          <div className={`${s.point_overlay}`}>
            <Link to={'/experts/calendar'}>
              <li className={`${s.point} ${s.point_tel} ${sidebarHiden && s.point_hiden} ${activePoint == 4 && s.point_tel_active}`}>
                <IconEvent />
                <p className={`${s.point_text} ${sidebarHiden && s.point_text_hiden}`}>Календарь событий</p>
              </li>
            </Link>
          </div>


          <div className={`${s.point_overlay}`}>
            <Link to={'/experts/options'}>
              <li className={`${s.point} ${s.point_tel} ${sidebarHiden && s.point_hiden} ${activePoint == 5 && s.point_tel_active}`}>
                <IconSetting />
                <p className={`${s.point_text} ${sidebarHiden && s.point_text_hiden}`}>Настройки</p>
              </li>
            </Link>
          </div>
        </ul>
      </div>

      <CenterNotification/>

      <WidgetSideBar sidebarHiden={sidebarHiden} />
    </div>
  );
}

export default SideBar;
