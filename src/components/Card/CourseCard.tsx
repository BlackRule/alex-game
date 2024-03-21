import style from './Card.module.scss'
import {Link} from "react-router-dom";
import {Progress} from "src/components/Progress/Progress.tsx";
import {useDocumentData} from "react-firebase-hooks/firestore";
import {doc} from "firebase/firestore";
import {db} from "src/firebase.ts";
import {coursesQuestionsCount} from "src/data/data.ts";
function CourseCard(props: { image: string, bgColor: string, text: string, tags?: string[], className?:string, image2?: string, courseId: string,userId:string|null }) {
    const [course]=useDocumentData(props.userId!==null?doc(db, `users/${props.userId}/courses/`,props.courseId):undefined)
    const sc=course?.solvedCorrectly??0
    const st=coursesQuestionsCount[props.courseId]
    return <div className={style.Card + ' ' + props.className} style={{backgroundColor: props.bgColor}}>
        <div className={style.bg} style={{backgroundImage: `url(${props.image}),url(${props.image2})`}}></div>
        <div className={style["card-top"]}>
            <Progress progress={sc/st*100}/>
            <div className={style.text}>{props.text}</div>
            <div className={style.tags}>{props.tags && props.tags.map((v, i) =>
                <div className={style.tag} key={i}>{v}</div>
            )}</div>
        </div>
        <Link to={`Course/${props.courseId}`} className={style.button}>{"Продолжить"}</Link>
    </div>
}

export default CourseCard