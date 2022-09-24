import { useState } from "react";
import EditForm from "./EditForm";
import useFetchAll from "../../FetchData/useFetchAll";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import styled from "styled-components";

const Edit = () => {
  const [pokemonToEdit, setPokemonToEdit] = useState();
  const { isError, error, isLoading, data } = useFetchAll();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  const { results: pokemons } = data;

  const handleChange = (value) => {
    const findPokemon = pokemons?.filter((item) => item.name === value);
    setPokemonToEdit(findPokemon);
  };

  return (
    <div>
      <S.Autocomplete
        onChange={(_, value) => handleChange(value)}
        id="autocomplete"
        options={pokemons.map((item) => item.name)}
        renderInput={(params) => (
          <TextField {...params} label="Wybierz pokemona do edycji" />
        )}
      />
      {pokemonToEdit &&
        pokemonToEdit.map((item) => (
          <EditForm key={item.name} name={item.name} url={item.url} />
        ))}
    </div>
  );
};

export default Edit;

const S = {
  Autocomplete: styled(Autocomplete)`
    width: 300px;
    margin: 0 auto;
  `,
};
