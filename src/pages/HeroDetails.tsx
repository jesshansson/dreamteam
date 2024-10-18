import { useLoaderData } from "react-router-dom";
import { HeroCard } from "../components/HeroCard";
import { useHeroes } from "../context/HeroContext";
import { useState } from "react";
import { IHero } from "../interface";
import { BackButton } from "../components/BackButton";

export function HeroDetails() {
  const hero = useLoaderData() as IHero; // Använd loader-datan
  const { addHeroToTeam, removeHeroFromTeam, isHeroInTeam } = useHeroes(); // Använd HeroContext för teamlogik

  const [showAnimation, setShowAnimation] = useState(false); // State för att visa animation vid tillägg till teamet

  const handleAddToFavorites = () => {
    if (hero) {
      addHeroToTeam(hero); // Lägg till hjälten i teamet
      setShowAnimation(true); // Visa popup-rutan för animation

      setTimeout(() => {
        setShowAnimation(false); // Döljer popup-rutan efter 2 sekunder
      }, 2000);
    }
  };

  const handleRemoveFromFavorites = () => {
    if (hero) {
      removeHeroFromTeam(hero.id); // Ta bort hjälten från teamet
    }
  };

  return hero ? (
    <main>
      <HeroCard hero={hero} detailed={true} showSeeDetails={false} />

      {/* Visa rätt knapp beroende på om hjälten är i teamet */}
      {isHeroInTeam(hero.id) ? (
        <button className="add-remove-favorite" onClick={handleRemoveFromFavorites}>
          Remove from My Team
        </button>
      ) : (
        <button className="add-remove-favorite" onClick={handleAddToFavorites}>
          Add to My Team
        </button>
      )}

      {/* Animation popup */}
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
