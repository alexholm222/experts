import s from './Loader.module.scss';

const LoaderSmallBlock= ({load}) => {
    return (
        <div className={`${s.overlay} ${s.overlay_small} ${!load && s.load_close}`}>
            <div className={`${s.loader} ${!load && s.loader_close}`}></div>
        </div>
    )
};

export default LoaderSmallBlock;