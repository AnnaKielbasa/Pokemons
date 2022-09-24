import SingleCard from "./SingleCard";
import useFetchSingle from "../../FetchData/useFetchSingle";
import ModifiedPokemonsContext from "../../Context/ModifiedPokemonsContext";
import { useContext } from "react";

const SinglePokemon = ({ name, url }) => {
  const { isError, error, isLoading, data } = useFetchSingle({ name, url });
  const { modifiedPokemons } = useContext(ModifiedPokemonsContext);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const findModifiedPokemons = modifiedPokemons?.find(
    (item) => item.name === data.name
  );

  const updatedData =
    findModifiedPokemons?.name !== undefined ? findModifiedPokemons : data;

  return (
    <>
      <SingleCard key={updatedData.name} data={updatedData} />
    </>
  );
};
export default SinglePokemon;
