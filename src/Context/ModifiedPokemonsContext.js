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
      height: winner?.height,
      weight: winner?.weight,
      abilities: winner?.abilities,
      fightsWon: 1,
      fightsLost: 0,
    };

    const response = await axios.post(API_URL, winnerNew).catch((err) => {
      console.log(err);
    });
    if (response && response.data) {
      setModifiedPokemons([...modifiedPokemons, winnerNew]);
    }
  };
  const addWinnerToStats = async (winner) => {
    const findId = modifiedPokemons?.filter((item) => item.id === winner?.id);

    const winnerExisting = {
      id: winner?.id,
      name: winner?.name,
      base_experience: 10 + findId[0].base_experience,
      height: winner?.height,
      weight: winner?.weight,
      abilities: winner?.abilities,
      fightsWon: ++findId[0].fightsWon,
      fightsLost: findId[0].fightsLost,
    };
    const response = await axios
      .put(`http://localhost:3500/pokemonstats/${winner.id}`, winnerExisting)
      .catch((err) => {
        console.log(err);
      });
    if (response && response.data)
      setModifiedPokemons([...modifiedPokemons, winnerExisting]);
  };
  const addNewLoserToStats = async (loser) => {
    const loserNew = {
      id: loser?.id,
      name: loser?.name,
      base_experience: loser?.base_experience,
      height: loser?.height,
      weight: loser?.weight,
      abilities: loser?.abilities,
      fightsWon: 0,
      fightsLost: 1,
    };

    const response = await axios.post(API_URL, loserNew).catch((err) => {
      console.log(err);
    });
    if (response && response.data)
      setModifiedPokemons([...modifiedPokemons, loserNew]);
  };
  const addLoserToStats = async (loser) => {
    const findId = modifiedPokemons?.filter((item) => item.id === loser?.id);

    const loserExisting = {
      id: loser?.id,
      name: loser?.name,
      base_experience: loser?.base_experience,
      height: loser?.height,
      weight: loser?.weight,
      abilities: loser?.abilities,
      fightsWon: findId[0].fightsWon,
      fightsLost: ++findId[0].fightsLost,
    };

    const response = await axios
      .put(`http://localhost:3500/pokemonstats/${loser.id}`, loserExisting)
      .catch((err) => {
        console.log(err);
      });
    if (response && response.data)
      setModifiedPokemons([...modifiedPokemons, loserExisting]);
  };

  return (
    <ModifiedPokemonsContext.Provider
      value={{
        modifiedPokemons,
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
