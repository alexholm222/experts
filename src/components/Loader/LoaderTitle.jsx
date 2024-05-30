import s from './Loader.module.scss';

const LoaderTitle = ({load}) => {
    return (
        <div className={`${s.overlay} ${s.overlay_title} ${!load && s.load_close}`}>
            <div className={`${s.loader} ${!load && s.loader_close}`}></div>
        </div>
    )
};

export default LoaderTitle;