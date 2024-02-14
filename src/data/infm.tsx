import {Chapter} from "src/data/types.ts"
import SyntaxHighlighter from 'react-syntax-highlighter'
import {stackoverflowLight} from "react-syntax-highlighter/dist/esm/styles/hljs";
import {MathJax} from "better-react-mathjax";

export const infm: Chapter[] = [
  {
  name: 'Глава 1', topics: [
    { name: 'Подтема 1',
    tasks: [
      {
        type: 'questionsGroup',
        questions: [
          {
            // todo Система оценки
            //  Всего в задаче 50 тестов (не считая примера). Каждый тест оценивается в 2 балла.
            id: "3",
            type: 'programming-problem',
            problem_id: "3",
            time_limit_in_secs:3,
            memory_limit_in_mb:256
          }
        ]
      },
    ]
  }
  ]
},{
    name: 'Проекты', topics: [
  { name:"Проекты",
    tasks:[
      {
        type: "problem-with-no-solution-needed",
        title:'Задание 1 - Легкое',
        text:<>Напишите программу, которая на ввод принимает формулу и выводит ее в графическом виде. Можно использовать различные виды библиотек и любые языки программирования. Пример простой программы на Python:<br/>
          <SyntaxHighlighter language="python" style={stackoverflowLight}>
            {'python import matplotlib.pyplot as plt\n' +
              'import numpy as np\n' +
              'import sympy as sp\n' +
              '\n' +
              '# Ask the user for a mathematical expression\n' +
              'expr = input("Please enter a mathematical expression: ")\n' +
              '\n' +
              '# Use sympy to parse the expression\n' +
              'x = sp.symbols(\'x\')\n' +
              'y = sp.sympify(expr)\n' +
              '\n' +
              '# Create a range of x values\n' +
              'x_vals = np.linspace(-10, 10, 400)\n' +
              'y_vals = np.zeros(x_vals.shape)\n' +
              '\n' +
              '# Evaluate the expression for each x value\n' +
              'for i in range(len(x_vals)):\n' +
              '    y_vals[i] = y.subs(x, x_vals[i])\n' +
              '\n' +
              '# Create the plot\n' +
              'plt.plot(x_vals, y_vals)\n' +
              'plt.title(f\'Plot of {expr}\')\n' +
              'plt.xlabel(\'x\')\n' +
              'plt.ylabel(\'y\')\n' +
              'plt.grid(True)\n' +
              'plt.show()'}
          </SyntaxHighlighter>
          Не забудьте подключить библиотеки для работы программы.</>
      },
      {
        type: "problem-with-no-solution-needed",
        title:'Задание 2 – Среднее',
        text:<>Напишите программу «Гонки». 2 объекта будут соревноваться, бежать до финишной прямой, пока не достигнут ее. Можно осуществлять на любых языках программирования. Не обязательно делать анимацию, выводить гонку можно и в консоле. Постарайтесь выполнить задания работая с объектно-ориентированным программированием, использованием классов, циклов выведения, отрисовки по вашим формулам. Пример простой программы на c++: (гонки между танком и ракетой)<br/>
          <SyntaxHighlighter language="cp" style={stackoverflowLight}>
            {'#include <iostream>\n' +
              '#include <cstdlib>\n' +
              '#include <ctime>\n' +
              '#include "Windows.h"\n' +
              'using namespace std;\n' +
              'const int FINISH = 80;\n' +
              'const int E = 10;\n' +
              'const string ROCKET[]={\n' +
              '    "\\\\_________   ",\n' +
              '    " \\\\___*____\\\\__",\n' +
              '    " /________/  ",\n' +
              '    "/            "\n' +
              '};\n' +
              'const string TANK[]= {\n' +
              '    "[###}==-:",\n' +
              '    "_/ \\\\_    ",\n' +
              '    "(x) (x)  " \n' +
              '};\n' +
              'class Character{\n' +
              '        int speed;\n' +
              '        const string* character;\n' +
              '        public:\n' +
              '     int width;\n' +
              '     int height;\n' +
              '            int x;\n' +
              '            void move(){\n' +
              '                x += rand()%E+1;\n' +
              '            }\n' +
              '            void draw(){\n' +
              '                for (int i = 0; i < height; i++){\n' +
              '                    for (int j = 0; j < x; j++) cout<<" ";\n' +
              '                    cout<<character[i];\n' +
              '                    for (int i = 0; i < FINISH-x-width-1; i++)\n' +
              '                    {\n' +
              '                        cout<<" ";\n' +
              '                    }\n' +
              '                    \n' +
              '                    cout<<"|\\n";\n' +
              '\n' +
              '                }\n' +
              '            }\n' +
              '            Character(int w,int h, const string* c){\n' +
              '                width=w;\n' +
              '                height=h;\n' +
              '                character=c;\n' +
              '                this->x=10;\n' +
              '                this->speed=0;\n' +
              '            }\n' +
              '\n' +
              '    };\n' +
              '\n' +
              'int main(){\n' +
              '    srand(time(0));\n' +
              '    system("chcp 1251>nul");\n' +
              '    system("cls");\n' +
              '    \n' +
              '    Character rocket(14,4,ROCKET);\n' +
              '    Character tank(10,3,TANK);\n' +
              '    while(true)\n' +
              '    {\n' +
              '        system("cls");\n' +
              '        rocket.move();\n' +
              '        rocket.draw();\n' +
              '        tank.move();\n' +
              '        tank.draw();\n' +
              '        Sleep(200);\n' +
              '        if (!(rocket.x+rocket.width<FINISH-E || tank.x+tank.width<FINISH-E)) break;\n' +
              '\n' +
              '        \n' +
              '    }\n' +
              '    \n' +
              '    \n' +
              '    return 0;\n' +
              '    \n' +
              '}\n'}
          </SyntaxHighlighter>
          Чтобы не было возможности нагло списать, в программе присутствует недочет, который сразу виден. Если уж лень писать с нуля – исправьте ошибку!</>
      }
    ]
  }
 ]
  }
]