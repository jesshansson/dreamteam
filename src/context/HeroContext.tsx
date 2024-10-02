import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { IHero } from "../interface";

// Definiera vilken typ av data som Context ska hantera
interface HeroContextData {
  heroes: IHero[];
  loading: boolean;
  error: string | null;
}

// Skapa Context
const HeroContext = createContext<HeroContextData | undefined>(undefined); // Om ingen Provider omger komponenten som försöker använda Context, så kommer Context att vara undefined. undefined som default för att ha en tom utgångspunkt

// HeroProvider-komponent för att tillhandahålla datan
export const HeroProvider = ({ children }: { children: ReactNode }) => {
  const [heroes, setHeroes] = useState<IHero[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hämta alla hjältar en gång vid första renderingen
  useEffect(() => {
    const fetchHeroes = async () => {
      const API_URL = "https://akabab.github.io/superhero-api/api/all.json";
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setHeroes(data); // Lagra alla hämtade hjältar
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch heroes");
        setLoading(false);
      }
    };

    fetchHeroes();
  }, []);

  return <HeroContext.Provider value={{ heroes, loading, error }}>{children}</HeroContext.Provider>;
};

// Custom hook för att använda Context i komponenterna. När den används i en komponent kan vi direkt få tillgång till datan från HeroContext. Om context är undefined (om komponenten inte är omgiven av en HeroProvider), kastar vi ett fel
export const useHeroes = () => {
  const context = useContext(HeroContext);
  if (!context) {
    throw new Error("useHeroes must be used within a HeroProvider");
  }
  return context;
};
