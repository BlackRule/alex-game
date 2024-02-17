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
            id: "4",
            type: 'programming-problem',
            problem_id: "4",
            time_limit_in_secs:5,
            memory_limit_in_mb:256
          },
        ]
      },
      /*{
        type: 'questionsGroup',
        questions: [
          {
            id: "5",
            type: 'single-q',
            text: <>Дана схема:<br/><img src="http://195.46.171.236:4192/share/Picture1.jpg"/>Известно, что:
              D содержит меньше атомов кислорода, чем C. В веществе D w(O) = 10,59%.
              Разница молярных масс G и исходного соединения составляет 64,5 г/моль.
              Определите молярные массы (г/моль) всех загаданных веществ.
              Все атомные массы считать целыми, кроме Cl, Ar(Cl) = 35,5</>,
            correct:"ответ"

          },
        ]
      }*/
      {
        type: 'questionsGroup',
        questions: [
          {
            id: "5",
            type: 'programming-problem',
            problem_id: "5",
            time_limit_in_secs:0,
            memory_limit_in_mb:256
          },
        ]
      },
      {
        type: 'questionsGroup',
        questions: [
          {
            id: "6",
            type: 'programming-problem',
            problem_id: "6",
            time_limit_in_secs:0,
            memory_limit_in_mb:256
          },
        ]
      },
      {
        type: 'questionsGroup',
        questions: [
          {
            id: "7",
            type: 'programming-problem',
            problem_id: "7",
            time_limit_in_secs:0,
            memory_limit_in_mb:256
          },
        ]
      },
      {
        type: 'questionsGroup',
        questions: [
          {
            id: "8",
            type: 'programming-problem',
            problem_id: "8",
            time_limit_in_secs:0,
            memory_limit_in_mb:256
          },
        ]
      },
    ]
  }
  ]
}
]