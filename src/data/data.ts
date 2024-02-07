import {infm} from "./infm.tsx";
import {Courses} from "./types.ts";


export const courses: Courses = {
  infm: {
    chapters: infm,
    bgColor: "#007a4f", text: "Информатика и прикладная математика",
    tags: ["Полезно знать"],
  },
  ch9: {
    chapters: [],
    text: "Химия 9 класс",
    tags: ["Полезно знать"],
    bgColor: "#4812B2",
  },
  bio9: {
    chapters: [],
    text: "Биология 9 класс",
    tags: ["Полезно знать", "Словарь терминов"],
    bgColor: "#75b000",
  },
  ph9: {
    chapters: [],
    text: "Физика 9 класс",
    tags: ["Полезно знать"],
    bgColor: "#A81E69",
  },
}

//todo TS keys of this should match keys of courses
export const coursesQuestionsCount:{ [id: string]: number }={"infm":2,"ch9":0,"bio9":0,"ph9":0}
//todo or use object like in coursesQuestionsCount instead?
export const questionIdToCourseIdMap:Map<string,string>=new Map(Object.entries(
  {"1":"infm","2":"infm"}
))

