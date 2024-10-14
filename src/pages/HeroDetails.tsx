import { useParams } from "react-router-dom";
import { HeroCard } from "../components/HeroCard";
import { useHeroes } from "../context/HeroContext";
import { useState, useEffect } from "react";
import { IHero } from "../interface";
import { BackButton } from "../assets/BackButton";

export function HeroDetails() {
  const { slug } = useParams(); // Hämta slug från URL:en
  const { heroes, customHeroes, addHeroToTeam, removeHeroFromTeam, loading, isHeroInTeam } =
    useHeroes(); // Hämta hjälteinformationen från Context
  const [hero, setHero] = useState<IHero | null>(null); // State för att lagra den valda hjälten

  useEffect(() => {
    if ((heroes.length > 0 || customHeroes.length > 0) && slug) {
      // Leta efter hjälten i både heroes och customHeroes
      const selectedHero =
        heroes.find((hero) => hero.slug === slug) ||
        customHeroes.find((hero) => hero.slug === slug);
      setHero(selectedHero || null); // Sätt den valda hjälten eller null om den inte finns
    }
  }, [heroes, customHeroes, slug]); // Denna effect körs om heroes, customHeroes eller slug ändras

  const handleAddToFavorites = () => {
    if (hero) {
      addHeroToTeam(hero); // Lägg till hjälten som favorit
    }
  };

  const handleRemoveFromFavorites = () => {
    if (hero) {
      removeHeroFromTeam(hero.id); // Ta bort hjälten från favoriter
    }
  };

  if (loading) {
    return <p>Loading hero details...</p>;
  }

  return hero ? (
    <main>
      <HeroCard hero={hero} detailed={true} showSeeDetails={false} />

      {/* Visa rätt knapp beroende på om hjälten är favorit eller inte */}
      {isHeroInTeam(hero.id) ? (
        <button className="add-remove-favorite" onClick={handleRemoveFromFavorites}>
          Remove from My Team
        </button>
      ) : (
        <button className="add-remove-favorite" onClick={handleAddToFavorites}>
          Add to My Team
        </button>
      )}
      <BackButton />
    </main>
  ) : (
    <p>No hero found.</p>
  );
}
