import { useEffect, useState } from "react";
import quotes from "../assets/quotes.json";
import { useLocation } from "react-router-dom";

export function Footer() {
  const [randomQuote, setRandomQuote] = useState({ character: "", quote: "" });
  const location = useLocation(); // useLocation används för att lyssna på URL-förändringar

  useEffect(() => {
    // Väljer ett slumpmässigt citat från JSON-filen
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setRandomQuote(quotes[randomIndex]);
  }, [location]); //location som beroende så att useEffect triggas varje gång URL(sidan) byts

  return (
    <footer className="footer">
      <p>
        "{randomQuote.quote}" - {randomQuote.character}
      </p>
    </footer>
  );
}
