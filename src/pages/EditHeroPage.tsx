import { useParams, useNavigate } from "react-router-dom";
import { useHeroes } from "../context/HeroContext";
import { EditHeroForm } from "../components/EditHeroForm";
import { IHero } from "../interface";
import { BackButton } from "../components/BackButton";

export function EditHeroPage() {
  const { slug } = useParams();
  const { teamHeroes, updateHero } = useHeroes();
  const navigate = useNavigate();

  const hero = teamHeroes.find((h) => h.slug === slug);

  const handleSubmit = (updatedHero: IHero) => {
    updateHero(updatedHero);
    navigate("/my-team");
  };

  return hero ? (
    <main>
      <h1>Edit {hero.name}</h1>
      <EditHeroForm hero={hero} onSubmit={handleSubmit} />
      <BackButton />
    </main>
  ) : (
    <p>No hero found.</p>
  );
}
