import {infm} from "./infm.tsx";
import {Courses} from "./types.ts";
import {bioinfm} from "src/data/bioinfm.tsx";


export const courses: Courses = {
  infm: {
    chapters: infm,
    bgColor: "#007a4f", text: "Информатика и прикладная математика",
    tags: ["Полезно знать"],
  },
  bio9: {
    chapters: bioinfm,
    text: "Биоинформатика",
    tags: ["Полезно знать", "Словарь терминов"],
    bgColor: "#75b000",
  },
  test: {
    chapters: bioinfm,
    text: "Тестовый предмет",
    tags: ["позволяет проверить платформу"],
    bgColor: "#ff0101",
  },

}

//todo TS keys of this should match keys of courses
export const coursesQuestionsCount:{ [id: string]: number }={"infm":2,"ch9":0,"bio9":0,"ph9":0}
//todo or use object like in coursesQuestionsCount instead?
export const questionIdToCourseIdMap:Map<string,string>=new Map(Object.entries(
  {"1":"infm","2":"infm"}
))

