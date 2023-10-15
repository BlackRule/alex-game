import style from "src/pages/Main/Main.module.scss";
import logo from "./logo.png";
import {Link} from "react-router-dom";

export function Header() {
  return <>
    <Link className={style.logo} to={'/'}><img src={logo} alt="logo"/><span>Alex-Bort</span> <span>School</span></Link>
    <div className={style.header}>
      <h1>Alex's Bortulev science games</h1>
      <Link to={"/reviews"} className={style.b1}>отзывы</Link>
      <div className={style.b2}>
        <span className="material-symbols-outlined">pending_actions</span>
        анкеты
      </div>
    </div>
  </>
}

