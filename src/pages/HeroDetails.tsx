import { useParams } from "react-router-dom";
import { HeroCard } from "../components/HeroCard";
import { useHeroes } from "../context/HeroContext";
import { useState, useEffect } from "react";
import { IHero } from "../interface";
import { BackButton } from "../components/BackButton";

export function HeroDetails() {
  const { slug } = useParams(); // Hämta slug från URL:en
  const {
    heroes,
    customHeroes,
    teamHeroes,
    addHeroToTeam,
    removeHeroFromTeam,
    loading,
    isHeroInTeam,
  } = useHeroes(); // Hämta hjälteinformationen från Context
  const [hero, setHero] = useState<IHero | null>(null); // State för att lagra den valda hjälten
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if ((heroes.length > 0 || customHeroes.length > 0 || teamHeroes.length > 0) && slug) {
      // Leta först i teamHeroes för att få den uppdaterade versionen av hjälten
      const selectedHero =
        teamHeroes.find((hero) => hero.slug === slug) || // Kontrollera teamHeroes först
        heroes.find((hero) => hero.slug === slug) ||
        customHeroes.find((hero) => hero.slug === slug);

      setHero(selectedHero || null); // Sätt den valda hjälten eller null om den inte finns
    }
  }, [heroes, customHeroes, teamHeroes, slug]); // Denna effect körs om heroes, customHeroes eller slug ändras

  const handleAddToFavorites = () => {
    if (hero) {
      addHeroToTeam(hero); // Lägg till hjälten som favorit
      setShowAnimation(true); // Visa popup-rutan

      setTimeout(() => {
        setShowAnimation(false); // Döljer popup-rutan efter 2 sekunder
      }, 2000);
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

      {showAnimation && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="p-5 bg-custom-blue bg-opacity-80 text-white text-lg modal-text rounded-lg shadow-lg opacity-0 animate-fade-in-out">
            {hero.name} added to your team!
          </div>
        </div>
      )}
      <BackButton />
    </main>
  ) : (
    <p>No hero found.</p>
  );
}
