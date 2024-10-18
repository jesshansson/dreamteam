import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { App } from "./components";
import { AddHeroPage, EditHeroPage, MyTeam, NotFound, StartPage, SearchPage } from "./pages";
import { HeroDetails } from "./pages/HeroDetails";
import { getRandomHeroLoader } from "./loaders/getRandomHeroLoader ";
import { getHeroLoader } from "./loaders/getHeroLoader ";
import { getAllHeroesLoader } from "./loaders/getAllHeroesLoader ";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />} path="/">
      <Route index element={<StartPage />} loader={getRandomHeroLoader} />
      <Route element={<HeroDetails />} path="hero/:slug" loader={getHeroLoader} />
      <Route element={<MyTeam />} path="my-team" />
      <Route element={<AddHeroPage />} path="add-hero" />
      <Route element={<EditHeroPage />} path="edit-hero/:slug" />
      <Route element={<SearchPage />} path="search" loader={getAllHeroesLoader} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
