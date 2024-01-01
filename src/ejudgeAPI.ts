import {NumericalString} from "src/types.ts";

const host = `http://195.46.171.236:4192`;
const token = 'utyfN76E8TfUCUXlfZikpj2CTInW7E_JYSs1JZOFIs4';
const authorization = `Bearer AQAA${token}`;

type APIError<SYMBOL="?", MESSAGE="??"> = {
  "ok": false,
  "error": {
    "num": number,
    "symbol": SYMBOL,
    "message": MESSAGE,
    "log_id": string
  }
};
type APIOk<RESULT> = {
  "ok": true,
  "result": RESULT
};
export const submit_run = (formData: FormData) => {
  return fetch(`${host}/ej/api/v1/client/submit-run`, {
    method: 'post',
    body: formData,
    headers: {
      "accept": "application/json",
      authorization,
    }
  })
    .then((response) => response.json() as
      Promise<
        APIOk<{
        "run_id": NumericalString,
      }> | APIError<"ERR_DUPLICATE_SUBMIT", "This submit is duplicate of another run">
      >
    )
}
export const get_problem_statement = (problem_id: NumericalString) => {
  return fetch(`${host}/ej/api/v1/client/problem-statement-json?contest_id=1&problem=${problem_id}`, {
    "headers": {
      "accept": "text/html",
      authorization,
    }
  }).then((r) => r.text())
}

export type Compiler = {
  "id": number,
  "short_name": string,
  "long_name": string
};
export const get_contest_status = () => {
  return fetch(`${host}/ej/api/v1/client/contest-status-json?contest_id=1`, {
    "headers": {
      "accept": "application/json",
      authorization,
    }
  }).then((r) => r.json() as Promise<{ "server_time": number } & (APIOk<{
    "compilers": Compiler[]
  }> | APIError)>)
}