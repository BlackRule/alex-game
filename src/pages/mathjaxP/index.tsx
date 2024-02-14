import {useEffect, useState} from 'react';
import {MathJax} from "better-react-mathjax";

function MathjaxP() {
    const data = "\\(10^{-6}\\) When \\(a \\ne 0\\), there are two solutions to \\(ax^2 + bx + c = 0\\) and they are \\[x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.\\]";
    const [tex, setTex] =useState('')



    return (
        <div>
          <MathJax dynamic hideUntilTypeset={"first"}>
            <h2>Integrating MathJax v3 in React</h2>
            <p>{data}</p>
            <span>Input Latex Here </span>
            <input onChange={(e)=> {
                setTex(e.target.value) }}/>
            <h4>Rendered Latex : </h4>
          <p>{tex}</p></MathJax>
        </div>
    );
}

export default MathjaxP;