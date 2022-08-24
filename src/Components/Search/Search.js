// import { useState } from "react";
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
const Search = ({ pokemonData, loading }) => {
  const [pokemonSearch, setPokemonSearch] = useState("");
  const searchPokemon = (event) => {
    // console.log(event.target.value);
    const test1 = pokemonData.filter((item) =>
      item.name.toLowerCase().includes(pokemonSearch)
    );
    console.log(test1);
    //  console.log( pokemonData.name.toLowerCase().includes(event.target.value.toLowerCase()))
    // test1.includes(event.target.value.toLowerCase())
  };
  return (
    <>
      <S.Box>
        <FormControl>
          <OutlinedInput
            onChange={(event) =>
              setPokemonSearch(event.target.value.toLowerCase())
            }
            placeholder="Please enter text"
          />
        </FormControl>
      </S.Box>
    </>
  );
};

export default Search;
