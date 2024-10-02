// import { useEffect, useState } from "react";
// import { HeroCardProps, IHero } from "../interface";
// import { Link } from "react-router-dom";

// // Dynamisk funktion som genererar ett slumpmässigt index
// function getRandomId(length: number): number {
//   return Math.floor(Math.random() * length);
// }

// export function HeroCard({ detailed = false }: HeroCardProps) {
//   const [heroes, setHeroes] = useState<IHero[]>([]); // Array för att lagra alla hjältar
//   const [hero, setHero] = useState<IHero | null>(null); // Enstaka hjälte
//   const [loading, setLoading] = useState(true);

//   const fetchHeroes = async () => {
//     const API_URL = "https://akabab.github.io/superhero-api/api/all.json"; // API för att hämta alla hjältar
//     try {
//       const response = await fetch(API_URL);
//       const data = await response.json();
//       setHeroes(data); // Lagra alla hämtade hjältar i state
//       setLoading(false); // Stäng av laddningsstatus när datan är hämtad
//     } catch (error) {
//       console.error("Error fetching heroes:", error);
//       setLoading(false);
//     }
//   };

//   //Hämta alla hjältar vid första renderingen
//   useEffect(() => {
//     fetchHeroes();
//   }, []);

//   // När hjältarna är hämtade, slumpa fram en hjälte från listan
//   useEffect(() => {
//     if (heroes.length > 0) {
//       const randomIndex = getRandomId(heroes.length); // Använd längden på listan för att slumpa ett index
//       setHero(heroes[randomIndex]); // Sätt den slumpmässiga hjälten som ska visas
//     }
//   }, [heroes]); // Körs när listan med hjältar ändras

//   return loading ? (
//     <p>Loading superhero...</p>
//   ) : hero ? (
//     <main>
//       <article className="hero-card">
//         <h1>{hero.name}</h1>
//         <img src={hero.images.lg} alt={hero.name} />
//         <p>Full name: {hero.biography.fullName}</p>
//         <Link to={`/hero/${hero.slug}`}>View Details</Link>
//         {detailed && (
//           <>
//             <p>Aliases: {hero.biography.aliases}</p>
//             <p>Alignment: {hero.biography.alignment}</p>
//             <p>Occupation: {hero.work.occupation}</p>
//             <p>Intelligence: {hero.powerstats.intelligence}</p>
//             <p>Strength: {hero.powerstats.strength}</p>
//             <p>Speed: {hero.powerstats.speed}</p>
//           </>
//         )}
//       </article>
//     </main>
//   ) : (
//     <p>No hero found.</p>
//   );
// }

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
