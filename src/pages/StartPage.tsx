import { HeroCard } from "../components/HeroCard";
import { useState } from "react";
import { FetchNewHeroBtn } from "../components/FetchNewHeroBtn";
import { IHero } from "../interface";
import { useLoaderData } from "react-router-dom";

export function StartPage() {
  const initialHero = useLoaderData() as IHero; // Hämta den första slumpmässiga hjälten från loadern
  const [currentHero, setCurrentHero] = useState<IHero>(initialHero); // Lokalt state för att hantera knappen som hämtar nya hjältar

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
