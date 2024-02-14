import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './global_styles.scss'
import {MathJaxContext} from "better-react-mathjax";
const config = {
  "fast-preview": {
    disabled: true
  },
  tex2jax: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"]
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"]
    ]
  },
  messageStyle: "none"
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <>
        {/*<React.StrictMode>*/}
      <MathJaxContext version={3}
                      config={config}
                      // onStartup={(mathJax) => (mathJax.Hub.processSectionDelay = 0)}
      >
        <App/>
        </MathJaxContext>
    {/*</React.StrictMode>*/}
    </>,
)
