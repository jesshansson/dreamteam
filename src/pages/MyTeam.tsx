import { Link } from "react-router-dom";
import { HeroCard, AlignmentChart, PowerstatsChart } from "../components";
import { useHeroes } from "../context/HeroContext";

export function MyTeam() {
  const { customHeroes, teamHeroes, removeHeroFromTeam, loading } = useHeroes(); // Använder useHeroes för att hämta context-data

  if (loading) {
    return <p>Loading heroes...</p>; // Visa laddningsmeddelande tills datan är hämtad
  }

  if (customHeroes.length === 0 && teamHeroes.length === 0) {
    <>
      <p className="no-heroes-msg">No heroes have been added to your team yet.</p>
      <Link to={"/add-hero"}>
        <button className="my-team-add-btn top">Create a new superhero</button>
      </Link>
    </>;
  }

  // Funktion som rullar till toppen av fönstret
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <main className="my-team-container">
        <h1>My Team</h1>

        <section className="navigation">
          <p>- Navigation -</p>
          <div className="navigation-buttons">
            <a href="#created-members">★ Created Members</a>
            <a href="#recruits">★ Recruits</a>
            <a href="#statistics-container">★ Statistics</a>
          </div>
        </section>

        <section id="created-members">
          <h2 className="heroes-headline">Created Members</h2>
          {customHeroes.length === 0 ? (
            <p className="no-heroes-msg">No created members have been added to your team yet.</p>
          ) : (
            <ul className="created-heroes">
              {customHeroes.map((hero) => (
                <li className="my-team-card" key={hero.id}>
                  <HeroCard
                    hero={hero}
                    showSeeDetails={true}
                    detailed={false}
                    showRemoveButton={true}
                    onRemove={() => removeHeroFromTeam(hero.id)} //onRemove skickas som prop som funktion till HeroCard.
                  />
                </li>
              ))}
            </ul>
          )}
          <Link to={"/add-hero"}>
            <button className="my-team-add-btn">Create a new member</button>
          </Link>
        </section>
        <section id="recruits">
          <h2 className="heroes-headline">Recruits</h2>
          {teamHeroes.filter((hero) => !hero.isCustom).length === 0 ? (
            <p className="no-heroes-msg">No recruits have been added to your team yet.</p>
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
                      showRemoveButton={true}
                      onRemove={() => removeHeroFromTeam(hero.id)}
                    />
                  </li>
                ))}
            </ul>
          )}
          <Link to={"/search"}>
            <button className="my-team-add-btn">Look for a new recruit</button>
          </Link>
        </section>
        <section id="statistics-container">
          <h2 className="heroes-headline">Team statistics</h2>
          <section className="statistics">
            <AlignmentChart />
            <PowerstatsChart />
          </section>
          <button
            className="back-to-top-btn"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            Back to top
          </button>
        </section>
        <button className="scroll-to-top-btn" onClick={scrollToTop}>
          <span className="material-symbols-outlined arrow">arrow_upward</span> Top
        </button>
      </main>
    </>
  );
}
