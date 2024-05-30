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

function RoadItem({ loadClose, loadVisible, type, idCheck, lastCheck }) {
    const load = useSelector(selectorApp).load;
    return (
        <li className={`${s.item} ${type == 'dis' && s.item_dis} ${type == 'wait' && s.item_wait}`}>
            <div className={s.loader}>
                <div className={`${s.left} ${loadClose && s.hiden}`}>
                    {type == 'dis' && <DisablePoint />}
                    {type == 'fail' && <FailPoint />}
                    {type == 'wait' && <WaitPoint />}
                    {type == 'yellow' && <YellowPoint />}
                    {type == 'process' && <ProcessPoint />}
                    {type == 'processLong' && <ProcessLongPoint />}
                    {type == 'check' && idCheck <= lastCheck && <CheckPoint />}
                    {type == 'check' && idCheck > lastCheck && <PointCheck />}
                    <p>тут будет этап</p>
                </div>
                {loadClose && <Loader load={loadVisible}/>}
            </div>
            <div className={s.loader}>
            <span className={`${loadClose && s.hiden}`}>4 дн</span>
            {loadClose && <LoaderSmallBlock load={loadVisible} />}
            </div>
        </li>
    )
};

export default RoadItem;