import s from './RoadSceleton.module.scss';
import LoaderSceleton from '../../Loader/LoaderSceleton';

function RoadSceleton({load}) {
    console.log(load)
    return (
        <div className={`${s.road} ${load && s.road_vis}`}>
            <ul className={`${s.list}`}>
                {[...Array(6)].map((el, index) => {
                    return <li className={`${s.item}`}>

                        <div className={`${s.left}`}>
                            <div className={s.point}>
                                <LoaderSceleton />
                            </div>
                            <div className={s.text}>
                                <LoaderSceleton />
                            </div>

                        </div>


                        <div className={s.right}>
                            <LoaderSceleton />
                        </div>
                    </li>
                })
                }
            </ul>
        </div>
    )
};

export default RoadSceleton;