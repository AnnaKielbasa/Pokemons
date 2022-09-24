import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getAllPokemons = async () => {
  const { data } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/?limit=151`
  );
  return data;
};

const useFetchAll = () => {
  const { isError, error, isLoading, data } = useQuery(
    ["pokemons"],
    getAllPokemons,
    {
      keepPreviousData: true,
      staleTime: Infinity,
    }
  );

  return { isError, error, isLoading, data };
};

export default useFetchAll;
