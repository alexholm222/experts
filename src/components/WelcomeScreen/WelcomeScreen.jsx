import s from './WelcomeScreen.module.scss';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as IconPlay } from '../../image/sideBar/IconPlay.svg';
//selector
import { selectorExpert } from '../../store/reducer/Expert/selector';
//slice
import { setCommand } from '../../store/reducer/Command/slice';


function WelcomeScreen({ action }) {
  const expertInfo = useSelector(selectorExpert).expert;
  const [anim, setAnim] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setAnim(true)
    })
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "8px";
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";
    };
  }, []);

  const handleStart = () => {
    dispatch(setCommand('start_work'));
  }

  return (
    <div className={`${s.overlay}`}>
      <div className={`${s.welcome} ${anim && s.welcome_anim}`}>
        <div className={s.container}>
          <div className={s.picture}></div>
          {action == 'end_work' &&<h2 className={s.title}>День завершен</h2>}
          {action == 'not_work' &&<h2 className={s.title}>Привет, {expertInfo.name}</h2>}
          {action == 'not_work' && <p className={s.text}>Начинай день, впереди тебя ждут большие совершения!</p>}
          {action == 'not_work' && <button onClick={handleStart} className={s.button}>
            <p>Начать день</p>
            <span className={s.icon}>
              <IconPlay />
            </span>
          </button>
          }
        </div>
      </div>
    </div>

  )
};

export default WelcomeScreen;