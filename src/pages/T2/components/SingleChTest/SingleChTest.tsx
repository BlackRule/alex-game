import {Test} from "src/data/types.ts";
import {ChangeEvent, ReactElement, useCallback, useState} from "react";
import styles from './SingleChTest.module.scss'

export function SingleChTest(props: { test: Extract<Test, { type: "single-ch" }>, video?:string }) {
    const [isCorrect, setCorrect] = useState(false)
    const [selectedValue, setSelectedValue] = useState(0)
    const [videoVisible, setVideoVisible] = useState(false)
    const change = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(Number(e.target.value))
    }, [])
    const answer = useCallback(() => {
        if (selectedValue == props.test.correctId) setCorrect(true)
        else setCorrect(false)
    }, [props.test.correctId, selectedValue])
    const options = []
    for (let i = 0; i < props.test.options.length; i++) {
        const o = props.test.options[i]
        options.push(<div key={i}>
            <label style={{display: "flex"}}>
                <input type="radio" value={i} name="option" onChange={change}/>
                <div dangerouslySetInnerHTML={{__html: o}}/>
            </label>

        </div>)
    }
    let verdict =  <div> {isCorrect ? 'Верно' : 'Неверно'} </div> as ReactElement | null
    let tags = null as ReactElement | null
    if (props.test.correctId === -1)  {
        verdict = null
        tags = <>
        {videoVisible?
            <>
                <div className={styles["video-top"]}>
                    <div>Видеоразбор</div>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=>setVideoVisible(false)} className={styles["close-button"]}>
                        <path
                            d="M13.3002 0.709971C12.9102 0.319971 12.2802 0.319971 11.8902 0.709971L7.00022 5.58997L2.11022 0.699971C1.72022 0.309971 1.09021 0.309971 0.700215 0.699971C0.310215 1.08997 0.310215 1.71997 0.700215 2.10997L5.59022 6.99997L0.700215 11.89C0.310215 12.28 0.310215 12.91 0.700215 13.3C1.09021 13.69 1.72022 13.69 2.11022 13.3L7.00022 8.40997L11.8902 13.3C12.2802 13.69 12.9102 13.69 13.3002 13.3C13.6902 12.91 13.6902 12.28 13.3002 11.89L8.41021 6.99997L13.3002 2.10997C13.6802 1.72997 13.6802 1.08997 13.3002 0.709971Z"
                            fill="#9194A1"></path>
                    </svg >
                </div>
                <video src={props.video} controls></video>
            </> :
            <div className={styles.tag} onClick={()=>setVideoVisible(true)}>Видеоразбор</div>
    }
        </>
    }
    return <div style={{display: 'flex', flexDirection: 'column'}}>
        <div dangerouslySetInnerHTML={{__html: props.test.text}}/>
        {tags}
        {verdict}
        <div>{options}</div>
        <button onClick={answer}>Ответить</button>
    </div>;
}