import { Link } from "react-router-dom";
import { useHeroes } from "../context/HeroContext"; // Importera useHeroes för att få tillgång till heroes
import { HeroCard } from "../components";

export function MyTeam() {
  const { customHeroes, teamHeroes, removeHeroFromTeam, loading } = useHeroes(); // Hämta både skapade hjältar och team/favorithjältar
  // console.log("Team heroes:", teamHeroes);

  if (loading) {
    return <p>Loading heroes...</p>;
  }

  if (customHeroes.length === 0 && teamHeroes.length === 0) {
    return <p>No heroes have been added to your team yet.</p>;
  }

  return (
    <>
      <main className="my-team-container">
        <h1>My Team</h1>
        <h2>Created Heroes</h2>
        {customHeroes.length === 0 ? (
          <p>No created heroes have been added to your team yet.</p>
        ) : (
          <ul className="created-heroes">
            {customHeroes.map((hero) => (
              <li className="my-team-card" key={hero.id}>
                <HeroCard
                  hero={hero}
                  showSeeDetails={true}
                  detailed={false}
                  showRemoveButton={true} // Visa ta bort-knappen
                  onRemove={() => removeHeroFromTeam(hero.id)}
                />
              </li>
            ))}
          </ul>
        )}

        <h2>Favorite Heroes</h2>
        {teamHeroes.filter((hero) => !hero.isCustom).length === 0 ? (
          <p>No favorite heroes have been added to your team yet.</p>
        ) : (
          <ul className="favorite-heroes">
            {teamHeroes
              .filter((hero) => !hero.isCustom) // Filtrera ut hjältar som inte är skapade av användaren (API-favoriter)
              .map((hero) => (
                <li className="my-team-card" key={hero.id}>
                  <HeroCard
                    hero={hero}
                    showSeeDetails={true}
                    detailed={false}
                    showRemoveButton={true} // Visa ta bort-knappen
                    onRemove={() => removeHeroFromTeam(hero.id)}
                  />
                </li>
              ))}
          </ul>
        )}
        <Link to={"/add-hero"}>
          <button className="my-team-add-btn">Add a superhero</button>
        </Link>
      </main>
    </>
  );
}

// Innehålla
// HeroCard.tsx
// DeleteHero.tsx?
