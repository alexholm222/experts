import s from './Loader.module.scss';

const Loader = ({load}) => {
    return (
        <div className={`${s.overlay} ${!load && s.load_close}`}>
            <div className={`${s.loader} ${!load && s.loader_close}`}></div>
        </div>
    )
};

export default Loader;
