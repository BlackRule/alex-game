import styles from './InfmProblem.module.scss'
import {useEffect, useState} from "react";
import {Question} from "src/data/types.ts";
import {
  Compiler,
  get_contest_status,
  get_problem_statement,
  RunData,
  submit_run
} from "src/ejudgeAPI.ts";
import {addRunId, markAsSolvedCorrectly, useCollection, useUser} from "src/service.ts";
import Run from "src/pages/topic/components/InfmProblem/components/Run/Run.tsx";
import {questionIdToCourseIdMap} from "src/data/data.ts";
/*todo export declare function doc(...): DocumentReference<AppModelType, DbModelType> !*/
import {useDocumentData} from "react-firebase-hooks/firestore";
import {doc} from "firebase/firestore";
import {db} from "src/firebase.ts";

function InfmProblem(props: { question:Extract<Question, { type: "programming-problem" }> }) {
  const user = useUser()
  //todo useDocumentData<Question>
  const [question]=useDocumentData(user!==null?doc(db, `users/${user.uid}/questions/`,props.question.id):undefined)
  const [html, setHtml] = useState<string|null>(null)
  const [compilers, setCompilers] = useState<Compiler[]|null>(null)
  const runs=useCollection<RunData>(user!==null?`users/${user.uid}/questions/${props.question.problem_id}/runs`:null)
  useEffect(()=>{
    get_problem_statement(props.question.problem_id).then((r)=>
      setHtml(r)
    )
    get_contest_status().then((r)=>{
      if(r.ok) setCompilers(r.result.compilers)
    })
    return ()=>{}
  },[props.question.problem_id])

  return <>
    {question&& question.solvedCorrectly?<div title='задача зачтена'>✅</div>:<div title='задача не зачтена'>❌</div>}
    <div dangerouslySetInnerHTML={{__html: html??''}}></div>
    <form method="post" encType={'multipart/form-data'} className={styles.form} onSubmit={(e)=>{
      e.preventDefault();
      submit_run(new FormData(e.target as HTMLFormElement)).then((res) => {
        if (res.ok) return addRunId({runId:res.result.run_id,timestamp:res.server_time}, user, props.question.id)
      }) .catch((error) => console.error(error))
    }}>
      <input type="hidden" name="prob_id" value={props.question.id}/>
      <input type="hidden" name="contest_id" value="1"/>
      <label>Language:</label>
      {compilers!==null?(<select name="lang_id" defaultValue="23">
        {compilers.map((compiler) => <option value={compiler.id} key={compiler.id}>{compiler.short_name} - {compiler.long_name}</option>)}
      </select>):null}
      <label>Code:</label>
      <textarea name="text_form"></textarea>
      <input type="submit" value="Send!"/>
    </form>
    <div className={styles.runs}>
      {/*todo as ...*/}
      {runs.map((run) => <Run run={run} onRunStatusOk={()=> {
        if(question === undefined || !question.solvedCorrectly)
        markAsSolvedCorrectly(props.question.id, user?.uid as string, questionIdToCourseIdMap.get(props.question.id) as string)
        else console.log("already")
      }
      } key={run.runId}/>)}
    </div>
  </>;
}
export default InfmProblem

