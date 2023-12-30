import {useEffect, useState} from 'react';

function MathjaxP() {
    const data = "When \\(a \\ne 0\\), there are two solutions to \\(ax^2 + bx + c = 0\\) and they are \\[x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.\\]";
    const [tex, setTex] =useState('')

    useEffect(()=>{
        if( typeof window?.MathJax !== "undefined"){
            window.MathJax.typesetClear()
            window.MathJax.typeset()
        }
    },[tex])

    return (
        <div>
            <h2>Integrating MathJax v3 in React</h2>
            <p>{data}</p>
            <span>Input Latex Here </span>
            <input onChange={(e)=> {
                setTex(e.target.value) }}/>
            <h4>Rendered Latex : </h4>
            <p>{tex}</p>
        </div>
    );
}

export default MathjaxP;