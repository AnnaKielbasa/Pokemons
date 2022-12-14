import { useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import styled from "styled-components";

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
  }, [searchValue, pokemons, setFilteredPokemons, setPage]);

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

const S = {
  Box: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  OutlinedInput: styled(OutlinedInput)`
    background-color: ${({ theme }) => theme.background};
  `,
};
