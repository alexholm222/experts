import s from './PlanerItem.module.scss';
import LoaderSceleton from '../../Loader/LoaderSceleton';


const PlanerItem = () => {
  

    return (
        <div className={s.container}>
            <div className={s.time}>
               <div className={s.time_1}><LoaderSceleton/></div>
               <div className={s.time_2}><LoaderSceleton/></div>
            </div>
            <div className={s.text}>
                <div className={s.text_1}><LoaderSceleton/></div>
                <div className={s.text_2}><LoaderSceleton/></div>
            </div>
        </div>
    )
};

export default PlanerItem;