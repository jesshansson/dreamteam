const HeroContext = createContext<HeroContextData | undefined>(undefined);
Här skapar vi HeroContext med hjälp av createContext-funktionen från React. HeroContext är själva "behållaren" för data och funktioner som vi vill dela med våra komponenter. Vi använder en undefined som default-värde för att hantera situationer där context kanske inte är korrekt satt upp.


Uppdatera alla listor:
  //Funktion för att uppdatera hjälte
  const updateHero = (updatedHero: IHero) => {
    // Uppdatera alla hjältar från API:et
    setHeroes((prevHeroes) =>
      prevHeroes.map((hero) => (hero.id === updatedHero.id ? updatedHero : hero))
    );

    // Om hjälten är skapad av användaren, uppdatera även customHeroes
    if (updatedHero.isCustom) {
      setCustomHeroes((prevCustomHeroes) =>
        prevCustomHeroes.map((hero) => (hero.id === updatedHero.id ? updatedHero : hero))
      );
    }

    // Uppdatera teamHeroes om hjälten finns där
    setTeamHeroes((prevTeamHeroes) =>
      prevTeamHeroes.map((hero) => (hero.id === updatedHero.id ? updatedHero : hero))
    );
  };