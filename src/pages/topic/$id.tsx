import {useParams} from "react-router-dom";
import {courses} from "src/data/data.ts";
import {Question} from "src/data/types.ts";
import {ChangeEvent, RefObject, useCallback, useRef, useState} from "react";
import {Header} from "src/pages/topic/components/Header/Header.tsx";
import {SingleChQuestion} from "src/pages/topic/components/SingleChQuestion/SingleChQuestion.tsx";
import InfmProblem from "src/pages/topic/components/InfmProblem/InfmProblem.tsx";
import {NumericalString} from "src/types.ts";
import {MathJax} from "better-react-mathjax";

function SingleQQuestion(props: { question: Extract<Question, { type: "single-q" }> }) {
    const [isCorrect, setCorrect] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const answer = useCallback(() => {
        if (inputRef.current === null) return
        if (inputRef.current.value === props.question.correct) setCorrect(true)
        else setCorrect(false)
    }, [props.question.correct])
    return <div style={{display: 'flex', flexDirection: 'column'}}>
        <div dangerouslySetInnerHTML={{__html: props.question.text}}/>
        <div>{isCorrect ? 'Верно' : 'Неверно'}</div>
        <input type="text" ref={inputRef}/>
        <button onClick={answer}>Ответить</button>
    </div>;
}

function MultiQQuestion(props: { question: Extract<Question, { type: "multi-q" }> }) {
    const [isCorrect, setCorrect] = useState(false)
    // todo
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const inputRefs:RefObject<HTMLInputElement>[] = []
    const questions:JSX.Element[] = []
    for (let i = 0; i < props.question.questions.length; i++) {
        // todo
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // eslint-disable-next-line react-hooks/rules-of-hooks
        inputRefs.push(useRef<HTMLInputElement>(null))
        questions.push(<div key={i}>
            {props.question.questions[i].text}
            <input type="text" ref={inputRefs[i]}/>
        </div>)
    }
    const answer = useCallback(() => {
        let c = true
        for (let i = 0; i < inputRefs.length; i++) {
            // todo
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const inputRef = inputRefs[i]
            if (inputRef.current === null) return
            if (inputRef.current.value !== props.question.questions[i].correct) c = false
        }
        if (c) setCorrect(true)
        else setCorrect(false)
    }, [props.question])
    return <div style={{display: 'flex', flexDirection: 'column'}}>
        <div dangerouslySetInnerHTML={{__html: props.question.text}}/>
        <div>{isCorrect ? 'Верно' : 'Неверно'}</div>
        {questions}
        <button onClick={answer}>Ответить</button>
    </div>;
}

function ArrWOEl<T>(arr: T[], el: T) {
    const array = [...arr]
    const index = array.indexOf(el)
    if (index !== -1) {
        array.splice(index, 1);
        return array;
    }
    return arr
}

function MultiChQuestion(props: { question: Extract<Question, { type: "multi-ch" }> }) {
    const [iscorrect, setcorrect] = useState(false)
    const [selectedvalues, setselectedvalues] = useState<number[]>([])
    const change = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setselectedvalues((p) => {
            if (e.target.checked) return [...p, Number(e.target.value)]
            else return ArrWOEl(p, Number(e.target.value))
        })
    }, [])
    const answer = useCallback(() => {
        if (JSON.stringify(selectedvalues) === JSON.stringify(props.question.correctIds)) setcorrect(true)
        else setcorrect(false)
    }, [props.question.correctIds, selectedvalues])
    const options:JSX.Element[] = []
    for (let i = 0; i < props.question.options.length; i++) {
        const o = props.question.options[i]
        options.push(<div key={i}>
            <label style={{display: "flex"}}>
                <input type="checkbox" value={i} name="option" onChange={change}/>
                <div dangerouslySetInnerHTML={{__html: o}}/>
            </label>

        </div>)
    }
    return <div style={{display: 'flex', flexDirection: 'column'}}>
        <div dangerouslySetInnerHTML={{__html: props.question.text}}/>
        <div>{iscorrect ? 'верно' : 'неверно'}</div>
        <div>{options}</div>
        <button onClick={answer}>ответить</button>
    </div>;
}

/*function TextQuestion(props: { question: Extract<Question, { type: 'text' }> }) {
    const [isCorrect, setCorrect] = useState(false)
    // todo
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const inputRefs = []
    const questions = []
    /!*for (let i = 0; i < props.question.questions.length; i++) {
        // todo
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // eslint-disable-next-line react-hooks/rules-of-hooks
        inputRefs.push(useRef<HTMLInputElement>(null))
        questions.push(<div key={i}>
            {props.question.questions[i].text}
            <input type="text" ref={inputRefs[i]}/>
        </div>)
    }*!/
    const answer = useCallback(() => {
        let c = true
        for (let i = 0; i < inputRefs.length; i++) {
            // todo
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const inputRef = inputRefs[i]
            if (inputRef.current === null) return
            if (inputRef.current.value != props.question.questions[i].correct) c = false
        }
        if (c) setCorrect(true)
        else setCorrect(false)
    }, [props.question])
    return <div style={{display: 'flex', flexDirection: 'column'}}>
        <div dangerouslySetInnerHTML={{__html: props.question.text}}/>
        <div>{isCorrect ? 'Верно' : 'Неверно'}</div>
        {questions}
        <button onClick={answer}>Ответить</button>
    </div>;
}*/

const TopicPage = () => {
    const id = useParams()["id"] ?? "";
    const [tId, t1Id, topicId, taskId] = id.split('_') as [string, NumericalString, NumericalString, NumericalString]

    let element
    const e = courses[tId].chapters[t1Id].topics[topicId].tasks[taskId]
    switch (e.type) {
        case "problem-with-video-solution":
            element=<>
                <SingleChQuestion question={{type:'single-ch',id:e.id,text:e.text,correctId:-1,options:[
                    'Решил верно, посмотрел видеоразбор',
                        'Решил верно, не смотрел видеоразбор (уверен в решении)',
                        'Решил неверно, посмотрел видеоразбор',
                        'Не решал, но посмотрел видеоразбор'
                    ]}} video={e.video_url} />
            </>
            break;
        case "problem-with-no-solution-needed":
            element=<>
            {e.text}
            </>
            break;
        case "video":
            element = <div>
                <h1>{courses[tId].chapters[t1Id].topics[topicId].name}</h1>
                <video src={e.url} controls></video>
                <div dangerouslySetInnerHTML={{__html: e.text}}/>
            </div>
            break
        case "questionsGroup": {
            const questions:JSX.Element[] = []
            for (let i = 0; i < e.questions.length; i++) {
                const question = e.questions[i]
                switch (question.type) {
                    case "single-q":
                        questions.push(<SingleQQuestion question={question} key={i}/>)
                        break;
                    case "multi-q":
                        questions.push(<MultiQQuestion question={question} key={i}/>)
                        break;
                    case "single-ch":
                        questions.push(<SingleChQuestion question={question} key={i}/>)
                        break;
                    case "multi-ch":
                        questions.push(<MultiChQuestion question={question} key={i}/>)
                        break;
                    case "text":
                        // questions.push(<TextQuestion question={question} key={i}/>)
                        break;
                    case "programming-problem": {
                        questions.push(<InfmProblem question={question} key={i}/>)
                        break;
                    }
                }
            }
            element = <div>
                {questions}
            </div>
            break
        }
        
    }
    return <>
        <Header tId={tId} t1Id={t1Id}/>
        <MathJax>
            {element}
        </MathJax>
    </>;
};

export default TopicPage;
