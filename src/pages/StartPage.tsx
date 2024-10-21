import { HeroCard } from "../components/HeroCard";
import { useEffect, useState } from "react";
import { FetchNewHeroBtn } from "../components/FetchNewHeroBtn";
import { IHero } from "../interface";
import { useLoaderData } from "react-router-dom";

export function StartPage() {
  const initialHero = useLoaderData() as IHero; // Hämta den första slumpmässiga hjälten från loadern ("randomHero" i loadern)
  const [currentHero, setCurrentHero] = useState<IHero>(initialHero); // Lokalt state för att hantera knappen som hämtar nya hjältar
  const [loading, setLoading] = useState(true); // Hantera laddningsindikatorn

  // Använd useEffect för att stänga av loading när hjälten har laddats
  useEffect(() => {
    if (initialHero) {
      setLoading(false); // När hjälten har laddats, sätt loading till false
    }
  }, [initialHero]);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <main className="start-page">
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
