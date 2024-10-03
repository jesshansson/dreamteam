import { FormEvent, useState } from "react";
import { IHero } from "../interface";

interface HeroFormProps {
  onSubmit: (data: IHero) => void;
}

export function HeroForm({ onSubmit }: HeroFormProps) {
  const [name, setName] = useState("");
  const [alignment, setAlignment] = useState("good");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Skapa ett nytt hjälteobjekt med standardvärden för fälten användaren inte fyller i
    const newHero: IHero = {
      id: Math.random(), // Generera ett unikt id
      name: name,
      slug: name.toLowerCase().replace(/\s+/g, "-"), // Generera slug från namnet
      powerstats: { intelligence: 0, strength: 0, speed: 0, durability: 0, power: 0, combat: 0 }, // Standardvärden
      appearance: { gender: "", race: "", height: [""], weight: [""], eyeColor: "", hairColor: "" }, // Standardvärden
      biography: {
        fullName: "",
        alterEgos: "",
        aliases: [],
        placeOfBirth: "",
        firstAppearance: "",
        publisher: "",
        alignment: alignment,
      },
      work: { occupation: "", base: "" },
      connections: { groupAffiliation: "", relatives: "" },
      images: { xs: "", sm: "", md: "", lg: "" },
      isCustom: true, // Flagg för att indikera att hjälten är skapad av användaren
    };

    onSubmit(newHero); // Skicka hela hjälteobjektet till parent-komponenten
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Hero Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter hero name"
        />
      </div>
      <div>
        <label>Hero Power:</label>
        <input
          type="text"
          value={alignment}
          onChange={(e) => setAlignment(e.target.value)}
          placeholder="Enter hero alignment"
        />
      </div>
      <button type="submit">Add Hero</button>
    </form>
  );
}
