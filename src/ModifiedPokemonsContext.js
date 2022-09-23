import { createContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const ModifiedPokemonsContext = createContext();

const API_URL = "http://localhost:3500/pokemonstats";
const getPokemonStats = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

export const ModifiedPokemonsContextProvider = ({ children }) => {
  const [modifiedPokemons, setModifiedPokemons] = useState([]);
  const { data } = useQuery(["pokemonstats"], getPokemonStats);

  useEffect(() => {
    if (data) {
      setModifiedPokemons(data);
    }
  }, [data]);

  const addNewWinnerToStats = async (winner) => {
    const winnerNew = {
      id: winner?.id,
      name: winner?.name,
      base_experience: winner?.base_experience + 10,
      fightsWon: 1,
      fightsLost: 0,
    };

    const response = await axios.post(
      "http://localhost:3500/pokemonstats/",
      winnerNew
    );
    return response.data;
  };
  const addWinnerToStats = async (winner) => {
    const findId = modifiedPokemons?.filter((item) => item.id === winner?.id);

    const winnerExisting = {
      id: winner?.id,
      name: winner?.name,
      base_experience: 10 + findId[0].base_experience,
      fightsWon: ++findId[0].fightsWon,
      fightsLost: findId[0].fightsLost,
    };
    const response = await axios.put(
      `http://localhost:3500/pokemonstats/${winner.id}`,
      winnerExisting
    );
    return response.data;
  };
  const addNewLoserToStats = async (loser) => {
    const loserNew = {
      id: loser?.id,
      name: loser?.name,
      base_experience: loser?.base_experience,
      fightsWon: 0,
      fightsLost: 1,
    };

    const response = await axios.post(
      "http://localhost:3500/pokemonstats",
      loserNew
    );
    return response.data;
  };
  const addLoserToStats = async (loser) => {
    const findId = modifiedPokemons?.filter((item) => item.id === loser?.id);
    console.log({ findId });
    const loserExisting = {
      id: loser?.id,
      name: loser?.name,
      base_experience: loser?.base_experience,
      fightsWon: findId[0].fightsWon,
      fightsLost: ++findId[0].fightsLost,
    };

    const response = await axios.put(
      `http://localhost:3500/pokemonstats/${loser.id}`,
      loserExisting
    );
    return response.data;
  };

  return (
    <ModifiedPokemonsContext.Provider
      value={{
        modifiedPokemons,
        // addModifiedPokemon,
        addNewWinnerToStats,
        addNewLoserToStats,
        addLoserToStats,
        addWinnerToStats,
      }}
    >
      {children}
    </ModifiedPokemonsContext.Provider>
  );
};

export default ModifiedPokemonsContext;
