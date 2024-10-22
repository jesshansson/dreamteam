import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  const { pathname } = useLocation(); // En hook som ger tillgång till information om den aktuella platsen i applikationen. Returnerar ett objekt med information om URL, så att pathname t.ex. blir "/my-team".

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]); //useEffect triggas varje gång pathname (URL:en) ändras

  return null; // Komponenten renderar inget visuellt, den kör bara sin effekt
};
