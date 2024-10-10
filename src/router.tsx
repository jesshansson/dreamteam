import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { App } from "./components";
import { AddHeroPage, EditHeroPage, MyTeam, NotFound, StartPage } from "./pages";
import { HeroDetails } from "./pages/HeroDetails";
import { SearchPage } from "./pages/SearchPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />} path="/">
      <Route index element={<StartPage />} />
      <Route element={<HeroDetails />} path="hero/:slug" />
      <Route element={<MyTeam />} path="my-team" />
      <Route element={<AddHeroPage />} path="add-hero" />
      <Route element={<EditHeroPage />} path="edit-hero/:slug" />
      <Route element={<SearchPage />} path="search" />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

//
//
//
