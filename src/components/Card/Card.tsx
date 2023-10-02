import style from './Card.module.scss'
import {Link} from "react-router-dom";
import {Progress} from "src/components/Progress/Progress.tsx";



function Card(props: { image: string, bgColor: string, progress: number, text: string, tags: string[], className?:string, image2?: string, lessonId: string }) {
    return <div className={style.Card + ' ' + props.className} style={{backgroundColor: props.bgColor}}>
        <div className={style.bg} style={{backgroundImage: `url(${props.image}),url(${props.image2})`}}></div>
        <div className={style["card-top"]}>
            <Progress progress={props.progress}/>
            <div className={style.text}>{props.text}</div>
            <div className={style.tags}>{props.tags.map((v, i) =>
                <div className={style.tag} key={i}>{v}</div>
            )}</div>
        </div>
        <Link to={`Lesson/${props.lessonId}`} className={style.button}>{"Продолжить"}</Link>
    </div>
        ;
}

export default Card