import { useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import styled from "styled-components";
const S = {
  Box: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    > OutlinedInput {
      background-color: #ffef96;
    }
  `,
  OutlinedInput: styled(OutlinedInput)`
    background-color: #ffef96;
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
          <S.OutlinedInput
            value={searchValue}
            onChange={(event) =>
              setSearchValue(event.target.value.toLowerCase())
            }
            placeholder="Search..."
          />
        </FormControl>
      </S.Box>
    </>
  );
};

export default Search;
