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
                    <div onClick={() => setVideoVisible(false)} className={styles["close-button"]}/>
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