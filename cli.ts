import * as readline from 'node:readline/promises';
import {stdin as input, stdout as output} from 'node:process';
import * as xml2js from 'xml2js';
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from 'url';
import {courses, coursesQuestionsCount} from "./src/data/data.ts";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
/*switch (await rl.question('What?:\n' +
  '0 ~ get coursesQuestionsCount ,questionIdToCourseIdMap\n' +
  '1 ~ xml examples to tests\n' +
  '>')) {*/
if(process.argv[2]==='1'){
  const problemsPath = path.join(__dirname,'host','ej','ejudge_data','000001','problems')
  const p = path.join(problemsPath,process.argv[3])
  const XMLdata = fs.readFileSync(path.join(p,'statement.xml'), {encoding: 'utf-8'})
  const result = await xml2js.parseStringPromise(XMLdata);
  // console.log(result.problem.examples[0].example)
  const testsPath = path.join(p,'tests')
  fs.mkdirSync(testsPath);
  let i=1
  for(const ex of result.problem.examples[0].example){
    fs.writeFileSync( path.join(testsPath,`${i}.dat`), ex.input[0])
    fs.writeFileSync( path.join(testsPath,`${i}.ans`), ex.output[0])
    i++
  }
}
if(process.argv[2]==='0'){
  const rl = readline.createInterface({ input, output });
  const questionIdToCourseIdObj={}
  //todo TS keys of this should match keys of courses
  for (const [courseId,course] of Object.entries(courses)) {
    let count=0
    for (const chapter of course.chapters) {
      for (const topic of chapter.topics) {
        for (const task of topic.tasks) {
          switch (task.type){
            case "questionsGroup":
              for (const question of task.questions) {
                count++
                questionIdToCourseIdObj[question.id]=courseId
              }
              break;
            case "video":
              //todo
              break;
            case "problem-with-no-solution-needed":
              //todo
              break;
          }
        }
      }
    }
    coursesQuestionsCount[courseId]=count
  }
  rl.write(JSON.stringify(coursesQuestionsCount)+"\n")
  rl.write(
    `export const questionIdToCourseIdMap:Map<string,string>=new Map(Object.entries(
          ${JSON.stringify(questionIdToCourseIdObj)}
      ))`)
  rl.close();
}




