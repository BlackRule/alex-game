

import style from './Main.module.scss'
import Card from "src/components/Card/Card.tsx";
import {Header} from "src/components/Header/Header.tsx";
import {translation} from "src/translation.ts";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useUser} from "src/service.ts";
import {useStore} from "src/store.ts";
import {subjects} from "src/data/data.ts";

function Main() {
  const [language,setLanguage] = [useStore((state) => state.language),useStore((state) => state.set)]
  const user = useUser()
  const navigate = useNavigate()
  return (
        <div className={style.content}>
            <Header/>
          {user === null ?
            <Button variant={'contained'} onClick={()=>
              navigate('/login')}>
              {translation[language].login}
            </Button>
            :
          <>
            <div className={style.cards}>
              {Object.entries(subjects).map(
                ([key, value])=>
                  <Card progress={0} text={value.text} tags={value.tags} image={value.image} bgColor={value.bgColor} lessonId={key}/>
              )}
            </div>
          </>
          }
        </div>
  )
}

export default Main
