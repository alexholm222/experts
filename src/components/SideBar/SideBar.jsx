import s from './SideBar.module.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//image 
import avatar from '../../image/avatar.png';
import { ReactComponent as MenuWorkIcon } from '../../image/sideBar/menuWork.svg';
import { ReactComponent as MenuClientsIcon } from '../../image/sideBar/menuClients.svg';
//components
import LoaderSide from '../Loader/LoaderSide';
import LoaderAvatar from '../Loader/LoaderAvatar';
import { useSelector } from 'react-redux';
import { selectorApp } from '../../store/reducer/App/selector';

const SideBar = ({ sidebarHiden, setSideBarHiden, activePoint }) => {
  const [anim, setAnim] = useState(false);
  const [loadClose, setLoadClose] = useState(true);
  const [loadVisible, setLoadVisible] = useState(true);
  const loadPage = useSelector(selectorApp).loadPage;
  const loadManager = useSelector(selectorApp).loadManager;

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
                  src={avatar}
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
            <p className={`${s.text} ${s.text_name} ${sidebarHiden && s.text_hiden} ${loadClose && s.hiden}`}>Леха</p>
            {loadClose && <LoaderSide load={loadVisible} />}
          </div>
          <div className={s.loader}>
            <p className={`${s.text} ${s.text_rank} ${sidebarHiden && s.text_hiden} ${loadClose && s.hiden}`}>лох</p>
            {loadClose && <LoaderSide load={loadVisible} />}
          </div>

          <div className={s.box}>
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
          </div>

          <div className={`${s.react} ${sidebarHiden && s.react_hiden}`}>

          </div>
        </div>
        <ul className={`${s.menu} ${sidebarHiden && s.menu_hiden}`}>
          <Link to={'/expert/work'}>
            <li className={`${s.point} ${s.point_tel} ${sidebarHiden && s.point_hiden} ${activePoint == 1 && s.point_tel_active}`}>
              <MenuWorkIcon />
              <p className={`${s.point_text} ${sidebarHiden && s.point_text_hiden}`}>Работа с клиентами</p>
            </li>
          </Link>
          <Link to={'/expert/clients'}>
            <li className={`${s.point} ${s.point_tel} ${sidebarHiden && s.point_hiden} ${activePoint == 2 && s.point_tel_active}`}>
              <MenuClientsIcon />
              <p className={`${s.point_text} ${sidebarHiden && s.point_text_hiden}`}>Мои клиенты</p>
            </li>
          </Link>
        </ul>
      </div>
      {/* <SideBarWidget menuNavStatus={menuNavStatus} /> */}
    </div>
  );
}

export default SideBar;