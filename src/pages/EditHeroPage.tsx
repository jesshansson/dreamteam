import { useParams, useNavigate } from "react-router-dom";
import { useHeroes } from "../context/HeroContext";
import { EditHeroForm } from "../components/EditHeroForm"; // Importera den nya EditHeroForm
import { IHero } from "../interface";

export function EditHeroPage() {
  const { slug } = useParams();
  const { teamHeroes, updateHero } = useHeroes();
  const navigate = useNavigate();

  const hero = teamHeroes.find((h) => h.slug === slug);

  const handleSubmit = (updatedHero: IHero) => {
    updateHero(updatedHero); // Använd funktionen för att uppdatera hjälten
    navigate("/my-team");
  };

  return hero ? (
    <main>
      <h1>Edit {hero.name}</h1>
      <EditHeroForm hero={hero} onSubmit={handleSubmit} />
    </main>
  ) : (
    <p>No hero found.</p>
  );
}
