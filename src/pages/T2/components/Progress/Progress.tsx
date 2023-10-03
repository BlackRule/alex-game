import style from "./Progress.module.scss";

export function Progress(props: { /*from 0 to 100*/ progress: number,className?:string }) {
    return <div className={`${style.progress} ${props.className}`}>
        <div className={style["progress-inner"]} style={{width: `${props.progress}%`}}></div>
    </div>;
}
