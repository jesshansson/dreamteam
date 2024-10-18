//Loader för StartPage (Random Hero)

export const getRandomHeroLoader = async () => {
  const API_URL = "https://akabab.github.io/superhero-api/api/all.json";
  const response = await fetch(API_URL);
  const data = await response.json();
  const randomHero = data[Math.floor(Math.random() * data.length)];
  return randomHero;
};