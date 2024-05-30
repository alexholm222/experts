import s from './Loader.module.scss';

const LoaderSub = ({load}) => {
    return (
        <div className={`${s.overlay} ${s.overlay_sub} ${!load && s.load_close}`}>
            <div className={`${s.loader} ${!load && s.loader_close}`}></div>
        </div>
    )
};

export default LoaderSub;