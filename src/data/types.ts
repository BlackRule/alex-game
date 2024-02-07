import {CSSProperties} from "react";
import {NumericalString} from "src/types.ts";

export type ProgrammingProblem = {
  type: "programming-problem", /*todo rename to ej_problem_id*/problem_id: NumericalString };
export type SingleQ = { type: "single-q", correct: string };
export type MultiQ = { type: "multi-q", questions: { text: string, correct: string }[] };
export type SingleCh = { type: "single-ch", options: string[], correctId: number };
export type MultiCh = { type: "multi-ch", options: string[], correctIds: number[] };
export type Text = { type: "text", text: string, answers:string[] };
export type Question = {id:string}&({text:string}&(SingleQ | MultiQ | SingleCh | MultiCh | Text) | ProgrammingProblem)
export type Video = { id: string, type: "video", url: string, text: string };
export type QuestionsGroup = { type: "questionsGroup", questions: Question[] };
export type ProblemWithVideoSolution = { id: string,type: "problem-with-video-solution", title: string, text: string, video_url: string };
export type ProblemWithNoSolutionNeeded = { type: "problem-with-no-solution-needed", title: string, text: React.ReactElement };
export type Task = Video |QuestionsGroup |ProblemWithVideoSolution|ProblemWithNoSolutionNeeded
export type Topic = { name:/*fixme unused property*/ string, tasks: Task[] }
export type Chapter = { name: string, topics: Topic[] }


export type Courses = { [id: string]: { chapters:Chapter[],bgColor:Exclude<CSSProperties["color"],undefined>,text:string,tags:string[]} }
