import {Question} from "src/data/types.ts";
import {ChangeEvent, ReactElement, useCallback, useState} from "react";
import styles from './SingleChQuestion.module.scss'

export function SingleChQuestion(props: { question: Extract<Question, { type: "single-ch" }>, video?:string }) {
    const [isCorrect, setCorrect] = useState(false)
    const [selectedValue, setSelectedValue] = useState(0)
    const [videoVisible, setVideoVisible] = useState(false)
    const change = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(Number(e.target.value))
    }, [])
    const answer = useCallback(() => {
        if (selectedValue == props.question.correctId) setCorrect(true)
        else setCorrect(false)
    }, [props.question.correctId, selectedValue])
    const options = []
    for (let i = 0; i < props.question.options.length; i++) {
        const o = props.question.options[i]
        options.push(<div key={i}>
            <label style={{display: "flex"}}>
                <input type="radio" value={i} name="option" onChange={change}/>
                <div dangerouslySetInnerHTML={{__html: o}}/>
            </label>

        </div>)
    }
    let verdict =  <div> {isCorrect ? 'Верно' : 'Неверно'} </div> as ReactElement | null
    let tags = null as ReactElement | null
    if (props.question.correctId === -1)  {
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
        <div dangerouslySetInnerHTML={{__html: props.question.text}}/>
        {tags}
        {verdict}
        <div>{options}</div>
        <button onClick={answer}>Ответить</button>
    </div>;
}