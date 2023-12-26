import logo from "./logo.png";
import {Link} from "react-router-dom";
import styles from "./Header.module.scss"
import Dropdown from 'react-bootstrap/Dropdown';
import {useStore} from "src/store.ts";
import {translation} from "src/data/translation.ts";

export function Header() {
  const [language,setLanguage] = [useStore((state) => state.language),useStore((state) => state.set)]
  return <>
    <Link className={styles.logo} to={'/'}><img src={logo} alt="logo"/><span>Alex-Bort</span> <span>School</span></Link>
    <div className={styles.header}>
      <h1>Alex's Bortulev science games</h1>
      <Link to={"/reviews"} className={styles.b1}>{translation[language].reviews}</Link>
      <div className={styles.b2}>
        <span className="material-symbols-outlined">pending_actions</span>
        анкеты
      </div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Язык/Language: {language}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={()=>setLanguage('ru')}>Русский</Dropdown.Item>
          <Dropdown.Item onClick={()=>setLanguage('en')}>English</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  </>
}

