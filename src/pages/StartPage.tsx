import { HeroCard } from "../components/HeroCard";
import { useHeroes } from "../context/HeroContext";

export function StartPage() {
  const { loading } = useHeroes();

  // useEffect(() => {
  //   console.log("Rendering StartPage, loading:", loading);
  //   if (!loading) {
  //     console.log("Heroes to display:", heroes);
  //   }
  // }, [loading, heroes]);

  if (loading) {
    return <p>Loading superhero...</p>; // Visa laddningsmeddelande om loading är true
  }

  return (
    <>
      <HeroCard />
    </>
  );
}
