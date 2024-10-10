import { useEffect, useState } from "react";
import quotes from "../assets/quotes.json";

export function Footer() {
  const [randomQuote, setRandomQuote] = useState({ character: "", quote: "" });

  useEffect(() => {
    // Väljer ett slumpmässigt citat från JSON-filen
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setRandomQuote(quotes[randomIndex]);
  }, []);

  return (
    <footer className="footer">
      <p>
        "{randomQuote.quote}" - {randomQuote.character}
      </p>
    </footer>
  );
}
