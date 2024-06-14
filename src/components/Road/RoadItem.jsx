import s from './Road.module.scss';
import { ReactComponent as DisablePoint } from '../../image/work/disablePoint.svg';
import { ReactComponent as FailPoint } from '../../image/work/failPoint.svg'
import { ReactComponent as WaitPoint } from '../../image/work/waitPoint.svg';
import { ReactComponent as YellowPoint } from '../../image/work/yellowPoint.svg';
import { ReactComponent as ProcessPoint } from '../../image/work/processPoint.svg';
import { ReactComponent as ProcessLongPoint } from '../../image/work/processLongPoint.svg';
import { ReactComponent as CheckPoint } from '../../image/work/checkPoint.svg';
import PointCheck from './Points/PointCheck';
import { useSelector } from 'react-redux';
import { selectorApp } from '../../store/reducer/App/selector';
import Loader from '../Loader/Loader';
import LoaderSmallBlock from '../Loader/LoaderSmallBlock';
//utils
import { handleDateDifference } from '../../utils/dates';

function RoadItem({ type, name, date, loadClose, loadVisible, idCheck, lastCheck }) {
    const load = useSelector(selectorApp).load;
   
    return (
        <li className={`${s.item} ${type == 'dis' && s.item_dis} ${type == 'wait' && s.item_wait}`}>
            <div className={s.loader}>
                <div className={`${s.left} ${loadClose && s.hide1n}`}>
                    {type == 'disabled' && <DisablePoint />}
                    {type == 'fail' && <FailPoint />}
                    {type == 'waiting' && <div className={`${s.point} ${s.point_wait}`}><WaitPoint /></div>}
                    {type == 'yellow' && <YellowPoint />}
                    {type == 'enabled' && <ProcessPoint />}
                    {type == 'processLong' && <ProcessLongPoint />}
                    {type == 'finished' && lastCheck !== date + name && <CheckPoint />}
                    {type == 'finished' && lastCheck == date + name && <PointCheck />}
                    <p>{name}</p>
                </div>
               
            </div>
            <div className={s.loader}>
                <span className={`${loadClose && s.hide2n}`}>{handleDateDifference(date)}</span>
              
            </div>
        </li>
    )
};

export default RoadItem;