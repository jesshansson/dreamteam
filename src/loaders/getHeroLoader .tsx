// Loader för HeroDetails, letar efter hjälte i viss ordning.

import { IHero } from "../interface";

// Loader som letar efter uppdaterad hjälte-data, både från API och localStorage.
export const getHeroLoader = async ({ params }: any) => {
  const API_URL = "https://akabab.github.io/superhero-api/api/all.json";

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch hero data");
    }

    const apiHeroes = await response.json();

    // Hämta hjältar från localStorage (om ingen data finns, sätts en tom array som standardvärde)
    const customHeroes = JSON.parse(localStorage.getItem("customHeroes") || "[]"); // Skapade hjältar
    const teamHeroes = JSON.parse(localStorage.getItem("teamHeroes") || "[]"); // Hjältar som användaren har lagt till i sitt team, inklusive uppdaterade versioner av API-hjältar.

    // Hitta hjälten i teamHeroes först, om det finns en uppdaterad version
    const hero =
      teamHeroes.find((hero: IHero) => hero.slug === params.slug) || // Leta efter uppdaterad hjälte i teamHeroes
      customHeroes.find((hero: IHero) => hero.slug === params.slug) || // Leta efter skapad hjälte
      apiHeroes.find((hero: IHero) => hero.slug === params.slug); // Leta i API-hjältar

    if (!hero) {
      throw new Error(`Hero with slug ${params.slug} not found`);
    }

    return hero;
  } catch (error) {
    throw new Error("There was an error fetching the hero data.");
  }
};
