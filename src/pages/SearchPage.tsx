import { useState } from "react";
import { SearchForm, HeroCard, Pagination } from "../components";
import { IHero } from "../interface";
import { Link, useLoaderData } from "react-router-dom";

export function SearchPage() {
  const heroes = useLoaderData() as IHero[]; 
  const [filteredHeroes, setFilteredHeroes] = useState<IHero[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [heroesPerPage] = useState(25);
  const [searchDone, setSearchDone] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSearch = (alignment: string, powerstat: string, name: string, race: string) => {
    setSearchDone(true);
    let result = heroes;

    // Sök på namn
    if (name) {
      result = result.filter((hero) => hero.name.toLowerCase().includes(name.toLowerCase()));
    }

    // Filtrera baserat på alignment (good/bad)
    if (alignment) {
      result = result.filter((hero) => hero.biography.alignment === alignment);
    }

    // Filtrera på powerstat
    if (powerstat) {
      result = result.filter((hero) => {
        if (powerstat === "strength") return hero.powerstats.strength > 80;
        if (powerstat === "intelligence") return hero.powerstats.intelligence > 80;
        if (powerstat === "speed") return hero.powerstats.speed > 80;
        return true; // Om ingen powerstat är vald, returnera alla
      });
    }

    // Filtrera på human vs non-human
    if (race) {
      result = result.filter((hero) => {
        if (race === "human") return hero.appearance.race?.toLowerCase() === "human";
        if (race === "alien")
          return hero.appearance.race?.toLowerCase() !== "human" || !hero.appearance.race; // Alla som inte är "human" eller saknar race är "alien"
        return true;
      });
    }

    setFilteredHeroes(result); // Uppdatera resultaten
  };

  if (heroes.length === 0) {
    return <p>Loading heroes...</p>;
  }
  // Pagineringen
  // Räkna ut var på sidan resultaten ska börja och sluta baserat på currentPage och heroesPerPage
  const indexOfLastHero = currentPage * heroesPerPage;
  const indexOfFirstHero = indexOfLastHero - heroesPerPage;
  const currentHeroes = filteredHeroes.slice(indexOfFirstHero, indexOfLastHero);

  // Räkna ut hur många sidor vi behöver baserat på antal resultat och antal hjältar per sida
  const totalPages = Math.ceil(filteredHeroes.length / heroesPerPage);

  return (
    <>
      <h1 className="search-header">Search Recruits</h1>
      <section className="form-container">
        <SearchForm onSearch={handleSearch} />
      </section>
      <section>
        {searchDone && filteredHeroes.length === 0 ? (
          <p className="search-message">No heroes or villains found. Try another search!</p>
        ) : (
          <>
            {filteredHeroes.length > 0 && (
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}

            <ul className="search-results">
              {currentHeroes.map((hero) => (
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

            {filteredHeroes.length > 0 && (
              <div className="pagination-buttons">
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
                <button
                  className="back-to-top-btn"
                  onClick={() => {
                    window.scrollTo(0, 0);
                  }}
                >
                  Back to top
                </button>
              </div>
            )}
          </>
        )}
      </section>
      <button className="scroll-to-top-btn" onClick={scrollToTop}>
        <span className="material-symbols-outlined arrow">arrow_upward</span> Top
      </button>
    </>
  );
}
