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
const Search = () => {
  const searchPokemon = (event) => {};
  return (
    <>
      <S.Box>
        <FormControl>
          <OutlinedInput
            onChange={(event) => searchPokemon(event)}
            placeholder="Please enter text"
          />
        </FormControl>
      </S.Box>
    </>
  );
};

export default Search;
