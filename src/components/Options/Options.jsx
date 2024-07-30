import { useEffect, useState } from 'react';
import s from './Options.module.scss';

import { ReactComponent as MoonIcon } from '../../image/options/moon.svg';
import { ReactComponent as IconLock } from '../../image/options/iconLock.svg';
import { ReactComponent as IconExit } from '../../image/options/iconExit.svg';
import SwitchDark from './Switch/SwitchDark';


const Options = () => {
    const [anim, setAnim] = useState(false);
   
    useEffect(() => {
        setAnim(true)
    }, []);

  
   

    return (
        <div className={`${s.options} ${anim && s.options_anim}`}>
            <h2 className={s.title}>Настройки</h2>
            <div className={s.theme}>
                <div className={s.block}>
                    <div className={s.block}>
                        <MoonIcon />
                        <p>Темная тема</p>
                    </div>
                    <div className={`${s.block_switch}`} /* onClick={handleActiveSwitch} */>
                  
                        <SwitchDark />
                    </div>
                </div>
               
            </div>
          
           

           
           
            <a href='https://lk.skilla.ru/login/logout.php' className={s.button}>
                <p>Выйти из профиля</p>
                <IconExit />
            </a>
        </div>
    )
};

export default Options;