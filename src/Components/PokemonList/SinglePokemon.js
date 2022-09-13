import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SingleCard from "./SingleCard";

const SinglePokemon = ({ name, url }) => {
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

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <SingleCard key={data.name} data={data} />
    </>
  );
};
export default SinglePokemon;
