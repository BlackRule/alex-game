import {Link, useParams} from "react-router-dom";
import styles from './style.module.scss'
import {Progress} from "./components/Progress/Progress.tsx";
import {courses} from "src/data/data.ts";
import {Chapter} from "src/data/types.ts";



const CoursePage = () => {
    const id = useParams()["id"] ?? "";
    const chapters: Chapter[] = Object.keys(courses).includes(id) ?
        courses[id].chapters : []
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

        <div className={styles.chapters}>
            {chapters.map((t, i) =>
              <Link key={`/topic/${id}_${i}_0_0`} to={`/topic/${id}_${i}_0_0`}>{t.name}</Link>
            )}
        </div>
    </>;
};

export default CoursePage;
