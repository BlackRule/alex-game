import { createBrowserRouter, RouterProvider } from "react-router-dom";
const pages = import.meta.glob("./pages/**/*.tsx", { eager: true })
//В продолжение кнопка "Полезно знать" будет осуществлять переход на другую страницу сайта, где используем картинку выше
const routes = [];
for (const path of Object.keys(pages)) {
  const fileName = path.match(/\.\/pages\/(.*)\.tsx$/)?.[1];
  if (!fileName) {
    continue;
  }

  const normalizedPathName = fileName.includes("$")
      ? fileName.replace("$", ":")
      : fileName.replace(/\/index/, "");

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
  });
}
const router = createBrowserRouter(
    routes.map(({ Element, ErrorBoundary, ...rest }) => ({
      ...rest,
      element: <Element />,
      ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
    }))
);
function App() {

  return (
      <RouterProvider router={router} />
  )

}

export default App
