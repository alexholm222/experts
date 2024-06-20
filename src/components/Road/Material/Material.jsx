import s from './Material.module.scss';
import { ReactComponent as DisablePoint } from '../../../image/work/disablePoint.svg';
import { ReactComponent as CheckPoint } from '../../../image/work/checkPoint.svg';
import { ReactComponent as WaitPoint } from '../../../image/work/waitPoint.svg';
//utils
import { handleDateDifference } from '../../../utils/dates';
import { useState } from 'react';

const Material = ({ materials }) => {
    const [openList, setOpenList] = useState(false);
    const materialList = materials ? Object.values(materials?.materials) : [];

    const handleOpenList = () => {
        openList ? setOpenList(false) : setOpenList(true)
    }

    return (
        <>
            <li onClick={handleOpenList} className={`${s.item} ${materials?.status == 'disabled' && s.item_dis} ${materials?.status == 'waiting' && s.item_wait}`}>
                <div className={s.loader}>
                    <div className={`${s.left}`}>
                        {materials?.status == 'disabled' && <DisablePoint />}
                        {materials?.status == 'finished' && <CheckPoint />}
                        {materials?.status == 'waiting' && <WaitPoint />}
                        <p>{materials?.name}</p>
                    </div>

                </div>
                <div className={s.loader}>
                    <span>{handleDateDifference(materials?.date)}</span>

                </div>
            </li>

            <ul className={`${s.list} ${openList && s.list_open}`}>
                {materialList.map((el) => {
                    return <li>
                        <div>
                            {!el?.is_viewed && <DisablePoint />}
                            {el?.is_viewed && <CheckPoint />}
                            <p>{el.name}</p>

                        </div>
                        <span>{handleDateDifference(el?.is_viewed)}</span>
                    </li>
                })}
            </ul>
        </>


    )
};

export default Material;