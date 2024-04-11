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
  },
  bio9: {
    chapters: bioinfm,
    text: "Биоинформатика",
    bgColor: "#75b000",
  },
  infoph: {
    chapters: infoph,
    text: "Инфофизика",
    bgColor: "#A81E69",
  },
  infoch: {
    chapters: infoch,
    text: "Инфохимия",
    bgColor: "#4812B2",
  },
/*  test: {
    chapters: testSubj,
    text: "Тестовый предмет",
    tags: ["позволяет проверить платформу"],
    bgColor: "#ff0101",
  },*/

}

export type coursesQuestionsCountT = { [id: string]: number };

//todo TS keys of this should match keys of courses
export const coursesQuestionsCount:coursesQuestionsCountT={"infm":12,"bio9":10,"infoph":7,"infoch":5}
//todo or use object like in coursesQuestionsCount instead?
export const questionIdToCourseIdMap:Map<string,string>=new Map(Object.entries(
  {"3":"infm","4":"infm","5":"bio9","6":"bio9","7":"bio9","8":"bio9","9":"infm","10":"infm","11":"infm","12":"infm","13":"infm","14":"infm","15":"infm","16":"infm","17":"infm","18":"infm","19":"infoch","20":"bio9","21":"bio9","22":"bio9","23":"bio9","24":"bio9","25":"bio9","26":"infoph","27":"infoph","28":"infoph","29":"infoph","30":"infoph","31":"infoph","32":"infoch","33":"infoch","34":"infoch","35":"infoch","36":"infoph"}
))

