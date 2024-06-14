import s from './Column.module.scss';
//components 
import PlanerItem from '../PlanerItem/PlanerItem';
import LoaderSceleton from '../../Loader/LoaderSceleton';
import { useEffect, useState } from 'react';


const Column = ({i}) => {
    const [arrayLength, setArrayLength] = useState(10);

    useEffect(() => {
        if(i == 0) {
            setArrayLength(10)
            return
        }

        if(i == 1) {
            setArrayLength(14)
            return
        }

        if(i == 2) {
            setArrayLength(7)
            return
        }

        if(i == 3) {
            setArrayLength(4)
            return
        }

        if(i == 4) {
            setArrayLength(2)
            return
        }
        
    }, [i])

 
    return (
        <div className={`${s.column}`}>
            <div className={s.header}>
                <div className={`${s.sub}`}><LoaderSceleton/></div>
                <div className={`${s.day}`}><LoaderSceleton/></div>
            </div>

            <ul className={s.list}>
                {[...Array(arrayLength)].map(el => {
                    return <PlanerItem />
                })}
            </ul>
        </div>
    )
};

export default Column;