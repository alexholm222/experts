import s from './ClientItemSceleton.module.scss';
import LoaderSceleton from '../../Loader/LoaderSceleton';

const ClientItemSceleton = () => {

    return (
        <div className={`${s.item}`}>
            <div className={s.empty}>

            </div>
            <div className={s.client}>
                <div className={s.name}><LoaderSceleton /></div> <div className={s.city}><LoaderSceleton /></div>
            </div>
            <div className={s.task}>
                <div><LoaderSceleton /></div>
            </div>
            <div className={s.task}>
                <div><LoaderSceleton /></div>
            </div>
            <div className={s.step}>
                <div className={s.bars}>
                    <div className={`${s.bar}`}><LoaderSceleton /></div>
                    <div className={`${s.bar}`}><LoaderSceleton /></div>
                    <div className={`${s.bar}`}><LoaderSceleton /></div>
                    <div className={`${s.bar}`}><LoaderSceleton /></div>
                    <div className={`${s.bar}`}><LoaderSceleton /></div>
                </div>
                <div className={s.steptext}><LoaderSceleton /></div>
            </div>
            <div className={s.comment}>
            <div><LoaderSceleton /></div>
            </div>
            <div className={`${s.favorite}`}>
            </div>
        </div>
    )
};

export default ClientItemSceleton;