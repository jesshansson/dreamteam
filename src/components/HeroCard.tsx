import { Link, useParams } from "react-router-dom";
import { IHero } from "../interface";
import { useState, useEffect } from "react";
import { useHeroes } from "../context/HeroContext";

interface HeroCardProps {
  detailed?: boolean;
  showSeeDetails?: boolean;
}

export function HeroCard({ detailed = false, showSeeDetails = true }: HeroCardProps) {
  const { heroes, loading } = useHeroes(); // Använd context(useHeroes) för att få tillgång till all data som lagras i HeroContext
  const { slug } = useParams(); // Hämta slug från URL:en
  const [hero, setHero] = useState<IHero | null>(null);

  useEffect(() => {
    if (heroes.length > 0) {
      if (slug) {
        const selectedHero = heroes.find((hero) => hero.slug === slug); //Om .find() hittar en hjälte där hjälteobjektets slug stämmer överens med slug i URL, returnerar den den hjälten.
        setHero(selectedHero || null);
      } else {
        const randomIndex = Math.floor(Math.random() * heroes.length); //Om ingen slug finns (alltså om det är StartPage), slumpas en hjälte fram och visas.
        setHero(heroes[randomIndex]);
      }
    }
  }, [heroes, slug]);

  return loading ? (
    <p>Loading superhero...</p>
  ) : hero ? (
    <main>
      <article className="hero-card">
        <h1 className="hero-name">{hero.name}</h1>
        <img src={hero.images.lg} alt={hero.name} />
        <p>Full name: {hero.biography.fullName}</p>
        <p>Aliases: {hero.biography.aliases.join(", ")}</p>
        <p>Alignment: {hero.biography.alignment}</p>
        {showSeeDetails ? <Link to={`/hero/${hero.slug}`}>View Details</Link> : ""}

        {detailed && (
          <>
            <p>Occupation: {hero.work.occupation}</p>
            <p>Race:{hero.appearance.race} </p>
            <p>
              <strong>Powerstats:</strong>
            </p>
            <p>Intelligence: {hero.powerstats.intelligence}</p>
            <p>Strength: {hero.powerstats.strength}</p>
            <p>Speed: {hero.powerstats.speed}</p>
          </>
        )}
      </article>
    </main>
  ) : (
    <p>No hero found.</p>
  );
}
