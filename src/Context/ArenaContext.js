import { createContext, useState } from "react";
import { useEffect } from "react";

export const ArenaContext = createContext();

export const ArenaProvider = ({ children }) => {
  const [arena, setArena] = useState([]);

  useEffect(() => {
    const pokeArena = JSON.parse(localStorage.getItem("arena"));

    if (pokeArena) {
      setArena(pokeArena);
    }
  }, []);

  const addPokemonToArena = (pokemon) => {
    const newArenaList = [...arena, pokemon];
    setArena(newArenaList);
    localStorage.setItem("arena", JSON.stringify(newArenaList));
  };
  const removePokemonFromArena = (pokemon) => {
    const newArenaList = arena.filter(
      (favourite) => favourite.id !== pokemon.id
    );
    setArena(newArenaList);
    localStorage.setItem("arena", JSON.stringify(newArenaList));
  };

  return (
    <ArenaContext.Provider
      value={{
        arena,
        setArena,
        addPokemonToArena,
        removePokemonFromArena,
      }}
    >
      {children}
    </ArenaContext.Provider>
  );
};

export default ArenaContext;
