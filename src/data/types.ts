import {CSSProperties} from "react";
import {NumericalString} from "src/types.ts";

export type ProgrammingProblem = {
  type: "programming-problem", /*todo rename to ej_problem_id*/problem_id: NumericalString,time_limit_in_secs:number,memory_limit_in_mb:number };
export type SingleQ = { type: "single-q", correct: string };
export type MultiQ = { type: "multi-q", questions: { text:React.ReactElement, correct: string }[] };
export type SingleCh = { type: "single-ch", options: string[], correctId: number };
export type MultiCh = { type: "multi-ch", options: string[], correctIds: number[] };
export type Text = { type: "text", text: React.ReactElement, answers:string[] };
export type Question = {id:string}&({text:React.ReactElement}&(SingleQ | MultiQ | SingleCh | MultiCh | Text) | ProgrammingProblem)
export type Video = { id: string, type: "video", url: string, text:React.ReactElement };
export type QuestionsGroup = { type: "questionsGroup", questions: Question[] };
export type ProblemWithVideoSolution = { id: string,type: "problem-with-video-solution", title: string, text:React.ReactElement, video_url: string };
export type ProblemWithNoSolutionNeeded = { type: "problem-with-no-solution-needed", title: string, text: React.ReactElement };
export type Task = Video |QuestionsGroup |ProblemWithVideoSolution|ProblemWithNoSolutionNeeded
export type Topic = { name:/*fixme unused property*/ string, tasks: Task[] }
export type Chapter = { name: string, topics: Topic[] }


export type Courses = { [id: string]: { chapters:Chapter[],bgColor:Exclude<CSSProperties["color"],undefined>,/*todo rename to title*/text:string,tags:string[]} }
