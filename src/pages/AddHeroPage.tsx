import { useNavigate } from "react-router-dom";
import { HeroForm } from "../components/HeroForm";
import { useHeroes } from "../context/HeroContext";
import { IHero } from "../interface";

export function AddHeroPage() {
  const { addHeroToTeam } = useHeroes(); // Hämta addHero från context
  const navigate = useNavigate();

  const handleAddHero = (heroData: IHero) => {
    addHeroToTeam(heroData); // Anropa addHero (från context) för att lägga till hjälten
    navigate("/my-team");
  };
  //När formuläret skickas, tar handleAddHero emot det nya hjälteobjektet från HeroForm och skickar det till addHero i Context, som uppdaterar listan över hjältar.

  return (
    <main>
      <h1>Add a New Hero</h1>
      <article>
        <HeroForm onSubmit={handleAddHero} />
      </article>
    </main>
  );
}
