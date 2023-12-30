import logo from "./logo.png";
import {Link, useNavigate} from "react-router-dom";
import styles from "./Header.module.scss"
import Dropdown from 'react-bootstrap/Dropdown';
import {useStore} from "src/store.ts";
import {translation} from "src/translation.ts";
import {Button} from "@mui/material";
import {useCallback} from "react";
import {useUser} from "src/service.ts";
import {signOut} from 'firebase/auth'
import {auth} from '../../firebase.ts'

export function Header() {
  const user = useUser()
  const navigate = useNavigate()
  const handleLogout = useCallback(
    () => {
      signOut(auth).then(() => {
        // Sign-out successful.
        navigate('/')
        console.log('Signed out successfully')
      }).catch((error) => {
        // An error happened.
      })
    },
    [navigate],
  )
  const [language,setLanguage] = [useStore((state) => state.language),useStore((state) => state.set)]
  return <>
    <div className={styles.line}>
      <Link className={styles.logo} to={'/'}><img src={logo} alt="logo"/><span>Alex-Bort</span>
      <span>School</span></Link>
      <div className={styles.subline}>{user === null ? null :
        <Button variant={'contained'} onClick={handleLogout}>
          {translation[language].logout}
        </Button>}
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Язык/Language: {language}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setLanguage('ru')}>Русский</Dropdown.Item>
            <Dropdown.Item onClick={() => setLanguage('en')}>English</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown></div>
    </div>
    <div className={styles.line}>
      <h1>Alex's Bortulev science games</h1>
      <Link to={"/reviews"} className={styles.b1}>{translation[language].reviews}</Link>
      <div className={styles.b2}>
        <span className="material-symbols-outlined">pending_actions</span>
        анкеты
      </div>

    </div>
  </>
}

