import { useState } from "react";

interface SearchFormProps {
  onSearch: (alignment: string, powerstat: string, name: string) => void;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [alignment, setAlignment] = useState("");
  const [powerstat, setPowerstat] = useState("");
  const [name, setName] = useState("");

  const handleSearch = () => {
    onSearch(alignment, powerstat, name); // Skicka till föräldern (SearchPage)
  };

  return (
    <main className="search-form">
      <label>Choose Alignment:</label>
      <select value={alignment} onChange={(e) => setAlignment(e.target.value)}>
        <option value="">Select</option>
        <option value="good">Good</option>
        <option value="bad">Bad</option>
      </select>

      <label>Choose main power:</label>
      <select value={powerstat} onChange={(e) => setPowerstat(e.target.value)}>
        <option value="">Select</option>
        <option value="strength">Strength</option>
        <option value="intelligence">Intelligence</option>
        <option value="speed">Speed</option>
      </select>
      <label>Search by name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter hero name"
      />
      <button onClick={handleSearch}>Search</button>
    </main>
  );
}
