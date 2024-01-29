import {createBrowserRouter, RouterProvider} from "react-router-dom";
import type {} from '@redux-devtools/extension'

const pages: Record<string, {
  ErrorBoundary?: any;
  action?: any;
  loader?: any;
  default?:any}> = import.meta.glob("./pages/**/*.tsx", {eager: true})
const routes:{
  path: any,
  Element:any,
  loader:any,
  action:any,
  ErrorBoundary:any,
}[] = [];
for (const path of Object.keys(pages)) {
  const fileName = path.match(/\.\/pages\/(.*)\.tsx$/)?.[1];
  if (!fileName||fileName.includes('components')) {
    continue;
  }

  const normalizedPathName = fileName.includes("$")
      ? fileName.replace("$", ":")
      : fileName.replace(/\/index/, "");

  if (pages[path].default===undefined) {
    console.log(fileName)
  }
  routes.push({
    path: fileName === "index" ? "/" : `/${normalizedPathName.toLowerCase()}`,
    Element: pages[path].default,
    loader: pages[path]?.loader,
    action: pages[path]?.action,
    ErrorBoundary: pages[path]?.ErrorBoundary,
  })
}

const router = createBrowserRouter(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  routes.map(({Element, ErrorBoundary, ...rest}) => {
    return {
      ...rest,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      element: <Element/>,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ...(ErrorBoundary && {errorElement: <ErrorBoundary/>}),
    }
  })
)

function App() {

  return (
      <RouterProvider router={router}/>
  )

}

export default App
