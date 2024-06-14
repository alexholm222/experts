import s from './PlanerSceleton.module.scss';
import Column from './Column/Column';

const PlanerSceleton = ({load}) => {
  
    return (
        <div className={`${s.planer} ${load && s.planer_load}`}>

            {[...Array(5)].map((el, i) => {
                return <Column key={i} i={i}/>
            })}

        </div>
    )
};

export default PlanerSceleton;