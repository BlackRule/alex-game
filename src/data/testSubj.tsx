import {Chapter} from "src/data/types.ts"
import SyntaxHighlighter from 'react-syntax-highlighter'
import {stackoverflowLight} from "react-syntax-highlighter/dist/esm/styles/hljs";
import {MathJaxFormula, MathJaxProvider} from "mathjax3-react";

export const testSubj: Chapter[] = [
  {
  name: 'Глава 1', topics: [
    { name: 'Подтема 1',
    tasks: [
      {
        type: 'questionsGroup',
        questions: [
          {
            id: "1",
            type: 'programming-problem',
            problem_id: "1",
            time_limit_in_secs:0,
            memory_limit_in_mb:0
          },
        ]
      },
      {
        type: 'questionsGroup',
        questions: [
          {
            id: "2",
            type: 'programming-problem',
            problem_id: "2",
            time_limit_in_secs:0,
            memory_limit_in_mb:0
          }
        ]
      },
    ]
  }
  ]
}
]