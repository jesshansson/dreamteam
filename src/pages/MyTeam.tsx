import { Link } from "react-router-dom";
import { useHeroes } from "../context/HeroContext"; // Importera useHeroes för att få tillgång till heroes
import { HeroCard } from "../components";

export function MyTeam() {
  const { customHeroes } = useHeroes(); // Hämta endast skapade hjältar från Context

  if (customHeroes.length === 0) {
    return <p>No heroes have been added to your team yet.</p>; // Visa meddelande om inga hjältar har lagts till
  }

  return (
    <>
      <main className="my-team-container">
        <h1>My Team</h1>
        <ul className="saved-heroes"></ul>
        <ul className="created-heroes">
          {customHeroes.map((hero) => (
            <li className="my-team-card" key={hero.id}>
              <HeroCard hero={hero} showSeeDetails={true} detailed={false} />
            </li>
          ))}
        </ul>
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
