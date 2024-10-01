import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { App } from "./components";
import { StartPage } from "./pages/StartPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />} path="/">
      <Route index element={<StartPage />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Route>
  )
);
