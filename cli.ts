import {createInterface} from "readline";
import {courses, coursesQuestionsCount, questionIdToCourseIdMap} from "./src/data/data.ts";

const io = createInterface({
  input: process.stdin,
  output: process.stdout
});

io.question('What?:\n0 ~ get coursesQuestionsCount ,questionIdToCourseIdMap\n>', a => {
  switch (a) {
    case "0": {
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
      io.write(JSON.stringify(coursesQuestionsCount)+"\n")
      io.write(
        `export const questionIdToCourseIdMap:Map<string,string>=new Map(Object.entries(
            ${JSON.stringify(questionIdToCourseIdObj)}
        ))`)
      break;
    }
  }
  io.close();
});