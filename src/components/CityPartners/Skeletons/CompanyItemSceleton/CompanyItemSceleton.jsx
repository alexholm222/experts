import s from './CompanyItemSceleton.module.scss';
import LoaderSceleton from '../../../Loader/LoaderSceleton';



const CompanyItemSceleton = ({loadPartners}) => {



    return (
        <div className={`${s.container} ${!loadPartners && s.container_hidden}`}>
            <div className={s.header}>
                <div className={s.logo}>
                    <LoaderSceleton />
                </div>
               
                <div className={`${s.arrow}`}>
                    <LoaderSceleton />
                </div>
            </div>

        </div>
    )
};

export default CompanyItemSceleton;