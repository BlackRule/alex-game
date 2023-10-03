export type SingleQ = { type: "single-q", correct: string };
export type MultiQ = { type: "multi-q", questions: { text: string, correct: string }[] };
export type SingleCh = { type: "single-ch", options: string[], correctId: number };
export type MultiCh = { type: "multi-ch", options: string[], correctIds: number[] };
export type Test = { text: string } & (SingleQ | MultiQ | SingleCh | MultiCh)
export type T3 = { type: "video", url: string, text: string } |
    { type: "testsGroup", tests: Test[] } |
    { type: "problem" };
export type T2 = { name: string, t3s: T3[] }
export type T1 = { name: string, t2s: T2[] }
export type TopicsForSubject = { [id: string]: T1[] }