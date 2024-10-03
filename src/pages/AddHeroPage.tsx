import { HeroForm } from "../components/HeroForm";
import { useHeroes } from "../context/HeroContext";
import { IHero } from "../interface";

export function AddHeroPage() {
  const { addHero } = useHeroes(); // Hämta addHero från context

  const handleAddHero = (heroData: IHero) => {
    addHero(heroData); // Anropa addHero (från context) för att lägga till hjälten
  };
  //När formuläret skickas, tar handleAddHero emot det nya hjälteobjektet från HeroForm och skickar det till addHero i Context, som uppdaterar listan över hjältar.

  return (
    <>
      <h1>Add a New Hero</h1>
      <HeroForm onSubmit={handleAddHero} />
    </>
  );
}
