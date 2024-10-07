import { FormEvent, useState } from "react";
import { IHero } from "../interface";
// import defaultImg from "../assets/logo.png";

interface HeroFormProps {
  onSubmit: (data: IHero) => void;
}

export function HeroForm({ onSubmit }: HeroFormProps) {
  const [name, setName] = useState("");
  // const [alias, setAlias] = useState([]);
  const [fullName, setFullName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [race, setRace] = useState("");
  const [alignment, setAlignment] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Skapa ett nytt hjälteobjekt med standardvärden för fälten användaren inte fyller i
    const newHero: IHero = {
      id: Math.random(), // Generera ett unikt id
      name: name,
      slug: name.toLowerCase().replace(/\s+/g, "-"), // Generera slug från namnet
      powerstats: { intelligence: 0, strength: 0, speed: 0, durability: 0, power: 0, combat: 0 }, // Standardvärden
      appearance: {
        gender: "",
        race: race,
        height: [""],
        weight: [""],
        eyeColor: "",
        hairColor: "",
      }, // Standardvärden
      biography: {
        fullName: fullName,
        alterEgos: "",
        aliases: [],
        placeOfBirth: "",
        firstAppearance: "",
        publisher: "",
        alignment: alignment,
      },
      work: { occupation: occupation, base: "" },
      connections: { groupAffiliation: "", relatives: "" },
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
      {/* <div>
        <label>Alias:</label>
        <input
          type="text"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
          placeholder="Enter hero alias"
        />
      </div> */}
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

      <button type="submit">Add Hero</button>
    </form>
  );
}
