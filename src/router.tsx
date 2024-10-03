import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { App } from "./components";
import { AddHeroPage, MyTeam, NotFound, StartPage } from "./pages";
import { HeroDetails } from "./pages/HeroDetails";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />} path="/">
      <Route index element={<StartPage />} />
      <Route path="hero/:slug" element={<HeroDetails />} />
      <Route element={<MyTeam />} path="my-team" />
      <Route element={<AddHeroPage />} path="add-hero" />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

//
// <Route element={<SearchPage />} path="search" />
//
