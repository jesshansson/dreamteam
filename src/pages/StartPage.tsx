import { HeroCard } from "../components/HeroCard";
import { useHeroes } from "../context/HeroContext";
import { useState, useEffect } from "react";
import { FetchNewHeroBtn } from "../components/FetchNewHeroBtn";
import { IHero } from "../interface";

export function StartPage() {
  const { heroes, loading } = useHeroes();
  const [currentHero, setCurrentHero] = useState<IHero | null>(null);

  //När komponenten laddas första gången, används useEffect för att slumpa fram en hjälte från listan över hjältar:
  useEffect(() => {
    if (heroes.length > 0) {
      const randomIndex = Math.floor(Math.random() * heroes.length);
      setCurrentHero(heroes[randomIndex]); //Den slumpade hjälten sätts som currenthero
    }
  }, [heroes]);

  if (loading) {
    return <p>Loading superhero...</p>;
  }

  return (
    <main>
      {currentHero ? (
        <HeroCard hero={currentHero} showAddToFavorites={true} />
      ) : (
        <p>No hero found.</p>
      )}
      <FetchNewHeroBtn setHero={setCurrentHero} />
    </main>
  );
}
