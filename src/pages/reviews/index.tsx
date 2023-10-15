import {Header} from "src/components/Header/Header.tsx";
import v1 from './0001h.mp4'
import v1s from './1.png'
import v2 from './0002h.mp4'
import v2s from './2.png'
import v3 from './0003h.mp4'
import v3s from './3.png'
import v4 from './0004v.mp4'
import v4s from './4.png'
import styles from './reviews.module.scss'
import {useState} from "react";
import Video from "src/components/Video";



function Reviews() {
    const [video, setVideo] = useState('')
    return (
        <>
            <Header/>
            <div className={styles.content}>
                <div className={styles.l}>Поступай в <br/> Alex Bort School</div>
                <div className={styles.videos}>
                    <Video onClick={() => setVideo(v2)} videoType={'t1'} thumbnail={v2s}/>
                    <Video videoType={'t2'} thumbnail={v1s} onClick={() => setVideo(v1)}/>
                    <Video videoType={'t2'} thumbnail={v3s} onClick={() => setVideo(v3)}/>
                    <Video videoType={'t1'} thumbnail={v4s} onClick={() => setVideo(v4)}/>
                </div>
            </div>
            {video !== '' ?
                <>
                    <div className={styles.backdrop}></div>
                    <div className={styles["video-overlay"]}>
                        <div className={styles["close-button"]} onClick={() => setVideo('')}/>
                        <video src={video} controls autoPlay/>
                    </div>
                </>
                : null}
        </>
    );
}

export default Reviews;