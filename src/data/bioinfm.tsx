import {Chapter} from "src/data/types.ts"

export const bioinfm: Chapter[] = [
  {
  name: 'Глава 1', topics: [
    { name: 'Шаг 2 – Задача – Stepik',
    tasks: [
      {
        type: 'questionsGroup',
        questions: [
          {
            id: "5",
            type: 'programming-problem',
            problem_id: "5",
            time_limit_in_secs:5,
            memory_limit_in_mb:256
          },
        ]
      }
    ]
  }
  ]
}
]