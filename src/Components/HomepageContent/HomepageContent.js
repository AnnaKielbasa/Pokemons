import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Pagination from "../PokemonList/Pagination";
import SingleCard from "../PokemonList/SingleCard";
import Search from "../Search/Search";

const S = {
  Container: styled.div`
    width: 90%;
    margin: auto;
    padding-top: 20px;
    display: flex;
  `,
  Cards: styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 0.5fr));
    grid-gap: 2rem;
    flex-basis: 100%;
  `,
};
const HomepageContent = () => {
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon/?limit=151&offset=0"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get(currentPageUrl).then((res) => {
      setNextPageUrl(res.data.next);
      setPrevPageUrl(res.data.previous);
      getPokemonData(res.data.results);
      setLoading(false);
    });
  }, [currentPageUrl]);
  const getPokemonData = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);
      setPokemonData((state) => {
        state = [...state, result.data];
        return state;
      });
    });
  };
  function gotoNextPage() {
    setPokemonData([]);
    setCurrentPageUrl(nextPageUrl);
  }

  function gotoPrevPage() {
    setPokemonData([]);
    setCurrentPageUrl(prevPageUrl);
  }

  const pokemonsToDisplay =
    searchValue.length === 0 ? pokemonData : filteredPokemons;

  return (
    <>
      <Search
        pokemonData={pokemonData}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setFilteredPokemons={setFilteredPokemons}
      />
      <S.Container>
        <S.Cards>
          <SingleCard pokemonData={pokemonsToDisplay} loading={loading} />
        </S.Cards>
      </S.Container>
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
    </>
  );
};

export default HomepageContent;
