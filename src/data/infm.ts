import {T1} from "src/data/types.ts";

export const infm: T1[] = [{
  name: 'Глава 1', t2s: [{
    name: 'Подтема 1',
    t3s: [
      {
        type: 'questionsGroup',
        questions: [
          {
            id: "1",
            type: 'programming-problem', problem_id: "1"
          },
        ]
      },
      {
        type: 'questionsGroup',
        questions: [
          {
            id: "2",
            type: 'programming-problem', problem_id: "2"
          }
        ]
      },
    ]
  }]
}
]