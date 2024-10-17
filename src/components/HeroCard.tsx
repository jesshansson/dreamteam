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
    addHeroToTeam(hero); // Lägg till hjälten i teamet
    setShowModal(true);
  };

  const handleRemoveFromFavorites = () => {
    removeHeroFromTeam(hero.id); // Ta bort hjälten från teamet
  };

  const attributes = [];
  if (hero.powerstats.intelligence > 80) attributes.push("Intelligent");
  if (hero.powerstats.strength > 80) attributes.push("Strong");
  if (hero.powerstats.speed > 80) attributes.push("Fast");

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

        {attributes.length > 0 && (
          <p className="power-attributes">
            <span className="material-symbols-outlined star">star</span>
            {attributes.join(", ")}
          </p>
        )}

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
            <p>Relatives: {hero.connections.relatives}</p>

            <div className="powerstats">
              <p>
                <strong>Powerstats:</strong>
              </p>
              <p>Intelligence: {hero.powerstats.intelligence}</p>
              <p>Strength: {hero.powerstats.strength}</p>
              <p>Speed: {hero.powerstats.speed}</p>
              <p>Combat: {hero.powerstats.combat}</p>
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
        <div className="edit-delete relative flex justify-center">
          {showEditButton && isHeroInTeam(hero.id) && (
            <button
              className="edit-btn relative group flex items-center justify-center"
              onClick={() => navigate(`/edit-hero/${hero.slug}`)}
            >
              <span className="material-symbols-outlined editBtn text-2xl">edit</span>
              {/* Tooltip */}
              <span className="absolute bottom-full transform -translate-x-1/2 mb-2 p-1 bg-custom-blue text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                Edit
              </span>
            </button>
          )}
          {showRemoveButton && onRemove && (
            <button
              className="remove-btn relative group flex items-center justify-center"
              onClick={onRemove}
            >
              <span className="material-symbols-outlined deleteBtn text-2xl">delete</span>
              {/* Tooltip */}
              <span className="absolute bottom-full transform -translate-x-1/2 mb-2 p-1 bg-custom-blue text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                Remove
              </span>
            </button>
          )}
        </div>
      </article>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="p-6 rounded-lg shadow-lg text-center start-modal">
            <h2 className="text-2xl font-bold mb-4 start-modal-text">{hero.name} added to your team!</h2>
            <button
              className="bg-custom-blue hover:bg-custom-blue text-white font-400 py-2 px-4 rounded"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
            <button
              className="bg-custom-blue hover:bg-custom-blue text-white font-400 py-2 px-4 rounded"
              onClick={() => navigate("/my-team")}
            >
              My Team
            </button>
          </div>
        </div>
      )}
    </main>
  ) : (
    <p>No hero found.</p>
  );
}
