import { createContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const NewPokemonsContext = createContext();

const API_URL = "http://localhost:3500/newpokemons";
const getNewPokemons = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

export const NewPokemonsContextProvider = ({ children }) => {
  const [newPokemons, setNewPokemons] = useState([]);
  const { data } = useQuery(["newpokemons"], getNewPokemons);

  useEffect(() => {
    if (data) {
      setNewPokemons(data);
    }
  }, [data]);

  return (
    <NewPokemonsContext.Provider
      value={{
        newPokemons,
        setNewPokemons,
      }}
    >
      {children}
    </NewPokemonsContext.Provider>
  );
};

export default NewPokemonsContext;
