import {ch8} from "src/data/ch8.ts";
import {infm} from "src/data/infm.ts";
import {ch9} from "src/data/ch9.ts";
import {ph8} from "src/data/ph8.ts";
import {TopicsForSubject, Type} from "src/data/types.ts";

export const colors:{[color in Type]:string}= {
    chem:"#4812B2",
    bio:"#75b000",
    phy:"#A81E69",
    infm:"#007a4f"
}

export const topicsForSubject: TopicsForSubject = {
    ch8: {type:"chem",t1s:ch8},
    infm: {type:"infm",t1s:infm},
}