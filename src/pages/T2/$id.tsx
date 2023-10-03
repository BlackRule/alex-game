import {Link, useParams} from "react-router-dom";
import ico1 from './img/ico1.png'
import ico2 from './img/ico2.png'
import ico3 from './img/ico3.png'
import {topicsForSubject} from "src/data/data.ts";
import {T1, Test} from "src/data/types.ts";
import {ChangeEvent, useCallback, useRef, useState} from "react";


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

function SingleChTest(props: { test: Extract<Test, { type: "single-ch" }> }) {
    const [isCorrect, setCorrect] = useState(false)
    const [selectedValue, setSelectedValue] = useState(0)
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
    return <div style={{display: 'flex', flexDirection: 'column'}}>
        <div dangerouslySetInnerHTML={{__html: props.test.text}}/>
        <div>{isCorrect ? 'Верно' : 'Неверно'}</div>
        <div>{options}</div>
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

const T2Page = () => {
    const id = useParams()["id"] ?? "";
    //fixme are strings technically
    const [tId, t1Id, t2id, t3id] = id.split('_') as [string, number, number, number]
    const ts: T1[] = Object.keys(topicsForSubject).includes(tId) ?
        topicsForSubject[tId] : []
    const links = []
    for (let i1 = 0; i1 < ts[t1Id].t2s.length; i1++) {
        const t2 = ts[t1Id].t2s[i1];
        for (let i2 = 0; i2 < t2.t3s.length; i2++) {
            const t3 = t2.t3s[i2];
            let i;
            switch (t3.type) {
                case "video":
                    i = ico1
                    break
                case "testsGroup":
                    i = ico2
                    break
                case "problem":
                    i = ico3
                    break
            }
            links.push(<Link to={`/T2/${tId}_${t1Id}_${i1}_${i2}`} key={`${tId}_${t1Id}_${i1}_${i2}`}><img src={i}
                                                                                                           alt=""/></Link>)
        }
    }
    let element
    const e = topicsForSubject[tId][t1Id].t2s[t2id].t3s[t3id]
    switch (e.type) {
        case "problem":
            break;
        case "video":
            element = <div>
                <h1>{topicsForSubject[tId][t1Id].t2s[t2id].name}</h1>
                <video src={e.url} controls></video>
                <div dangerouslySetInnerHTML={{__html: e.text}}/>
            </div>
            break
        case "testsGroup":
            const tests = []
            for (let i = 0; i < e.tests.length; i++) {
                const test = e.tests[i]; //for TS
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

                }
            }
            element = <div>
                {tests}
            </div>
            break
    }
    return <>
        <Link to={`/Lesson/${tId}`}>Назад</Link>
        <div>
            {links}
        </div>
        <div>
            {element}
        </div>
    </>;
};

export default T2Page;
