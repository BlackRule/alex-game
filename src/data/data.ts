import {infm} from "src/data/infm.ts";
import {ch9} from "src/data/ch9.ts";
import {ph8} from "src/data/ph8.ts";
import {Subject} from "src/data/types.ts";
import Card from "src/components/Card/Card.tsx";
import i1 from "./img/download1.png";
import i11 from "./img/11.png";
import i13 from "./img/13.png";
import i12 from "./img/12.png";


export const subjects: Subject = {
  infm: {
    t1s: infm,
    bgColor: "#007a4f", text: "Информатика и прикладная математика",
    tags: ["Полезно знать"],
    image: i12
  },
  ch9: {
    t1s: [],
    text: "Химия 9 класс",
    tags: ["Полезно знать"],
    image: i1,
    bgColor: "#4812B2",
  },
  bio9: {
    t1s: [],
    text: "Биология 9 класс",
    tags: ["Полезно знать", "Словарь терминов"],
    image: i11,
    bgColor: "#75b000",
  },
  ph9: {
    t1s: [],
    text: "Физика 9 класс",
    tags: ["Полезно знать"],
    image: i13,
    bgColor: "#A81E69",
  }
}