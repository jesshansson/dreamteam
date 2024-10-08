import { FormEvent, useState } from "react";
import { IHero } from "../interface";
// import defaultImg from "../assets/logo.png";

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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Hero Alias:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter hero alias"
        />
      </div>
      <div>
        <label>Hero Full Name:</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter hero full name"
        />
      </div>
      <div>
        <label>Aliases (comma separated):</label>
        <input
          type="text"
          value={aliases}
          onChange={(e) => setAliases(e.target.value)}
          placeholder="Enter hero aliases, separated by commas"
        />
      </div>
      <div>
        <label>Alignment:</label>
        <input
          type="text"
          value={alignment}
          onChange={(e) => setAlignment(e.target.value)}
          placeholder="Good/Bad"
        />
      </div>
      <div>
        <label>Occupation:</label>
        <input
          type="text"
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
          placeholder="Enter hero main occupation"
        />
      </div>
      <div>
        <label>Race:</label>
        <input
          type="text"
          value={race}
          onChange={(e) => setRace(e.target.value)}
          placeholder="Enter hero race"
        />
      </div>
      <div>
        <label>Associates:</label>
        <input
          type="text"
          value={associates}
          onChange={(e) => setAssociates(e.target.value)}
          placeholder="Enter other associates if any"
        />
      </div>
      <p>Powerstats:</p>
      <div>
        <label>Intelligence (0-100):</label>
        <input
          type="number"
          value={intelligence}
          onChange={(e) => setIntelligence(parseInt(e.target.value) || 0)} //parseInt(e.target.value) för att konvertera värdet från input-fältet (som är en string) till ett number
          placeholder="Enter intelligence"
        />
      </div>
      <div>
        <label>Strength (0-100):</label>
        <input
          type="number"
          value={strength}
          onChange={(e) => setStrength(parseInt(e.target.value) || 0)}
          placeholder="Enter strength"
        />
      </div>
      <div>
        <label>Speed (0-100):</label>
        <input
          type="number"
          value={speed}
          onChange={(e) => setSpeed(parseInt(e.target.value) || 0)}
          placeholder="Enter speed"
        />
      </div>

      <button type="submit">Add Hero</button>
    </form>
  );
}
