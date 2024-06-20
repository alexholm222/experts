import { useEffect, useState } from 'react';
import './Scenario.scss';
import { ReactComponent as IconChewron2 } from '../../image/work/iconChewron2.svg';



function Scenario({ scenario }) {
    const [goodScript, setGoodScript] = useState([]);
    const [badScript, setBadScript] = useState([]);

    useEffect(() => {
        const good = scenario.filter(el => el.is_bad == 0);
        const bad = scenario.filter(el => el.is_bad == 1);
        setGoodScript(good);
        setBadScript(bad);
    }, [scenario])

    function openQuestion(e) {
        const currentTarget = e.currentTarget;
        const currentId = currentTarget.id

        if (currentTarget.closest('.scenario__question_good')) {
            currentTarget.closest('.scenario__question_good').classList.toggle('scenario__question_open');
            const goodScenarios = document.querySelectorAll('.scenario__question_good');
            const goodScenariosFilter = [...goodScenarios].filter((el) => el.id !== currentId);
            goodScenariosFilter.forEach((el) => el.classList.remove('scenario__question_open'));
        } else {
            currentTarget.closest('.scenario__question_bad').classList.toggle('scenario__question_open');
            const badScenarios = document.querySelectorAll('.scenario__question_bad');
            const badScenariosFilter = [...badScenarios].filter((el) => el.id !== currentId);
            badScenariosFilter.forEach((el) => el.classList.remove('scenario__question_open'));
        }
    }



    return (
        <>

            <div className={`scenario__container`}>
                <div style={{ display: 'flex' }}>
                    <div className={`scenario__icon scenario__icon_positive`}>
                    </div>
                    <h2 className={`scenario__title`}>
                      
                        Позитивные сценарии
                    </h2>
                </div>
                {goodScript?.map(el => {
                    return <div key={goodScript.indexOf(el)} id={goodScript.indexOf(el)} className='scenario__question scenario__question_good' onClick={openQuestion}>
                        <div className='box'>

                            <p className={`scenario__text_question`}>{el.title}</p>
                            <div className={`scenario__arrow`}><IconChewron2 /></div>
                        </div>
                        <div className={`scenario__text`} dangerouslySetInnerHTML={{ __html: el.answer }}></div>
                    </div>
                })}
            </div>

            <div className={`scenario__container`}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className={`scenario__icon scenario__icon_negative`}>

                    </div>
                    <h2 className={`scenario__title`}>
                        Негативные сценарии
                    </h2>
                </div>

                {badScript?.map(el => {
                    return <div key={badScript.indexOf(el)} id={badScript.indexOf(el)} className='scenario__question scenario__question_bad' onClick={openQuestion}>
                        <div className='box'>

                            <p className={`scenario__text_question`}>{el.title}</p>
                            <div className={`scenario__arrow`}><IconChewron2 /></div>
                        </div>
                        <div className={`scenario__text`} dangerouslySetInnerHTML={{ __html: el.answer }}></div>
                    </div>
                })}
            </div>
        </>
    )
}

export default Scenario;