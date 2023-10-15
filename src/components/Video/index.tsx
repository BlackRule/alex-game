import styles from './styles.module.scss'
import {useEffect, useRef} from "react";

type VideoType='t1'|'t2'
export default function Video(props: { onClick: () => void ,videoType: VideoType, thumbnail: string} ) {
    return <div className={props.videoType === 't1' ? styles.t1 : styles.t2} style={{backgroundImage: `url(${props.thumbnail})`}} onClick={props.onClick}>
        <div className={styles.hover}/>
    </div>;
}