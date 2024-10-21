import { useState, FormEvent } from "react";
import { IHero } from "../interface";

interface EditHeroFormProps {
  hero: IHero;
  onSubmit: (data: IHero) => void;
}

export function EditHeroForm({ hero, onSubmit }: EditHeroFormProps) {
  // Formuläret fylls med befintlig hjälteinformation, null ersätts med ""
  const [name, setName] = useState(hero.name || "");
  const [aliases, setAliases] = useState(hero.biography.aliases.join(", ") || "");
  const [fullName, setFullName] = useState(hero.biography.fullName || "");
  const [occupation, setOccupation] = useState(hero.work.occupation || "");
  const [race, setRace] = useState(hero.appearance.race || "");
  const [alignment, setAlignment] = useState(hero.biography.alignment || "");
  const [associates, setAssociates] = useState(hero.connections.groupAffiliation || "");
  const [intelligence, setIntelligence] = useState(hero.powerstats.intelligence || 0);
  const [strength, setStrength] = useState(hero.powerstats.strength || 0);
  const [speed, setSpeed] = useState(hero.powerstats.speed || 0);
  const [combat, setCombat] = useState(hero.powerstats.combat || 0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const updatedHero: IHero = {
      ...hero, // Sprid ut alla befintliga egenskaper från 'hero'. Genom att använda ""...hero" kan vi kopiera alla befintliga värden och bara ändra det vi vill uppdatera.
      name,
      biography: {
        ...hero.biography, // Behåll alla befintliga egenskaper i 'biography'
        fullName,
        aliases: aliases.split(",").map((alias) => alias.trim()),
        alignment,
      },
      work: { ...hero.work, occupation },
      appearance: { ...hero.appearance, race },
      connections: { ...hero.connections, groupAffiliation: associates },
      powerstats: {
        intelligence,
        strength,
        speed,
        durability: hero.powerstats.durability,
        power: hero.powerstats.power,
        combat: hero.powerstats.combat,
      },
    };

    onSubmit(updatedHero); // Skicka tillbaka det uppdaterade hjälteobjektet till context
  };

  return (
    <form className="edit-hero-form" onSubmit={handleSubmit}>
      <fieldset className="edit-hero-input">
        <label>Hero Alias:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter hero alias"
          required
        />
      </fieldset>

      <fieldset className="edit-hero-input">
        <label>Hero Full Name:</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter hero full name"
        />
      </fieldset>

      <fieldset className="edit-hero-input">
        <label>Aliases (comma separated):</label>
        <input
          type="text"
          value={aliases}
          onChange={(e) => setAliases(e.target.value)}
          placeholder="Enter hero aliases"
        />
      </fieldset>

      <fieldset className="edit-hero-input">
        <label>Alignment:</label>
        <input
          type="text"
          value={alignment}
          onChange={(e) => setAlignment(e.target.value)}
          placeholder="Good/Bad/Neutral"
        />
      </fieldset>

      <fieldset className="edit-hero-input">
        <label>Occupation:</label>
        <input
          type="text"
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
          placeholder="Enter hero main occupation"
        />
      </fieldset>

      <fieldset className="edit-hero-input">
        <label>Race:</label>
        <input
          type="text"
          value={race}
          onChange={(e) => setRace(e.target.value)}
          placeholder="Enter hero race"
        />
      </fieldset>

      <fieldset className="edit-hero-input">
        <label>Associates:</label>
        <input
          type="text"
          value={associates}
          onChange={(e) => setAssociates(e.target.value)}
          placeholder="Enter other associates if any"
        />
      </fieldset>

      <section className="powerstats">
        <h3 className="powerstats-headline">Powerstats:</h3>

        <fieldset className="edit-hero-input">
          <label>Intelligence (0-100):</label>
          <input
            type="number"
            value={intelligence}
            onChange={(e) => setIntelligence(parseInt(e.target.value) || 0)}
            placeholder="Enter intelligence"
          />
        </fieldset>

        <fieldset className="edit-hero-input">
          <label>Strength (0-100):</label>
          <input
            type="number"
            value={strength}
            onChange={(e) => setStrength(parseInt(e.target.value) || 0)}
            placeholder="Enter strength"
          />
        </fieldset>

        <fieldset className="edit-hero-input">
          <label>Speed (0-100):</label>
          <input
            type="number"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value) || 0)}
            placeholder="Enter speed"
          />
        </fieldset>
        <fieldset className="edit-hero-input">
          <label>Combat (0-100):</label>
          <input
            type="number"
            value={combat}
            onChange={(e) => setCombat(parseInt(e.target.value) || 0)}
            placeholder="Enter combat level"
          />
        </fieldset>
      </section>
      <button type="submit">Update Hero</button>
    </form>
  );
}
