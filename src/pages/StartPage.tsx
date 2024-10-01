import { useEffect, useState } from "react";
import { IHero } from "../interface";

// Dynamisk funktion som tar emot längden på arrayen för att generera ett slumpmässigt index
function getRandomId(length: number): number {
  return Math.floor(Math.random() * length);
}

export function StartPage() {
  const [heroes, setHeroes] = useState<IHero[]>([]); // Array för att lagra alla hjältar
  const [hero, setHero] = useState<IHero | null>(null); // Enstaka hjälte
  const [loading, setLoading] = useState(true); // Hanterar laddningsstatus

  const fetchHeroes = async () => {
    const API_URL = "https://akabab.github.io/superhero-api/api/all.json"; // API för att hämta alla hjältar
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setHeroes(data); // Lagra alla hämtade hjältar i state
      setLoading(false); // Stäng av laddningsstatus när datan är hämtad
    } catch (error) {
      console.error("Error fetching heroes:", error);
      setLoading(false);
    }
  };

  // Hämta alla hjältar vid första renderingen
  useEffect(() => {
    fetchHeroes();
  }, []);

  // När hjältarna är hämtade, slumpa fram en hjälte från listan
  useEffect(() => {
    if (heroes.length > 0) {
      const randomIndex = getRandomId(heroes.length); // Använd längden på listan för att slumpa ett index
      setHero(heroes[randomIndex]); // Sätt den slumpmässiga hjälten som ska visas
    }
  }, [heroes]); // Körs när listan med hjältar ändras

  return loading ? (
    <p>Loading superhero...</p>
  ) : hero ? (
    <main>
      <article className="hero-card">
        <h1>{hero.name}</h1>
        <p>Full name: {hero.biography.fullName}</p>
        <p>Alignment: {hero.biography.alignment}</p>
        <p>Occupation: {hero.work.occupation}</p>
        <p>Aliases: {hero.biography.aliases}</p>
        <img src={hero.images.lg} alt={hero.name} />
      </article>
    </main>
  ) : (
    <p>No hero found.</p>
  );
}
