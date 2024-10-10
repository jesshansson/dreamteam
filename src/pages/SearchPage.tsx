import { useState } from "react";
import { useHeroes } from "../context/HeroContext";
import { SearchForm, HeroCard } from "../components";
import { IHero } from "../interface";
import { Link } from "react-router-dom";

export function SearchPage() {
  const { heroes, loading } = useHeroes();
  const [filteredHeroes, setFilteredHeroes] = useState<IHero[]>([]);

  const handleSearch = (alignment: string, powerstat: string, name: string, race: string) => {
    let result = heroes;

    // Om ett namn har angetts, filtrera på namn
    if (name) {
      result = result.filter((hero) => hero.name.toLowerCase().includes(name.toLowerCase()));
    }

    // Om alignment har valts, filtrera baserat på det (good/bad)
    if (alignment) {
      result = result.filter((hero) => hero.biography.alignment === alignment);
    }

    // Om en powerstat har valts, filtrera baserat på den valda
    if (powerstat) {
      result = result.filter((hero) => {
        if (powerstat === "strength") return hero.powerstats.strength > 80;
        if (powerstat === "intelligence") return hero.powerstats.intelligence > 80;
        if (powerstat === "speed") return hero.powerstats.speed > 80;
        return true; // Om ingen powerstat är vald, returnera alla
      });
    }

    // Filtrera på race
    if (race) {
      result = result.filter((hero) => {
        if (race === "human") return hero.appearance.race?.toLowerCase() === "human";
        if (race === "alien")
          return hero.appearance.race?.toLowerCase() !== "human" || !hero.appearance.race; // Alla som inte är "human" eller saknar race är "alien"
        return true;
      });
    }

    // Begränsa till 50 hjältar
    result = result.slice(0, 50);
    setFilteredHeroes(result); // Uppdatera resultaten
  };

  if (loading) {
    return <p>Loading heroes...</p>;
  }

  return (
    <>
      <h1>Search Heroes</h1>
      <section className="form-container">
        <SearchForm onSearch={handleSearch} />
      </section>
      <section>
        <ul className="search-results">
          {filteredHeroes.map((hero) => (
            <li className="search-result-item" key={hero.id}>
              <Link to={`/hero/${hero.slug}`} className="details-link">
                <HeroCard
                  hero={hero}
                  showSeeDetails={false}
                  detailed={false}
                  showRemoveButton={false}
                  showEditButton={false}
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
