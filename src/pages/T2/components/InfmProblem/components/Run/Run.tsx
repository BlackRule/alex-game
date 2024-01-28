import styles from './Run.module.scss'
import {get_run_status, RunData, RunStatus} from "src/ejudgeAPI.ts";
import {useState} from "react";

const txts:{ [key in RunStatus]:string }=[
  "OK",
  "COMPILE_ERR",
  "RUN_TIME_ERR",
  "TIME_LIMIT_ERR",
  "PRESENTATION_ERR",
  "WRONG_ANSWER_ERR",
  "CHECK_FAILED",
  "PARTIAL",
  "ACCEPTED",
  "IGNORED",
  "DISQUALIFIED",
  "PENDING",
  "MEM_LIMIT_ERR",
  "SECURITY_ERR",
  "STYLE_ERR",
  "WALL_TIME_LIMIT_ERR",
  "PENDING_REVIEW",
  "SYNC_ERR",
  "SUMMONED",
]

function Run({run,...props}: { run: RunData}) {
  const [status, setStatus] = useState<RunStatus|null>(null)
  return <div className={styles.Run}>
    {status!==null?txts[status] : "?"}
    <button onClick={async () => {
      const run_status = await get_run_status(run.runId);
      if (run_status.ok) setStatus(run_status.result.run.status)
    }}>get run status</button>
  </div>;
}

export default Run