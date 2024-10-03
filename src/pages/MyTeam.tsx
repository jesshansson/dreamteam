import { Link } from "react-router-dom";
import { useHeroes } from "../context/HeroContext"; // Importera useHeroes för att få tillgång till heroes

export function MyTeam() {
  const { customHeroes } = useHeroes(); // Hämta endast skapade hjältar från Context

  if (customHeroes.length === 0) {
    return <p>No heroes have been added to your team yet.</p>; // Visa meddelande om inga hjältar har lagts till
  }

  return (
    <>
      <h1>My Team</h1>
      <ul className="saved-heroes"></ul>
      <ul className="created-heroes">
        {customHeroes.map((hero) => (
          <li className="my-team-card" key={hero.id}>
            <h2>{hero.name}</h2>
            <p>Alignment: {hero.biography.alignment}</p>
          </li>
        ))}
      </ul>
      <Link to={"/add-hero"}>
        <button>Add a superhero</button>
      </Link>
    </>
  );
}

// Innehålla
// HeroCard.tsx
// DeleteHero.tsx?
