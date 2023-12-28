import {useParams} from "react-router-dom";
import {topicsForSubject} from "src/data/data.ts";
import {Test} from "src/data/types.ts";
import {ChangeEvent, useCallback, useRef, useState} from "react";
import {Header} from "src/pages/T2/components/Header/Header.tsx";
import {SingleChTest} from "src/pages/T2/components/SingleChTest/SingleChTest.tsx";
import InfmProblem from "src/pages/T2/components/InfmProblem/InfmProblem.tsx";

function SingleQTest(props: { test: Extract<Test, { type: "single-q" }> }) {
    const [isCorrect, setCorrect] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const answer = useCallback(() => {
        if (inputRef.current === null) return
        if (inputRef.current.value == props.test.correct) setCorrect(true)
        else setCorrect(false)
    }, [props.test.correct])
    return <div style={{display: 'flex', flexDirection: 'column'}}>
        <div dangerouslySetInnerHTML={{__html: props.test.text}}/>
        <div>{isCorrect ? 'Верно' : 'Неверно'}</div>
        <input type="text" ref={inputRef}/>
        <button onClick={answer}>Ответить</button>
    </div>;
}

function MultiQTest(props: { test: Extract<Test, { type: "multi-q" }> }) {
    const [isCorrect, setCorrect] = useState(false)
    // todo
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const inputRefs = []
    const questions = []
    for (let i = 0; i < props.test.questions.length; i++) {
        // todo
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // eslint-disable-next-line react-hooks/rules-of-hooks
        inputRefs.push(useRef<HTMLInputElement>(null))
        questions.push(<div key={i}>
            {props.test.questions[i].text}
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
            if (inputRef.current.value != props.test.questions[i].correct) c = false
        }
        if (c) setCorrect(true)
        else setCorrect(false)
    }, [props.test])
    return <div style={{display: 'flex', flexDirection: 'column'}}>
        <div dangerouslySetInnerHTML={{__html: props.test.text}}/>
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

function MultiChTest(props: { test: Extract<Test, { type: "multi-ch" }> }) {
    const [isCorrect, setCorrect] = useState(false)
    const [selectedValues, setSelectedValues] = useState<number[]>([])
    const change = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSelectedValues((p) => {
            if (e.target.checked) return [...p, Number(e.target.value)]
            else return ArrWOEl(p, Number(e.target.value))
        })
    }, [])
    const answer = useCallback(() => {
        if (JSON.stringify(selectedValues) == JSON.stringify(props.test.correctIds)) setCorrect(true)
        else setCorrect(false)
    }, [props.test.correctIds, selectedValues])
    const options = []
    for (let i = 0; i < props.test.options.length; i++) {
        const o = props.test.options[i]
        options.push(<div key={i}>
            <label style={{display: "flex"}}>
                <input type="checkbox" value={i} name="option" onChange={change}/>
                <div dangerouslySetInnerHTML={{__html: o}}/>
            </label>

        </div>)
    }
    return <div style={{display: 'flex', flexDirection: 'column'}}>
        <div dangerouslySetInnerHTML={{__html: props.test.text}}/>
        <div>{isCorrect ? 'Верно' : 'Неверно'}</div>
        <div>{options}</div>
        <button onClick={answer}>Ответить</button>
    </div>;
}

/*function TextTest(props: { test: Extract<Test, { type: 'text' }> }) {
    const [isCorrect, setCorrect] = useState(false)
    // todo
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const inputRefs = []
    const questions = []
    /!*for (let i = 0; i < props.test.questions.length; i++) {
        // todo
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // eslint-disable-next-line react-hooks/rules-of-hooks
        inputRefs.push(useRef<HTMLInputElement>(null))
        questions.push(<div key={i}>
            {props.test.questions[i].text}
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
            if (inputRef.current.value != props.test.questions[i].correct) c = false
        }
        if (c) setCorrect(true)
        else setCorrect(false)
    }, [props.test])
    return <div style={{display: 'flex', flexDirection: 'column'}}>
        <div dangerouslySetInnerHTML={{__html: props.test.text}}/>
        <div>{isCorrect ? 'Верно' : 'Неверно'}</div>
        {questions}
        <button onClick={answer}>Ответить</button>
    </div>;
}*/

const T2Page = () => {
    const id = useParams()["id"] ?? "";
    //fixme are strings technically
    const [tId, t1Id, t2id, t3id] = id.split('_') as [string, number, number, number]

    let element
    const e = topicsForSubject[tId].t1s[t1Id].t2s[t2id].t3s[t3id]
    switch (e.type) {
        case "problem":
            element=<>
                <SingleChTest test={{type:'single-ch',text:e.text,correctId:-1,options:[
                    'Решил верно, посмотрел видеоразбор',
                        'Решил верно, не смотрел видеоразбор (уверен в решении)',
                        'Решил неверно, посмотрел видеоразбор',
                        'Не решал, но посмотрел видеоразбор'
                    ]}} video={e.video_url} />
            </>
            break;
        case "video":
            element = <div>
                <h1>{topicsForSubject[tId].t1s[t1Id].t2s[t2id].name}</h1>
                <video src={e.url} controls></video>
                <div dangerouslySetInnerHTML={{__html: e.text}}/>
            </div>
            break
        case "testsGroup": {
            const tests = []
            for (let i = 0; i < e.tests.length; i++) {
                const test = e.tests[i]
                switch (test.type) {
                    case "single-q":
                        tests.push(<SingleQTest test={test} key={i}/>)
                        break;
                    case "multi-q":
                        tests.push(<MultiQTest test={test} key={i}/>)
                        break;
                    case "single-ch":
                        tests.push(<SingleChTest test={test} key={i}/>)
                        break;
                    case "multi-ch":
                        tests.push(<MultiChTest test={test} key={i}/>)
                        break;
                    case "text":
                        // tests.push(<TextTest test={test} key={i}/>)
                        break;
                }
            }
            element = <div>
                {tests}
            </div>
            break
        }
        case "infm_problem": {
          element =<InfmProblem prob_id={e.problem_id}/>
        }
    }
    return <>
        <Header tId={tId} t1Id={t1Id}/>
        <div>
            {element}
        </div>
    </>;
};

export default T2Page;
