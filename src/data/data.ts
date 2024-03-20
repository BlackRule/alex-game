import {infm} from "./infm.tsx";
import {Courses} from "./types.ts";
import {bioinfm} from "src/data/bioinfm.tsx";
import {testSubj} from "src/data/testSubj.tsx";
import {infoph} from "src/data/infoph.tsx";
import {infoch} from "src/data/infoch.tsx";


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
  infoph: {
    chapters: infoph,
    text: "Инфофизика",
    tags: ["Полезно знать", "Словарь терминов"],
    bgColor: "#ff6201",
  },
  infoch: {
    chapters: infoch,
    text: "Инфохимия",
    tags: ["Полезно знать", "Словарь терминов"],
    bgColor: "#0053ff",
  },
  test: {
    chapters: testSubj,
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

