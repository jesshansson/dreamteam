import { useParams } from "react-router-dom";
import { HeroCard } from "../components/HeroCard";
import { useHeroes } from "../context/HeroContext";
import { useState, useEffect } from "react";
import { IHero } from "../interface";

export function HeroDetails() {
  const { slug } = useParams(); // Hämta slug från URL:en
  const { heroes, loading } = useHeroes(); // Hämta hjälteinformationen från Context
  const [hero, setHero] = useState<IHero | null>(null); // State för att lagra den valda hjälten

  useEffect(() => {
    if (heroes.length > 0 && slug) {
      const selectedHero = heroes.find((hero) => hero.slug === slug); // Hitta rätt hjälte baserat på slug
      setHero(selectedHero || null); // Sätt den valda hjälten eller null om den inte finns
    }
  }, [heroes, slug]); // Denna effect körs om heroes eller slug ändras

  if (loading) {
    return <p>Loading hero details...</p>;
  }

  return hero ? (
    <HeroCard hero={hero} detailed={true} showSeeDetails={false} /> // Skicka hjälten som prop till HeroCard
  ) : (
    <p>No hero found.</p>
  );
}
