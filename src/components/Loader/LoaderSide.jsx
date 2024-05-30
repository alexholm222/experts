import s from './Loader.module.scss';
import { Skeleton } from '@mui/material';


const LoaderSide = ({load}) => {
    return (
        <div className={`${s.overlay} ${s.overlay_side} ${!load && s.load_close}`}>
            <div className={`${s.loader} ${!load && s.loader_close}`}></div>
        </div>
    )
};

export default LoaderSide;
