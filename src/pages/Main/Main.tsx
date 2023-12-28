import i1 from './img/download1.png'
import i2 from './img/download2.png'
import i3 from './img/3.png'
import i4 from './img/4.png'
import i5 from './img/5.png'
import i6 from './img/6.png'
import i7 from './img/7.png'
import i8 from './img/8.png'
import i9 from './img/9.png'
import i10 from './img/10.png'
import i11 from './img/11.png'
import i12 from './img/12.png'
import i13 from './img/13.png'
import i14 from './img/14.png'
import i15 from './img/15.png'
import i16 from './img/16.png'
// import cpp_alg from './img/cpp_alg.png'
// import cpp from './img/cpp.png'
// import py from './img/py.jpg'
// import py_alg from './img/py_alg.jpg'
// import bio1 from './img/bio1.jpg'
// import bio2 from './img/bio2.jpg'

import style from './Main.module.scss'
import Card from "src/components/Card/Card.tsx";
import {Header} from "src/components/Header/Header.tsx";

function Main() {
  return (
        <div className={style.content}>
            <Header/>
            <div className={style.cards}>
                <Card progress={10} text={"Химия 9 класс"} tags={["Полезно знать"]} image={i1} bgColor={"#4812B2"}
                      className={"chem"} lessonId={"ch8"}/>
                <Card progress={0} text={"Биология 9 класс"} tags={["Полезно знать", "Словарь терминов"]} image={i11}
                      bgColor={"#75b000"} className={"bio"} lessonId={"ch1"}/>
                <Card progress={0} text={"Физика 9 класс"} tags={["Полезно знать"]} image={i13} bgColor={"#A81E69"}
                      lessonId={"ch1"}/>
                <Card progress={0} text={"Информатика и прикладная математика"} tags={["Полезно знать"]} image={i12}
                      bgColor={"#007a4f"} className={"py"} lessonId={"infm"}/>

            </div>
        </div>
  )
}

export default Main
