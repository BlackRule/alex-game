import styles from './InfmProblem.module.scss'
import {useEffect, useState} from "react";
import {NumericalString} from "src/types.ts";
const host = `http://195.46.171.236:4192`;
const token = 'utyfN76E8TfUCUXlfZikpj2CTInW7E_JYSs1JZOFIs4';
const authorization = `Bearer AQAA${token}`;

interface InfmProblemProps {
  tId: string
}

interface InfmProblemProps {
  tId: string
}

function InfmProblem(props: { prob_id: NumericalString,tId: string,t1Id:NumericalString,t2Id:NumericalString,t3Id:NumericalString}) {
  const [html, setHtml] = useState(null)
  useEffect(()=>{
    (async ()=>{
      const r = await (await fetch(`${host}/ej/api/v1/client/problem-statement-json?contest_id=1&problem=${props.prob_id}`, {
        "headers": {
          "accept": "text/html",
          authorization,
        }
      })).text()
      setHtml(r)
    })()
    return ()=>{}
  },[props.prob_id])
  return <>
    <div dangerouslySetInnerHTML={{__html: html}}></div>
    <form method="post" encType={'multipart/form-data'} className={styles.form} onSubmit={(e)=>{
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      fetch(`${host}/ej/api/v1/client/submit-run`,{
        method: 'post',
        body:formData,
        headers: {
          "accept": "application/json",
          authorization,
        }
      })
        .then((response)=>response.text())
        .then((text)=>console.log(text))
        .catch((error)=>console.error(error))
    }}>
      <input type="hidden" name="prob_id" value="1"/>
      <input type="hidden" name="contest_id" value="1"/>
      <label>Language:</label>
      <select name="lang_id" defaultValue="23">
        <option value="2">gcc - GNU C 13.2.1</option>
        <option value="3">g++ - GNU C++ 13.2.1</option>
        <option value="13">python - Python 2.7.18</option>
        <option value="14">perl - Perl 5.36.3</option>
        <option value="23">python3 - Python3 3.11.6</option>
        <option value="25">make - Make 4.4.1</option>
        <option value="28">gcc-vg - GNU C (valgrind) 13.2.1</option>
        <option value="29">g++-vg - GNU C++ (valgrind) 13.2.1</option>
        <option value="50">nasm-x86 - NASM 2.16.01</option>
        <option value="51">clang - clang C 16.0.6</option>
        <option value="52">clang++ - clang C++ 16.0.6</option>
        <option value="54">make-vg - Make (valgrind) 4.4.1</option>
        <option value="57">gcc-32 - GNU C (32 bit) 13.2.1</option>
        <option value="58">g++-32 - GNU C++ 13.2.1</option>
        <option value="61">clang-32 - clang C (32 bit) 16.0.6</option>
        <option value="62">clang++-32 - clang C++ 16.0.6</option>
        <option value="63">pypy - Python (PyPy) 2.7.18</option>
        <option value="64">pypy3 - Python3 (PyPy) 3.9.18</option>
        <option value="66">gas-32 - GNU AS (32 bit) 13.2.1</option>
        <option value="67">gas - GNU AS 13.2.1</option>
        <option value="70">rust - Rust 1.74.1</option>
        <option value="72">node - NodeJS 18.19.0</option>
        <option value="77">custom - Custom 1</option>
      </select>
      <label>Code:</label>
      <textarea name="text_form"></textarea>
      <input type="submit" value="Send!"/>
    </form>
  </>;
}
export default InfmProblem