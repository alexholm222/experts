import { useEffect, useRef, useState } from 'react';
import s from './CallPlan.module.scss';
import { useSelector } from 'react-redux';
import { ReactComponent as IconText } from '../../image/work/iconText.svg';
import LoaderForScript from '../Loader/LoaderForScript';
//selector
import { selectorWork } from '../../store/reducer/Work/selector';

const CallPlan = ({ loadClose, loadVisible, sidebarHiden }) => {
    const dialog = useSelector(selectorWork).dialog;
    const [textBig, setTextBig] = useState(JSON.parse(localStorage.getItem('switchText')) || false);
    const [textAnim, setTextAnim] = useState(false);
    const [heightBlock, setHeightBlock] = useState(900);
    const [textVis, setTextVis] = useState(false);
    const textSmallRef = useRef();
    const textBigRef = useRef();
    const textSmallHeight = sidebarHiden ? textSmallRef?.current?.offsetHeight + 34.1 : textSmallRef?.current?.offsetHeight + 34;
    const textBigHeight = sidebarHiden ? textBigRef?.current?.offsetHeight + 34.1 : textBigRef?.current?.offsetHeight + 34;;

    useEffect(() => {
        setTimeout(() => {
            textBig ? setHeightBlock(textBigHeight) : setHeightBlock(textSmallHeight)
        }, 100)

    }, [textBig, textBigHeight, textSmallHeight, sidebarHiden]);


    useEffect(() => {
        setTimeout(() => {
            setTextVis(true)
        })
    }, [])

    const handleActive = () => {
        setTextAnim(true);
        setTimeout(() => {
            setTextAnim(false);
        }, 50)
        if (textBig) {
            setHeightBlock(textSmallHeight)
            setTimeout(() => {
                setTextBig(false)
                localStorage.setItem('switchText', JSON.stringify(false));
            }, 200)
        } else {
            setTimeout(() => {
                setTextBig(true)
                localStorage.setItem('switchText', JSON.stringify(true));
            }, 200)
        }
    }

    return (
        <div style={{ height: `${heightBlock}px` }} className={s.plan}>
            <div className={s.header}>
                <p className={s.title}>План разговора</p>
                <div className={`${s.container} ${textBig && s.container_big}`}>
                    <IconText />
                    <div onClick={handleActive} className={`${s.switch} ${textBig && s.switch_on}`}>
                        <div></div>
                    </div>
                </div>

            </div>
            {textVis && <div dangerouslySetInnerHTML={{ __html: dialog }} className={`${s.text} ${textAnim && s.text_anim}  ${loadClose && s.text_load} ${textBig && s.text_big}`}/>}

             {loadClose && <LoaderForScript load={loadVisible} />}
                <div dangerouslySetInnerHTML={{ __html: dialog }} ref={textBigRef} className={`${s.text} ${s.text_hiden} ${s.text_big}`} />

                <div dangerouslySetInnerHTML={{ __html: dialog }} ref={textSmallRef} className={`${s.text} ${s.text_hiden}`} />
            </div>
    )
};

            export default CallPlan;
