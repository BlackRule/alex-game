import {NumericalString} from "src/types.ts";

const host = `http://195.46.171.236:4192`;

export enum RunStatus {
  OK = 0,
  COMPILE_ERR,
  RUN_TIME_ERR,
  TIME_LIMIT_ERR,
  PRESENTATION_ERR,
  WRONG_ANSWER_ERR,
  CHECK_FAILED,
  PARTIAL,
  ACCEPTED,
  IGNORED,
  DISQUALIFIED,
  PENDING,
  MEM_LIMIT_ERR,
  SECURITY_ERR,
  STYLE_ERR,
  WALL_TIME_LIMIT_ERR,
  PENDING_REVIEW,
  SYNC_ERR,
  SUMMONED,
}

type CompilerId=number

type APIError<SYMBOL="?", MESSAGE="??"> = {
  "ok": false,
  "error": {
    "num": number,
    "symbol": SYMBOL,
    "message": MESSAGE,
    "log_id": string
  }
}
type APIOk<RESULT> = {
  "ok": true,
  "result": RESULT
}
type APIResult<RESULT,APIError> = { "server_time": number } & (APIOk<RESULT> | APIError)
export const submit_run = (formData: FormData) => {
  return fetch(`${host}/ej/api/v1/client/submit-run`, {
    method: 'post',
    body: formData,
    headers: {
      "accept": "application/json",
    }
  })
    .then((response) => response.json() as
        Promise<APIResult<{"run_id": NumericalString},APIError<"ERR_DUPLICATE_SUBMIT", "This submit is duplicate of another run">>>
    )
}
export const get_problem_statement = (problem_id: NumericalString) => {
  return fetch(`${host}/ej/api/v1/client/problem-statement-json?contest_id=1&problem=${problem_id}`, {
    "headers": {
      "accept": "text/html",
    }
  }).then((r) => r.text())
}

export type RunData={
  runId:NumericalString,
  timestamp:number
}

export type Compiler = {
  "id": CompilerId,
  "short_name": string,
  "long_name": string
};
export const get_contest_status = () => {
  return fetch(`${host}/ej/api/v1/client/contest-status-json?contest_id=1`, {
    "headers": {
      "accept": "application/json",
    }
  }).then((r) => r.json() as Promise<
    APIResult<{
    "compilers": Compiler[]
    },APIError>
  >)
}
export const get_run_status = (run_id: NumericalString) => {
  return fetch(`${host}/ej/api/v1/client/run-status-json?contest_id=1&run_id=${run_id}`, {
    "headers": {
      "accept": "application/json",
    }
  }).then((r) => r.json() as Promise<
    APIResult<{
      "run": {
        "run_id": number,
        "prob_id": number,
        "run_time_us": number,
        "run_time": number,
        "duration": number,
        "lang_id": CompilerId,
        "size": number,
        "status": RunStatus,
        "is_with_duration": boolean,
        "is_standard_problem": boolean
      }
    },APIError>
  >)
}