import {CSSProperties} from "react";
import {NumericalString} from "src/types.ts";

export type ProgrammingProblem = { type: "programming-problem", problem_id: NumericalString };
export type SingleQ = { type: "single-q", correct: string };
export type MultiQ = { type: "multi-q", questions: { text: string, correct: string }[] };
export type SingleCh = { type: "single-ch", options: string[], correctId: number };
export type MultiCh = { type: "multi-ch", options: string[], correctIds: number[] };
export type Text = { type: "text", text: string, answers:string[] };
export type Test = {id:string}&({text:string}&(SingleQ | MultiQ | SingleCh | MultiCh | Text) | ProgrammingProblem)
export type Video = { id: string, type: "video", url: string, text: string };
export type TestsGroup = { type: "testsGroup", tests: Test[] };
export type ProblemWithNoSolutionNeeded = { id: string,type: "problem-with-no-solution-needed", title: string, text: string, video_url: string };
export type T3 = Video |TestsGroup |ProblemWithNoSolutionNeeded
export type T2 = { name: string, t3s: T3[] }
export type T1 = { name: string, t2s: T2[] }


export type Subject = { [id: string]: { t1s:T1[],bgColor:CSSProperties["color"],text:string,tags:string[],image:string} }
