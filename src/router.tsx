import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { App } from "./components";
import { NotFound, StartPage } from "./pages";
import { HeroDetails } from "./pages/HeroDetails";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />} path="/">
      <Route index element={<StartPage />} />
      <Route path="hero/:slug" element={<HeroDetails />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

// <Route index element={<StartPage />} />
// <Route path="*" element={<NotFound />} />
//<Route element={<MyTeam />} path="my-team" />
// <Route element={<SearchPage />} path="search" />
// <Route element={<AddHero />} path="add-hero" />
// <Route
//   path="hero/:id"
//   element={<HeroDetails />}
//   loader={fetchDataFromId}
//   errorElement={<NotFound />}
// />
