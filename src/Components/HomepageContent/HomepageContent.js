import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import styled from "styled-components";
import Pagination from "../PokemonList/Pagination";
import SinglePokemon from "../PokemonList/SinglePokemon";
import Search from "../Search/Search";

const S = {
  Container: styled.div`
    width: 90%;
    margin: auto;
    padding-top: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 0.5fr));
    grid-gap: 2rem;
  `,
};
const getPokemons = async () => {
  const { data } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/?limit=151`
  );
  return data;
};
const HomepageContent = () => {
  const [page, setPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  const { isError, error, isLoading, data } = useQuery(
    ["pokemons"],
    getPokemons,
    {
      keepPreviousData: true,
      staleTime: Infinity,
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const { results: pokemons } = data;

  const pokemonsToDisplay =
    searchValue.length === 0 ? pokemons : filteredPokemons;

  return (
    <>
      <Search
        pokemons={pokemons}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setFilteredPokemons={setFilteredPokemons}
        setPage={setPage}
      />
      <S.Container>
        {pokemonsToDisplay.length === 0 ? (
          <h1>Nie znaleziono pokemona</h1>
        ) : (
          pokemonsToDisplay
            .slice(page, page + 15)
            .map((pokemon) => <SinglePokemon key={pokemon.name} {...pokemon} />)
        )}
      </S.Container>
      {pokemonsToDisplay.length > 15 && (
        <Pagination page={page} setPage={setPage} />
      )}
    </>
  );
};

export default HomepageContent;
