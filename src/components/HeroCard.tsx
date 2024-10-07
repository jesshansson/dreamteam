import { Link } from "react-router-dom";
import { IHero } from "../interface";

interface HeroCardProps {
  hero: IHero;
  detailed?: boolean;
  showSeeDetails?: boolean;
}

export function HeroCard({ hero, detailed = false, showSeeDetails = true }: HeroCardProps) {
  return hero ? (
    <main>
      <article className="hero-card">
        <h1 className="hero-name">{hero.name}</h1>
        <img src={hero.images.lg || "/logo.png"} alt={hero.name} />
        <p>Full name: {hero.biography.fullName}</p>
        <p>Aliases: {hero.biography.aliases.join(", ")}</p>
        <p className={`alignment ${hero.biography.alignment}`}>
          Alignment:{" "}
          {hero.biography.alignment.charAt(0).toUpperCase() + hero.biography.alignment.slice(1)}
        </p>
        {showSeeDetails ? <Link to={`/hero/${hero.slug}`}>View Details</Link> : ""}

        {detailed && (
          <>
            <p>Occupation: {hero.work.occupation}</p>
            <p>Race: {hero.appearance.race} </p>
            <p>Connections: {hero.connections.relatives} </p>
            <div className="powerstats">
              <p>
                <strong>Powerstats:</strong>
              </p>
              <p>Intelligence: {hero.powerstats.intelligence}</p>
              <p>Strength: {hero.powerstats.strength}</p>
              <p>Speed: {hero.powerstats.speed}</p>
            </div>
          </>
        )}
      </article>
    </main>
  ) : (
    <p>No hero found.</p>
  );
}
