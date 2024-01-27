import styles from './InfmProblem.module.scss'
import {useEffect, useState} from "react";
import {Test} from "src/data/types.ts";
import {Compiler, get_contest_status, get_problem_statement, submit_run} from "src/ejudgeAPI.ts";
import {addRunId, useUser} from "src/service.ts";

function InfmProblem(props: { test:Extract<Test, { type: "programming-problem" }> }) {
  const user = useUser()
  const [html, setHtml] = useState<string|null>(null)
  const [compilers, setCompilers] = useState<Compiler[]|null>(null)
  useEffect(()=>{
    get_problem_statement(props.test.problem_id).then((r)=>
      setHtml(r)
    )
    get_contest_status().then((r)=>{
      if(r.ok===true) setCompilers(r.result.compilers)
    })
    return ()=>{}
  },[props.test.problem_id])
  return <>
    <div dangerouslySetInnerHTML={{__html: html??''}}></div>
    <form method="post" encType={'multipart/form-data'} className={styles.form} onSubmit={(e)=>{
      e.preventDefault();
      submit_run(new FormData(e.target as HTMLFormElement)).then((res) => {
        if (res.ok === true) return addRunId(res.result.run_id, user, props.test.id)
      }) .catch((error) => console.error(error))
    }}>
      <input type="hidden" name="prob_id" value={props.test.id}/>
      <input type="hidden" name="contest_id" value="1"/>
      <label>Language:</label>
      {compilers!==null?(<select name="lang_id" defaultValue="23">
        {compilers.map((compiler) => <option value={compiler.id}>{compiler.short_name} - {compiler.long_name}</option>)}
      </select>):null}
      <label>Code:</label>
      <textarea name="text_form"></textarea>
      <input type="submit" value="Send!"/>
    </form>
  </>;
}
export default InfmProblem