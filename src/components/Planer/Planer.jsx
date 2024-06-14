import s from './Planer.module.scss';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as IconChewron } from '../../image/clients/iconChewron.svg';
//selector
import { selectorPlaner } from '../../store/reducer/Planer/selector';
//components
import Column from './Column/Column';

const Planer = () => {
    const [anim, setAnim] = useState(false);
    const [position, setPosition] = useState(0);
    const planer = useSelector(selectorPlaner).planer;
    const days = Object.keys(planer);

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    }, []);

    const handleLeft = () => {
        setPosition(0)
    }

    const handleRight = () => {
        setPosition(1)
    }


    return (
        <>
            <div onClick={handleLeft} className={`${s.arrow} ${s.arrow_left} ${position == 0 && s.arrow_hiden}`}><IconChewron /></div>
            <div onClick={handleRight} className={`${s.arrow} ${s.arrow_right} ${position == 1 && s.arrow_hiden}`}><IconChewron /></div>

            <div className={`${s.planer} ${anim && s.planer_anim}`}>

                <div className={`${s.block} ${position == 1 && s.block_next}`}>
                    {days.slice(0, 5).map((el, i) => {
                        return <Column key={i} plan={planer[el]} date={el} />
                    })}
                </div>

                <div className={`${s.block} ${position == 1 && s.block_next}`}>
                    {days.slice(5).map((el, i) => {
                        return <Column key={i} plan={planer[el]} date={el} />
                    })}
                </div>

            </div>
        </>

    )
};

export default Planer;