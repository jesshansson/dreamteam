import { FormEvent, useState } from "react";
import { IHero } from "../interface";

interface HeroFormProps {
  onSubmit: (data: IHero) => void;
}

export function HeroForm({ onSubmit }: HeroFormProps) {
  const [name, setName] = useState("");
  const [aliases, setAliases] = useState("");
  const [fullName, setFullName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [race, setRace] = useState("");
  const [alignment, setAlignment] = useState("");
  const [associates, setAssociates] = useState("");
  const [intelligence, setIntelligence] = useState(0);
  const [strength, setStrength] = useState(0);
  const [speed, setSpeed] = useState(0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Skapa ett nytt hjälteobjekt med standardvärden för fälten användaren inte fyller i
    const newHero: IHero = {
      id: Math.random(), // Generera ett unikt id
      name: name,
      slug: name.toLowerCase().replace(/\s+/g, "-"), // Generera slug från namnet
      powerstats: {
        intelligence: intelligence,
        strength: strength,
        speed: speed,
        durability: 0,
        power: 0,
        combat: 0,
      },
      appearance: {
        gender: "",
        race: race,
        height: [""],
        weight: [""],
        eyeColor: "",
        hairColor: "",
      },
      biography: {
        fullName: fullName,
        alterEgos: "",
        aliases: aliases.split(",").map((alias) => alias.trim()), // split(",") delar upp aliases-strängen i en array baserat på kommatecken som separator. Sedan: map() går igenom varje alias i arrayen och tillämpar trim() för att ta bort överflödiga mellanslag i början och slutet av varje alias.
        placeOfBirth: "",
        firstAppearance: "",
        publisher: "",
        alignment: alignment,
      },
      work: { occupation: occupation, base: "" },
      connections: { groupAffiliation: associates, relatives: "" },
      images: {
        xs: "/logo.png",
        sm: "/logo.png",
        md: "/logo.png",
        lg: "/logo.png",
      },
      isCustom: true, // Flagg för att indikera att hjälten är skapad av användaren
    };

    onSubmit(newHero); // Skicka hela hjälteobjektet till parent-komponenten
  };
  return (
    <form className="add-hero-form" onSubmit={handleSubmit}>
      <fieldset className="add-hero-input">
        <label>Hero Alias:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter hero alias"
          required
        />
      </fieldset>

      <fieldset className="add-hero-input">
        <label>Hero Full Name:</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter hero full name"
        />
      </fieldset>

      <fieldset className="add-hero-input">
        <label>Aliases (comma separated):</label>
        <input
          type="text"
          value={aliases}
          onChange={(e) => setAliases(e.target.value)}
          placeholder="Enter hero aliases"
        />
      </fieldset>

      <fieldset className="add-hero-input">
        <label>Alignment:</label>
        <input
          type="text"
          value={alignment}
          onChange={(e) => setAlignment(e.target.value)}
          placeholder="Good/Bad"
        />
      </fieldset>

      <fieldset className="add-hero-input">
        <label>Occupation:</label>
        <input
          type="text"
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
          placeholder="Enter hero main occupation"
        />
      </fieldset>

      <fieldset className="add-hero-input">
        <label>Race:</label>
        <input
          type="text"
          value={race}
          onChange={(e) => setRace(e.target.value)}
          placeholder="Enter hero race"
        />
      </fieldset>

      <fieldset className="add-hero-input">
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

        <fieldset className="add-hero-input">
          <label>Intelligence (0-100):</label>
          <input
            type="number"
            value={intelligence}
            onChange={(e) => setIntelligence(parseInt(e.target.value) || 0)}
            placeholder="Enter intelligence"
          />
        </fieldset>

        <fieldset className="add-hero-input">
          <label>Strength (0-100):</label>
          <input
            type="number"
            value={strength}
            onChange={(e) => setStrength(parseInt(e.target.value) || 0)}
            placeholder="Enter strength"
          />
        </fieldset>

        <fieldset className="add-hero-input">
          <label>Speed (0-100):</label>
          <input
            type="number"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value) || 0)}
            placeholder="Enter speed"
          />
        </fieldset>
      </section>
      <button type="submit">Add Hero</button>
    </form>
  );
}
