import {Link, useParams} from "react-router-dom";
import ico1 from './img/ico1.png'
import ico2 from './img/ico2.png'
import ico3 from './img/ico3.png'
import {T1, topicsForSubject} from "src/data.ts";



const T1p = () => {
    const id = useParams()["id"] ?? "";
    //fixme are strings technically
    const [tId,t1Id,t2id,t3id]=id.split('_') as [string, number, number, number]
    const ts: T1[] = Object.keys(topicsForSubject).includes(tId) ?
        topicsForSubject[tId] : []
    const links=[]
    for (let i1 = 0; i1 < ts[t1Id].t2s.length; i1++){
        const t2 = ts[t1Id].t2s[i1];
        for (let i2 = 0; i2 < t2.t3s.length; i2++){
            const t3 = t2.t3s[i2];
            let i;
            switch (t3.type){
                case "video":
                    i=ico1
                    break
                case "test":
                    i=ico2
                    break
                case "problem":
                    i=ico3
                    break
            }
            links.push(<Link to={`/T1/${tId}_${t1Id}_${i1}_${i2}`}><img src={i} alt=""/></Link>)
        }
    }
    let element
    const e=topicsForSubject[tId][t1Id].t2s[t2id].t3s[t3id]
    switch (e.type){
        case "video":
            element=<div>
                <h1>{topicsForSubject[tId][t1Id].t2s[t2id].name}</h1>
                <video src={e.url} controls></video>
                <div dangerouslySetInnerHTML={{__html: e.text}}/>
            </div>
    }
    return <>
        <Link to={`/Lesson/${tId}`}>Назад</Link>
        <div >
            {links}
        </div>
        <div>
            {element}
        </div>
    </>;
};

export default T1p;
