import { useEffect, useState } from "react";
import { IHero } from "../interface";

// Funktion för att slumpa fram ett ID mellan 1 och 731
function getRandomId(): number {
  return Math.floor(Math.random() * 731) + 1;
}

export function StartPage() {
  const [hero, setHero] = useState<IHero | null>(null);
  const [loading, setLoading] = useState(true);
  const fetchHero = (id: number) => {
    const API_URL = `https://akabab.github.io/superhero-api/api/id/${id}.json`;

    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Superhero with ID ${id} is missing.`);
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.name) {
          setHero(data); // Om datan är giltig, spara superhjälten
          setLoading(false);
          console.log(data);
        } else {
          // Om datan saknar ett namn eller inte är giltig, prova ett nytt ID
          fetchHero(getRandomId());
        }
      })
      .catch((error) => {
        console.error(error);
        fetchHero(getRandomId()); // Om ett fel uppstår, prova ett nytt ID
      });
  };

  //fetchHero-funktionen är utanför useEffect för att hålla logiken återanvändbar och enkel att hantera, men anropas inuti useEffect.
  useEffect(() => {
    fetchHero(getRandomId()); // Hämta en slumpmässig superhjälte vid laddning
  }, []);

  return loading ? (
    <p>Loading superhero...</p>
  ) : (
    hero && (
      <main>
        <article className="hero-card">
          <h1>{hero.name}</h1>
          <img src={hero.images.sm} alt={hero.name} />
          <p>Full name: {hero.biography.fullName}</p>
          <p>Alignment: {hero.biography.alignment}</p>
          {hero.biography.aliases ? <p> Alias(es): {hero.biography.aliases} </p> : ""}
        </article>
      </main>
    )
  );
}
