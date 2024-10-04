import { useHeroes } from "../context/HeroContext";
import { IHero } from "../interface";

export function FetchNewHeroBtn({ setHero }: { setHero: (hero: IHero) => void }) {
  const { heroes } = useHeroes(); // Hämta alla hjältar från Context

  function getRandomHero() {
    const randomIndex = Math.floor(Math.random() * heroes.length); // Slumpar ett index
    const randomHero = heroes[randomIndex]; // Väljer en slumpmässig hjälte från listan
    setHero(randomHero); // Skickar den slumpade hjälten till StartPage
  }

  return (
    <div>
      <button className="new-hero-btn" onClick={getRandomHero}>
        Fetch me another hero!
      </button>
    </div>
  );
}
