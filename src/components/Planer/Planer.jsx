import s from './Planer.module.scss';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as IconChewron } from '../../image/clients/iconChewron.svg';
//selector
import { selectorPlaner } from '../../store/reducer/Planer/selector';
//components
import Column from './Column/Column';
import PlanerSceleton from '../PlanerSceleton/PlanerSceleton';
//utils
import { handleDayWeek } from '../../utils/dates';

const Planer = () => {
    const planerLoad = useSelector(selectorPlaner).planerLoad;
    const [anim, setAnim] = useState(false);
    const [planerLoader, setPlanerLoader] = useState(false);
    const [position, setPosition] = useState(0);
    const [planerDays, setPlanerDays] = useState([]);
    const planer = useSelector(selectorPlaner).planer;
    const dayWeek = handleDayWeek();

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    }, []);

    

    useEffect(() => {
        const days = Object.keys(planer);

        if (dayWeek == 1 || dayWeek == 2 || dayWeek == 3) {
            setPlanerDays(days.slice(0, 5));
            return
        }

        if (dayWeek == 4) {
            setPlanerDays(days.slice(1, 6));
            return
        }

        if (dayWeek == 5) {
            setPlanerDays(days.slice(2, 7));
            return
        }
    }, [planer]);

    const handleLeft = () => {
        setPosition(0)
    }

    const handleRight = () => {
        setPosition(1)
    }

    useEffect(() => {
        planerLoad ? setPlanerLoader(true) : setTimeout(() => {
            setPlanerLoader(false)
        }, 150)
    }, [planerLoad])

    return (
        <>
            {/* <div onClick={handleLeft} className={`${s.arrow} ${s.arrow_left} ${position == 0 && s.arrow_hiden}`}><IconChewron /></div>
            <div onClick={handleRight} className={`${s.arrow} ${s.arrow_right} ${position == 1 && s.arrow_hiden}`}><IconChewron /></div> */}
            <div className={s.header}>
                <h2 className={s.title}>Планер</h2>
            </div>

            <div className={`${s.planer} ${anim && s.planer_anim}`}>

                <div className={`${s.block} ${position == 1 && s.block_next}`}>
                    {planerDays.map((el, i) => {
                        return <Column key={i} plan={planer[el]} date={el} />
                    })}
                </div>

                {/*   <div className={`${s.block} ${position == 1 && s.block_next}`}>
                    {days.slice(5).map((el, i) => {
                        return <Column key={i} plan={planer[el]} date={el} />
                    })}
                </div> */}
                {planerLoader && <PlanerSceleton load={planerLoad} />}

            </div>


        </>

    )
};

export default Planer;