import logo from "./logo.png";
import {Link} from "react-router-dom";
import styles from "./Header.module.scss"
import Dropdown from 'react-bootstrap/Dropdown';

export function Header() {
  return <>
    <Link className={styles.logo} to={'/'}><img src={logo} alt="logo"/><span>Alex-Bort</span> <span>School</span></Link>
    <div className={styles.header}>
      <h1>Alex's Bortulev science games</h1>
      <Link to={"/reviews"} className={styles.b1}>отзывы</Link>
      <div className={styles.b2}>
        <span className="material-symbols-outlined">pending_actions</span>
        анкеты
      </div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Язык/Language
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>Русский</Dropdown.Item>
          <Dropdown.Item>English</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  </>
}

