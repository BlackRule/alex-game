import {Link, useParams} from "react-router-dom";
import styles from './style.module.scss'
import {Progress} from "./components/Progress/Progress.tsx";
import {courses, coursesQuestionsCount} from "src/data/data.ts";
import {Chapter} from "src/data/types.ts";
import {useDocumentData} from "react-firebase-hooks/firestore";
import {doc} from "firebase/firestore";
import {db} from "src/firebase.ts";
import {useUser} from "src/service.ts";

const CoursePage = () => {
    const user = useUser()
    const id = useParams()["id"] ?? "";
    const chapters: Chapter[] = Object.keys(courses).includes(id) ?
        courses[id].chapters : []
    const [course]=useDocumentData(user!==null?doc(db, `users/${user.uid}/courses/`,id):undefined)
    const sc=course?.solvedCorrectly??0
    const st=coursesQuestionsCount[id]
    return <>
        <header>
            <div className={styles.name}>{courses[id].text}</div>
            <div className={styles.lines}>
                <div>Прогресс</div>
                <Progress progress={sc/st*100} className={styles.progress}/>
                <div>{sc} из {st}</div>
               {/* <div>Дни</div>
                <Progress progress={50} className={styles.progress}/>
                <div>54 из 128</div>*/}
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
