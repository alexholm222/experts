import s from './Loader.module.scss';

const LoaderAvatar = ({load}) => {
    return (
        <div className={`${s.overlay} ${s.overlay_avatar} ${!load && s.load_close}`}>
            <div className={`${s.loader} ${!load && s.loader_close}`}></div>
        </div>
    )
};

export default LoaderAvatar;