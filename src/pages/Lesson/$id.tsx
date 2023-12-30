import {Link, useParams} from "react-router-dom";
import styles from './style.module.scss'
import {Progress} from "./components/Progress/Progress.tsx";
import {topicsForSubject} from "src/data/data.ts";
import {T1} from "src/data/types.ts";



const Lesson = () => {
    const id = useParams()["id"] ?? "";
    const topics: T1[] = Object.keys(topicsForSubject).includes(id) ?
        topicsForSubject[id].t1s : []
    return <>
        <header>
            <div className={styles.name}>Химия 8 класс</div>
            <div className={styles.lines}>
                <div>Уроков</div>
                <Progress progress={50} className={styles.progress}/>
                <div>133 из 198</div>
                <div>Дни</div>
                <Progress progress={50} className={styles.progress}/>
                <div>54 из 128</div>
            </div>
            <Link to={"/"}>Назад</Link>
        </header>

        <div className={styles.topics}>
            {topics.map((t, i) =>
              <Link key={`/T2/${id}_${i}_0_0`} to={`/T2/${id}_${i}_0_0`}>{t.name}</Link>
            )}
        </div>
    </>;
};

export default Lesson;
