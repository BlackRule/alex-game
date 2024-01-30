import style from './Main.module.scss'
import CourseCard from "src/components/Card/CourseCard.tsx";
import {Header} from "src/components/Header/Header.tsx";
import {translation} from "src/translation.ts";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useUser} from "src/service.ts";
import {useStore} from "src/store.ts";
import {courses} from "src/data/data.ts";
import i1 from "./img/download1.png";
import i11 from "./img/11.png";
import i13 from "./img/13.png";
import i12 from "./img/12.png";
import {ch9} from "src/data/ch9.ts";
import {ph8} from "src/data/ph8.ts";

//this was extracted from data.ts for npx tsx .\cli.ts to work
//todo TS keys of this should match keys of courses
const courseImage={
  infm: i12,
  ch9: i1,
  bio9: i11,
  ph9:i13
}
function Main() {
  const [language] = [useStore((state) => state.language),useStore((state) => state.set)]
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
              {Object.entries(courses).map(
                ([key, value])=>
                  <CourseCard text={value.text} tags={value.tags} image={courseImage[key]} bgColor={value.bgColor} courseId={key} key={key} userId={user.uid}/>
              )}
            </div>
          </>
          }
        </div>
  )
}

export default Main
