import { useEffect, useState } from 'react';
import s from './Road.module.scss';
import { ReactComponent as CaretDown } from '../../image/work/CaretDown.svg';
import RoadItem from './RoadItem';

function Road({loadClose, loadVisible}) {
    const [arr, setArr] = useState(['check', 'yellow', 'processLong', 'check', 'process', 'dis', 'fail', 'wait' , 'dis'])
    const [lastCheck, setLastChek] = useState(0);
    const [openList, setOpenList] = useState(false);

    useEffect(() => {
        const checkNum = arr.lastIndexOf('check');
        setLastChek(checkNum)
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setArr(['check', 'yellow', 'processLong', 'check', 'check', 'dis', 'fail', 'wait' , 'dis'])
        }, [2000])
    })

    const handleOpenList = () => {
        if (openList) {
            setOpenList(false)
        } else {
            setOpenList(true)
        }
    }
    return (
        <div className={s.road}>
            <ul className={`${s.list} ${openList && s.list_open}`}>
                {arr.map((el, index) => {
                    return <RoadItem key={index} idCheck={el == 'check' && index} type={el} lastCheck={lastCheck} loadClose={loadClose} loadVisible={loadVisible}/>
                })
                }
            </ul>
            <button onClick={handleOpenList} className={`${s.button} ${openList && s.button_open}`}><CaretDown /></button>
        </div>
    )
};

export default Road;