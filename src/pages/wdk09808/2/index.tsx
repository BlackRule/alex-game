import {courses, coursesQuestionsCountT} from "src/data/data.ts"

export default function (){
  const questionIdToCourseIdObj={}
  const coursesQuestionsCount:coursesQuestionsCountT={}
  let errors=''
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
                if(questionIdToCourseIdObj.hasOwnProperty(question.id)){
                  errors+=`Error: question.id=${question.id} duplicate\n`
                }
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
  if(errors!=='') errors+='\n'
  return <textarea style={{resize:"both",width:'100%',minHeight:'500px'}}>
    {`${errors}export const coursesQuestionsCount:coursesQuestionsCountT=${JSON.stringify(coursesQuestionsCount)}
    export const questionIdToCourseIdMap:Map<string,string>=new Map(Object.entries(\n${JSON.stringify(questionIdToCourseIdObj)}
         ))`}
  </textarea>
};


