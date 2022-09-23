import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useFetchSingle = ({ name, url }) => {
  const getSinglePokemon = async (url) => {
    const { data } = await axios.get(url);
    return data;
  };
  const { data, isLoading, isError, error } = useQuery(
    [`pokemon${name}`],
    () => getSinglePokemon(url),
    {
      keepPreviousData: true,
    }
  );

  return { isError, error, isLoading, data };
};

export default useFetchSingle;
