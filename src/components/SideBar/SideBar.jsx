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
//Api
import { getManagerInfo } from '../../Api/Api';
//components
import LoaderSide from '../Loader/LoaderSide';
import LoaderAvatar from '../Loader/LoaderAvatar';
import { useDispatch, useSelector } from 'react-redux';
import { selectorApp } from '../../store/reducer/App/selector';
import WidgetSideBar from '../WidgetSideBar/WidgetSideBar';
//selector
import { selectorClient } from '../../store/reducer/Client/selector';
import { selectorExpert } from '../../store/reducer/Expert/selector';
import { selectorCommand } from '../../store/reducer/Command/selector';
//slice
import { setExpert } from '../../store/reducer/Expert/slice';
import { setLoadManager } from '../../store/reducer/App/slice';
import { setDisabledMyClients } from '../../store/reducer/App/slice';

const SideBar = ({ sidebarHiden, setSideBarHiden, activePoint }) => {
  const expertInfo = useSelector(selectorExpert).expert;
  const [anim, setAnim] = useState(false);
  const [loadClose, setLoadClose] = useState(true);
  const [loadVisible, setLoadVisible] = useState(true);
  const loadPage = useSelector(selectorApp).loadPage;
  const loadManager = useSelector(selectorApp).loadManager;
  const client_id = useSelector(selectorClient).client_id;
  const message = useSelector(selectorCommand).message;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Лоадер для сайдбара (инфо о менеджере)
  useEffect(() => {
    if (!loadPage && !loadManager) {
      setLoadVisible(false)
      setTimeout(() => {
        setLoadClose(false)
      }, 150)
    } else {
      setLoadClose(true)
    }
  }, [loadPage, loadManager])


  useEffect(() => {
    setTimeout(() => {
      setAnim(true)
    })
  }, []);

  useEffect(() => {
    if (message.action == 'call_client' || message.action == 'call_client_talk' || message.action == 'next_client') {
      dispatch(setDisabledMyClients(true));
      navigate(`/experts/work`);
    } else {
      dispatch(setDisabledMyClients(false));
    }
  }, [message]);


  useEffect(() => {
    getManagerInfo()
      .then(res => {
        const data = res.data.data;
        const expert = { name: data.name, surname: data.surname, avatar: data.avatar }
        console.log(res)
        dispatch(setExpert(expert));
        dispatch(setLoadManager(false));
      })
      .catch(err => console.log(err))
  }, []);


  const handleSideBar = () => {
    if (sidebarHiden) {
      setSideBarHiden(false);
      localStorage.setItem('sidebar', false);
    } else {
      setSideBarHiden(true);
      localStorage.setItem('sidebar', true);
    }
  }

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

            {/* <div className={`${s.rewardcount} ${sidebarHiden && s.rewardcount_hiden}`}>
              <div className={s.rewardcount_overlay}></div>
              <div className={s.rewardcount_reward}></div>
              <p className={s.rewardcount_count}>{10}</p>
            </div> */}

          </div>
          <div className={s.loader}>
            <p className={`${s.text} ${s.text_name} ${sidebarHiden && s.text_hiden} ${loadClose && s.hiden}`}>{expertInfo?.name}</p>
            {loadClose && <LoaderSide load={loadVisible} />}
          </div>
          <div className={s.loader}>
            <p className={`${s.text} ${s.text_rank} ${sidebarHiden && s.text_hiden} ${loadClose && s.hiden}`}>{expertInfo?.surname}</p>
            {loadClose && <LoaderSide load={loadVisible} />}
          </div>

          {/*  <div className={s.box}>
            <div className={`${s.bar} ${sidebarHiden && s.bar_hiden}`}>
              {[...Array(6)].map((el, i) =>
                <div className={s.item}></div>
              )}
            </div>
            <div>
              <div className={s.loader}>
                <p className={`${s.status} ${s.status_end} ${sidebarHiden && s.status_hiden} ${loadClose && s.hiden}`}>День завершен</p>
                {loadClose && <LoaderSide load={loadVisible} />}
              </div>
            </div>
          </div> */}

          {/*  <div className={`${s.react} ${sidebarHiden && s.react_hiden}`}>

          </div> */}
        </div>
        <ul className={`${s.menu} ${sidebarHiden && s.menu_hiden}`}>
          <div className={`${s.point_overlay} ${client_id == '' && s.point_overlay_dis}`}>
            <Link to={'/experts/work'}>
              <li className={`${s.point} ${s.point_tel} ${sidebarHiden && s.point_hiden} ${activePoint == 1 && s.point_tel_active}`}>
                <MenuWorkIcon />
                <p className={`${s.point_text} ${sidebarHiden && s.point_text_hiden}`}>Работа с клиентами</p>
              </li>
            </Link>
          </div>

          <div className={`${s.point_overlay}`}>
            <Link to={'/experts/planer'}>
              <li className={`${s.point} ${s.point_tel} ${sidebarHiden && s.point_hiden} ${activePoint == 3 && s.point_tel_active}`}>
                <IconPlaner />
                <p className={`${s.point_text} ${sidebarHiden && s.point_text_hiden}`}>Планер</p>
              </li>
            </Link>
          </div>

          <div className={`${s.point_overlay}`}>
            <Link to={'/experts/clients'}>
              <li className={`${s.point} ${s.point_tel} ${sidebarHiden && s.point_hiden} ${activePoint == 2 && s.point_tel_active}`}>
                <MenuClientsIcon />
                <p className={`${s.point_text} ${sidebarHiden && s.point_text_hiden}`}>Мои клиенты</p>
              </li>
            </Link>
          </div>

        

          {/*  <a href={'https://lk.skilla.ru/mango/old'} target='_blank'>
              <li className={`${s.point} ${s.point_tel} ${sidebarHiden && s.point_hiden} ${activePoint == 3 && s.point_tel_active}`}>
                <IconPhone />
                <p className={`${s.point_text} ${sidebarHiden && s.point_text_hiden}`}>Звонки</p>
              </li>
            </a> */}

          <a href={'https://lk.skilla.ru/frmanager/partners'} target='_blank'>
            <li className={`${s.point} ${s.point_tel} ${sidebarHiden && s.point_hiden} ${activePoint == 4 && s.point_tel_active}`}>
              <IconPartners />
              <p className={`${s.point_text} ${sidebarHiden && s.point_text_hiden}`}>Партнеры</p>
            </li>
          </a>

          {/*   <a href={'https://lk.skilla.ru/frmanager/analytics'} target='_blank'>
              <li className={`${s.point} ${s.point_tel} ${sidebarHiden && s.point_hiden} ${activePoint == 5 && s.point_tel_active}`}>
                <IconAnalytics />
                <p className={`${s.point_text} ${sidebarHiden && s.point_text_hiden}`}>Аналитика</p>
              </li>
            </a> */}

        </ul>
      </div>
      <WidgetSideBar sidebarHiden={sidebarHiden} />
    </div>
  );
}

export default SideBar;
