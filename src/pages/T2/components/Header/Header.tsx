import {Link} from "react-router-dom";
import styles from './Header.module.scss'
import ico1 from "src/pages/T2/img/ico1.png";
import ico2 from "src/pages/T2/img/ico2.png";
import ico3 from "src/pages/T2/img/ico3.png";
import {T1} from "src/data/types.ts";
import {subjects} from "src/data/data.ts";
import {NumericalString} from "src/types.ts";

export function Header(props: { tId: string,t1Id:NumericalString } ) {
    const t1Id=props.t1Id
    const ts: T1[] = Object.keys(subjects).includes(props.tId) ?
        subjects[props.tId].t1s : []
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
                case "questionsGroup":
                    i = ico2
                    break
                case "problem-with-no-solution-needed":
                    i = ico3
                    break
            }
            links.push(
    <Link to={`/T2/${props.tId}_${t1Id}_${i1}_${i2}`} key={`${i1}_${i2}`} className={styles["link-ico"]} style={{backgroundImage:`url(${i})`}}/>)
        }
    }
    return <><Link to={`/Lesson/${props.tId}`}>Назад</Link>
        <div className={styles.Header}
             style={{backgroundColor:subjects[props.tId].bgColor}}>
            {links}
        </div>
    </>;
}