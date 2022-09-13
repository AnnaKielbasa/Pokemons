import { useEffect } from "react";
import { createContext, useState } from "react";

export const FavContext = createContext();

export const FavProvider = ({ children }) => {
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    const pokeFavourites = JSON.parse(localStorage.getItem("favs"));

    if (pokeFavourites) {
      setFavs(pokeFavourites);
    }
  }, []);

  const addFavouritePokemon = (pokemon) => {
    const newFavouriteList = [...favs, pokemon];
    setFavs(newFavouriteList);
    localStorage.setItem("favs", JSON.stringify(newFavouriteList));
  };

  const removeFavouritePokemon = (pokemon) => {
    const newFavouriteList = favs.filter(
      (favourite) => favourite.id !== pokemon.id
    );
    setFavs(newFavouriteList);
    localStorage.setItem("favs", JSON.stringify(newFavouriteList));
  };
  return (
    <FavContext.Provider
      value={{
        favs,
        addFavouritePokemon,
        removeFavouritePokemon,
      }}
    >
      {children}
    </FavContext.Provider>
  );
};

export default FavContext;
