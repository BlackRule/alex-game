import {Link} from "react-router-dom";
import styles from './Header.module.scss'
import ico1 from "src/pages/topic/img/ico1.png";
import ico2 from "src/pages/topic/img/ico2.png";
import ico3 from "src/pages/topic/img/ico3.png";
import back_arrow from "./back-arrow.svg";
import {Chapter} from "src/data/types.ts";
import {courses} from "src/data/data.ts";
import {NumericalString} from "src/types.ts";
import clsx from 'clsx';

export function Header(props: { tId: string,t1Id:NumericalString,currentTaskId:NumericalString } ) {
    const t1Id=props.t1Id
    const ts: Chapter[] = Object.keys(courses).includes(props.tId) ?
        courses[props.tId].chapters : []
    const links:JSX.Element[] = []
    for (let i1 = 0; i1 < ts[t1Id].topics.length; i1++) {
        const topic = ts[t1Id].topics[i1];
        for (let i2 = 0; i2 < topic.tasks.length; i2++) {
            const task = topic.tasks[i2];
            let i;
            switch (task.type) {
                case "video":
                    i = ico1
                    break
                case "questionsGroup":
                    i = ico2
                    break
                case "problem-with-no-solution-needed":
                    i = ico3
                    break
            }
            links.push(
    <Link to={`/topic/${props.tId}_${t1Id}_${i1}_${i2}`} key={`${i1}_${i2}`} className={clsx(styles["link-ico"],{[styles.selected]:`${i2}`===props.currentTaskId})} style={{backgroundImage:`url(${i})`}}>{i2}</Link>)
        }
    }
    return <div className={styles.Header}
             style={{backgroundColor:courses[props.tId].bgColor}}>
            <Link to={`/Course/${props.tId}`} className={styles.back_arrow}><img src={back_arrow} alt="назад"/></Link>{links}
        </div>
}