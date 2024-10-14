import { Link, useNavigate } from "react-router-dom";
import { IHero } from "../interface";
import { useHeroes } from "../context/HeroContext";
import { useState } from "react";

interface HeroCardProps {
  hero: IHero;
  detailed?: boolean;
  showSeeDetails?: boolean;
  showAddToFavorites?: boolean;
  showRemoveButton?: boolean;
  showEditButton?: boolean;
  onRemove?: () => void;
}

export function HeroCard({
  hero,
  detailed = false,
  showSeeDetails = true,
  showAddToFavorites = false,
  showRemoveButton = false,
  showEditButton = true,
  onRemove,
}: HeroCardProps) {
  const { addHeroToTeam, removeHeroFromTeam, isHeroInTeam } = useHeroes(); // Hämta funktionen för att lägga till hjältar i teamet
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const handleAddToFavorites = () => {
    addHeroToTeam(hero); // Lägg till hjälten i favoriter/team
    setShowModal(true);
  };

  const handleRemoveFromFavorites = () => {
    removeHeroFromTeam(hero.id); // Ta bort hjälten från teamet
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

        {showSeeDetails && (
          <Link to={`/hero/${hero.slug}`} className="details-link">
            <span className="material-symbols-outlined">info</span>
            <p>View Details</p>
          </Link>
        )}

        {detailed && (
          <>
            <p>Occupation: {hero.work.occupation}</p>
            <p>Race: {hero.appearance.race}</p>
            <p>Associates: {hero.connections.groupAffiliation}</p>

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

        {showAddToFavorites &&
          (isHeroInTeam(hero.id) ? (
            <button className="add-btn" onClick={handleRemoveFromFavorites}>
              Remove from My Team
            </button>
          ) : (
            <button className="add-btn" onClick={handleAddToFavorites}>
              Add to My Team
            </button>
          ))}

        <div className="edit-delete">
          {showEditButton && (
            <button className="edit-btn" onClick={() => navigate(`/edit-hero/${hero.slug}`)}>
              <span className="material-symbols-outlined editBtn">edit</span>
            </button>
          )}
          {showRemoveButton && onRemove && (
            <button className="remove-btn" onClick={onRemove}>
              <span className="material-symbols-outlined deleteBtn">delete</span>
            </button>
          )}
        </div>
      </article>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="p-6 rounded-lg shadow-lg text-center modal">
            <h2 className="text-2xl font-bold mb-4 modal-text">{hero.name} added to your team!</h2>
            <button
              className="bg-custom-blue hover:bg-custom-blue text-white font-400 py-2 px-4 rounded"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  ) : (
    <p>No hero found.</p>
  );
}
