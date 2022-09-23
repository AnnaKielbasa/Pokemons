import SingleCard from "./SingleCard";
import useFetchSingle from "../../FetchData/useFetchSingle";

const SinglePokemon = ({ name, url }) => {
  const { isError, error, isLoading, data } = useFetchSingle({ name, url });

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
