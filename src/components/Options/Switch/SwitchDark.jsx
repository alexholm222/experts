import { useState } from 'react';
import './Switch.scss';
import { useDispatch, useSelector } from 'react-redux';
//selector
import { selectorApp } from '../../../store/reducer/App/selector';
//slice
import { setTheme } from '../../../store/reducer/App/slice';


function SwitchDark() {
    const dispatch = useDispatch();
    const theme = useSelector(selectorApp).theme;

    const handleActive = () =>  {
      dispatch(setTheme());
      
    }

    return (
        <div onClick={handleActive} className={`switch switch_${theme == 'dark' ? 'on' : ''}`}>
            <div className={`inner`}></div>
        </div>
    )
};

export default SwitchDark;