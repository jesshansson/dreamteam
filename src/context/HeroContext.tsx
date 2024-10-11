import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { IHero } from "../interface";

// Definiera vilken typ av data som Context ska hantera, inklusive funktionen för att lägga till en hjälte
interface HeroContextData {
  heroes: IHero[]; // Hjältar från API
  customHeroes: IHero[]; // Skapade hjältar
  teamHeroes: IHero[]; // Alla hjältar i "My Team" (både skapade och favoritmarkerade från API)
  loading: boolean;
  addHeroToTeam: (newHero: IHero) => void; // Funktion som komponenter kan anropa för att lägga till en hjälte i teamet
  removeHeroFromTeam: (heroId: number) => void; // Funktion för att ta bort en hjälte från teamet
  updateHero: (updatedHero: IHero) => void;
}

// Skapa Context
const HeroContext = createContext<HeroContextData | undefined>(undefined); // Om ingen Provider omger komponenten som försöker använda context, så kommer context att vara undefined. undefined som default för att ha en tom utgångspunkt

// HeroProvider-komponent för att tillhandahålla datan
export const HeroProvider = ({ children }: { children: ReactNode }) => {
  const [heroes, setHeroes] = useState<IHero[]>([]);
  const [customHeroes, setCustomHeroes] = useState<IHero[]>([]); // Skapade hjältar
  const [teamHeroes, setTeamHeroes] = useState<IHero[]>([]); // Alla hjältar i teamet (favoriter och skapade
  const [loading, setLoading] = useState(true);

  // Spara favoritmarkerade hjältar i localStorage
  const saveTeamHeroesToLocalStorage = (data: IHero[]) => {
    localStorage.setItem("teamHeroes", JSON.stringify(data));
  };

  // Spara skapade hjältar i local storage
  const saveCustomHeroesToLocalStorage = (data: IHero[]) => {
    localStorage.setItem("customHeroes", JSON.stringify(data));
  };

  // Hämta hjältar från localStorage när sidan laddas
  useEffect(() => {
    const storedCustomHeroes = localStorage.getItem("customHeroes");
    const storedTeamHeroes = localStorage.getItem("teamHeroes");

    if (storedCustomHeroes) {
      const parsedCustomHeroes = JSON.parse(storedCustomHeroes); //Konvertera JSON till array
      setCustomHeroes(parsedCustomHeroes); // Hämta teamhjältar från localStorage
    }

    if (storedTeamHeroes) {
      setTeamHeroes(JSON.parse(storedTeamHeroes));
    }

    // Hämta alla hjältar från API:t
    const fetchHeroes = async () => {
      const API_URL = "https://akabab.github.io/superhero-api/api/all.json";
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setHeroes(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching heroes from API:", error);
        setLoading(false);
      }
    };
    fetchHeroes();
  }, []);

  // Funktion för att lägga till en hjälte till teamet (både skapade och från API)
  const addHeroToTeam = (newHero: IHero) => {
    const updatedTeamHeroes = [...teamHeroes, newHero];
    setTeamHeroes(updatedTeamHeroes);

    // Spara alla i localStorage
    saveTeamHeroesToLocalStorage(updatedTeamHeroes);

    // Om hjälten är skapad av användaren, spara även i customHeroes och localStorage
    if (newHero.isCustom) {
      const updatedCustomHeroes = [...customHeroes, newHero];
      setCustomHeroes(updatedCustomHeroes); // Uppdatera customHeroes
      saveCustomHeroesToLocalStorage(updatedCustomHeroes); // Spara skapade hjältar i localStorage
    }
  };

  const removeHeroFromTeam = (heroId: number) => {
    const updatedTeamHeroes = teamHeroes.filter((hero) => hero.id !== heroId);
    setTeamHeroes(updatedTeamHeroes); // Uppdatera teamHeroes state
    saveTeamHeroesToLocalStorage(updatedTeamHeroes); // Uppdatera localStorage för teamHeroes

    // Om hjälten är skapad av användaren, ta bort den från customHeroes också
    const updatedCustomHeroes = customHeroes.filter((hero) => hero.id !== heroId);
    setCustomHeroes(updatedCustomHeroes); // Uppdatera customHeroes state
    saveCustomHeroesToLocalStorage(updatedCustomHeroes); // Uppdatera localStorage för customHeroes
  };

  const updateHero = (updatedHero: IHero) => {
    // Uppdatera teamHeroes
    const updatedTeamHeroes = teamHeroes.map((hero) =>
      hero.id === updatedHero.id ? updatedHero : hero
    );

    setTeamHeroes(updatedTeamHeroes); // Uppdatera teamHeroes state

    // Spara uppdaterade hjältar i localStorage
    saveTeamHeroesToLocalStorage(updatedTeamHeroes);

    // Om hjälten är användarskapad, uppdatera även customHeroes
    if (updatedHero.isCustom) {
      const updatedCustomHeroes = customHeroes.map((hero) =>
        hero.id === updatedHero.id ? updatedHero : hero
      );

      setCustomHeroes(updatedCustomHeroes); // Uppdatera customHeroes state
      saveCustomHeroesToLocalStorage(updatedCustomHeroes); // Spara skapade hjältar i localStorage
    }
  };

  return (
    <HeroContext.Provider
      value={{
        heroes,
        loading,
        teamHeroes,
        customHeroes,
        addHeroToTeam,
        removeHeroFromTeam,
        updateHero,
      }}
    >
      {children}
    </HeroContext.Provider>
  );
};

// Custom hook för att använda Context i komponenterna. När den används i en komponent kan vi direkt få tillgång till datan från HeroContext. Om context är undefined (om komponenten inte är omgiven av en HeroProvider), kastas ett fel
export const useHeroes = () => {
  const context = useContext(HeroContext);
  if (!context) {
    throw new Error("useHeroes must be used within a HeroProvider");
  }
  return context;
};
