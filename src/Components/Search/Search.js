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
  pokemons,
  searchValue,
  setSearchValue,
  setFilteredPokemons,
  setPage,
}) => {
  useEffect(() => {
    const filteredPokemonData = pokemons.filter((item) =>
      item.name.toLowerCase().includes(searchValue)
    );

    setFilteredPokemons(filteredPokemonData);
    setPage(0);
  }, [searchValue, pokemons, setFilteredPokemons]);

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
