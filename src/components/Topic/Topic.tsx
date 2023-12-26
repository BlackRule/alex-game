import styles from "./Topic.module.scss";

function Topic(props: { v: string, img }) {
    return <div className={styles.topic}><img src={props.img} alt=""/>{props.v}</div>;
}
export default Topic