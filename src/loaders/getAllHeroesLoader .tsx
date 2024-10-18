// Loader för SearchPage

export const getAllHeroesLoader = async () => {
  const API_URL = "https://akabab.github.io/superhero-api/api/all.json";
  const response = await fetch(API_URL);
  const heroes = await response.json();
  return heroes; // Returnerar hela listan av hjältar
};
