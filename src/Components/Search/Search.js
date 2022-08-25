import { useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import styled from "styled-components";
const S = {
  Box: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};
const Search = ({
  pokemonData,
  searchValue,
  setSearchValue,
  setFilteredPokemons,
}) => {
  useEffect(() => {
    const filteredPokemonData = pokemonData.filter((item) =>
      item.name.toLowerCase().includes(searchValue)
    );
    setFilteredPokemons(filteredPokemonData);
  }, [searchValue]);

  return (
    <>
      <S.Box>
        <FormControl>
          <OutlinedInput
            value={searchValue}
            onChange={(event) =>
              setSearchValue(event.target.value.toLowerCase())
            }
            placeholder="Please enter text"
          />
        </FormControl>
      </S.Box>
    </>
  );
};

export default Search;
