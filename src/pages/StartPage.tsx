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
      setCurrentHero(heroes[randomIndex]); //Den slumpade hjälten sätts som currentHero
    }
  }, [heroes]);

  if (loading) {
    return <p>Loading superhero...</p>;
  }

  return (
    <main>
      <div className="welcome-msg ">
        <h1 className="shimmer-text">Welcome to Dream Team HQ!</h1>
        <p>
          Ready to unleash your inner hero (or villain)? It’s time to assemble your ultimate squad!
          Create your own legendary characters or recruit from the world’s greatest heroes and
          villains. Your dream team awaits — who will rise to the challenge?
        </p>
      </div>
      {currentHero ? (
        <HeroCard hero={currentHero} showAddToFavorites={true} showEditButton={false} />
      ) : (
        <p>No hero found.</p>
      )}
      <FetchNewHeroBtn setHero={setCurrentHero} />
    </main>
  );
}
