import { FormEvent, useState } from "react";

interface SearchFormProps {
  onSearch: (alignment: string, powerstat: string, name: string, race: string) => void;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [alignment, setAlignment] = useState("");
  const [powerstat, setPowerstat] = useState("");
  const [name, setName] = useState("");
  const [race, setRace] = useState("");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    onSearch(alignment, powerstat, name, race); // Skicka sökparametrar till föräldern (SearchPage)
  };

  return (
    <main>
      <form className="search-form" onSubmit={handleSearch}>
        <label>Choose alignment:</label>
        <select value={alignment} onChange={(e) => setAlignment(e.target.value)}>
          <option value="">Select</option>
          <option value="good">Good</option>
          <option value="bad">Bad</option>
          <option value="neutral">Neutral</option>
        </select>

        <label>Choose main power:</label>
        <select value={powerstat} onChange={(e) => setPowerstat(e.target.value)}>
          <option value="">Select</option>
          <option value="strength">Strength</option>
          <option value="intelligence">Intelligence</option>
          <option value="speed">Speed</option>
        </select>

        <div className="human-alien-btn">
          <p className="human-alien-headline">Human? </p>
          <label>
            <input
              type="radio"
              value="human"
              checked={race === "human"}
              onChange={() => setRace("human")}
            />
            Human
          </label>
          <label>
            <input
              type="radio"
              value="alien"
              checked={race === "alien"}
              onChange={() => setRace("alien")}
            />
            Non-human
          </label>
        </div>

        <label>Search by name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter hero name"
        />

        <button type="submit">Search</button>
      </form>
    </main>
  );
}
