import { Link } from "react-router-dom";
import { IHero } from "../interface";
import { useHeroes } from "../context/HeroContext";

interface HeroCardProps {
  hero: IHero;
  detailed?: boolean;
  showSeeDetails?: boolean;
  showAddToFavorites?: boolean;
  showRemoveButton?: boolean;
  onRemove?: () => void;
}

export function HeroCard({
  hero,
  detailed = false,
  showSeeDetails = true,
  showAddToFavorites = false,
  showRemoveButton = false,
  onRemove,
}: HeroCardProps) {
  const { addHeroToTeam } = useHeroes(); // Hämta funktionen för att lägga till hjältar i teamet

  const handleAddToFavorites = () => {
    addHeroToTeam(hero); // Lägg till hjälten i favoriter/team
  };
  return hero ? (
    <main>
      <article className="hero-card">
        <h1 className="hero-name">{hero.name}</h1>
        <img src={hero.images.lg || "/logo.png"} alt={hero.name} />
        <p>Full name: {hero.biography.fullName}</p>
        <p>Aliases: {hero.biography.aliases.join(", ")}</p>
        <p className={`alignment ${hero.biography.alignment}`}>
          Alignment:{" "}
          {hero.biography.alignment.charAt(0).toUpperCase() + hero.biography.alignment.slice(1)}
        </p>

        {showSeeDetails && <Link to={`/hero/${hero.slug}`}>View Details</Link>}

        {detailed && (
          <>
            <p>Occupation: {hero.work.occupation}</p>
            <p>Race: {hero.appearance.race}</p>
            <p>Connections: {hero.connections.relatives}</p>
            <div className="powerstats">
              <p>
                <strong>Powerstats:</strong>
              </p>
              <p>Intelligence: {hero.powerstats.intelligence}</p>
              <p>Strength: {hero.powerstats.strength}</p>
              <p>Speed: {hero.powerstats.speed}</p>
            </div>
          </>
        )}

        {showAddToFavorites && (
          <button className="add-btn" onClick={handleAddToFavorites}>
            Add to Favorites
          </button>
        )}
        {showRemoveButton && onRemove && (
          <button className="remove-btn" onClick={onRemove}>
            Remove from Favorites
          </button>
        )}
      </article>
    </main>
  ) : (
    <p>No hero found.</p>
  );
}
