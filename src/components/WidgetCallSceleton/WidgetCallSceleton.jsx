import s from './WidgetCallSceleton.module.scss';
import LoaderSceleton from '../Loader/LoaderSceleton';
const WidgetCallSceleton = () => {
 

    return (
        <div className={`${s.call}`}>
            <div className={s.container}>
                <div className={s.text}><LoaderSceleton/></div>
                <div className={`${s.button} `}><LoaderSceleton/></div>
            </div>
            <div className={s.buttons}>
                <button className={s.button_small}><LoaderSceleton/></button>
                <button className={s.button_small}><LoaderSceleton/></button>
            </div>
        </div>
    )
};

export default WidgetCallSceleton;


