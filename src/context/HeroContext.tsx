import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { IHero } from "../interface";

// Definiera vilken typ av data som Context ska hantera, inklusive funktionen för att lägga till en hjälte
interface HeroContextData {
  heroes: IHero[];
  customHeroes: IHero[];
  loading: boolean;
  addHero: (newHero: IHero) => void; // Komponenter som använder context kan anropa funktionen.
}

// Skapa Context
const HeroContext = createContext<HeroContextData | undefined>(undefined); // Om ingen Provider omger komponenten som försöker använda context, så kommer context att vara undefined. undefined som default för att ha en tom utgångspunkt

// HeroProvider-komponent för att tillhandahålla datan
export const HeroProvider = ({ children }: { children: ReactNode }) => {
  const [heroes, setHeroes] = useState<IHero[]>([]);
  const [customHeroes, setCustomHeroes] = useState<IHero[]>([]); // Skapade hjältar
  const [loading, setLoading] = useState(true);

  // Spara endast skapade hjältar till local storage
  const saveCustomHeroesToLocalStorage = (data: IHero[]) => {
    localStorage.setItem("customHeroes", JSON.stringify(data));
  };

  // Hämta hjältar från local storage när sidan laddas
  useEffect(() => {
    const storedCustomHeroes = localStorage.getItem("customHeroes");
    if (storedCustomHeroes) {
      setCustomHeroes(JSON.parse(storedCustomHeroes)); // Hämta skapade hjältar från local storage
    }

    // Hämta alla hjältar från API:t
    const fetchHeroes = async () => {
      const API_URL = "https://akabab.github.io/superhero-api/api/all.json";
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setHeroes(data); // Sätt state med hjältar från API
        setLoading(false);
      } catch (error) {
        console.error("Error fetching heroes from API:", error);
        setLoading(false);
      }
    };
    fetchHeroes();
  }, []);

  // Funktion för att lägga till en ny hjälte
  const addHero = (newHero: IHero) => {
    const updatedCustomHeroes = [...customHeroes, newHero]; // Lägg till ny hjälte
    setCustomHeroes(updatedCustomHeroes); // Uppdatera state
    saveCustomHeroesToLocalStorage(updatedCustomHeroes); // Spara endast skapade hjältar
    console.log("Custom heroes after addition:", updatedCustomHeroes);
  };

  return (
    <HeroContext.Provider value={{ heroes, loading, customHeroes, addHero }}>
      {children}
    </HeroContext.Provider>
  );
};

// Custom hook för att använda Context i komponenterna. När den används i en komponent kan vi direkt få tillgång till datan från HeroContext. Om context är undefined (om komponenten inte är omgiven av en HeroProvider), kastar vi ett fel
export const useHeroes = () => {
  const context = useContext(HeroContext);
  if (!context) {
    throw new Error("useHeroes must be used within a HeroProvider");
  }
  return context;
};
