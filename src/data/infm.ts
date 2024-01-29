import {Chapter} from "src/data/types.ts";

export const infm: Chapter[] = [{
  name: 'Глава 1', topics: [{
    name: 'Подтема 1',
    tasks: [
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