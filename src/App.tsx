import {createBrowserRouter, RouterProvider} from "react-router-dom";
import type {} from '@redux-devtools/extension'

const pages = import.meta.glob("./pages/**/*.tsx", {eager: true})
const routes = [];
for (const path of Object.keys(pages)) {
  const fileName = path.match(/\.\/pages\/(.*)\.tsx$/)?.[1];
  if (!fileName||fileName.includes('components')) {
    continue;
  }

  const normalizedPathName = fileName.includes("$")
      ? fileName.replace("$", ":")
      : fileName.replace(/\/index/, "");

  if (pages[path].default===undefined) {
    console.log(fileName, pages[path].default)
  }
  routes.push({
    path: fileName === "index" ? "/" : `/${normalizedPathName.toLowerCase()}`,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Element: pages[path].default,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    loader: pages[path]?.loader,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    action: pages[path]?.action,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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
