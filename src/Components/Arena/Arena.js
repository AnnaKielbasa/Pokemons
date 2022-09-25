import ArenaCard from "./ArenaCard";
import { Link } from "react-router-dom";
import { useContext } from "react";
import ModifiedPokemonsContext from "../../Context/ModifiedPokemonsContext";
import ArenaContext from "../../Context/ArenaContext";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { Button } from "@mui/material";
import styled from "styled-components";

const Arena = () => {
  const { arena, removePokemonFromArena, setArena } = useContext(ArenaContext);
  const {
    modifiedPokemons,
    addNewWinnerToStats,
    addNewLoserToStats,
    addWinnerToStats,
    addLoserToStats,
  } = useContext(ModifiedPokemonsContext);
  const { enqueueSnackbar } = useSnackbar();

  const [isFigthOver, setIsFigthOver] = useState(false);
  const [loser, setLoser] = useState([]);

  const handleDeletePokemon = (pokemon) => {
    removePokemonFromArena(pokemon);
  };
  const handleDeleteAllPokemons = () => {
    setArena([]);
  };

  const handleFight = () => {
    const checkStrength = arena.map(
      (pokemon) => pokemon.weight * pokemon.base_experience
    );

    checkStrength[0] === checkStrength[1] &&
      enqueueSnackbar("Jest remis, spróbuj dodać inne pokemony do areny");

    const winner = checkStrength[0] > checkStrength[1] ? arena[0] : arena[1];

    const loser = checkStrength[0] < checkStrength[1] ? arena[0] : arena[1];
    setLoser(loser);

    const checkIfWinnerInStats = modifiedPokemons?.some(
      (item) => item.name === winner?.name
    );

    const checkIfLoserInStats = modifiedPokemons?.some(
      (item) => item.name === loser?.name
    );

    enqueueSnackbar(`${winner.name} wygrał walkę`);
    enqueueSnackbar(`${loser.name} przegrał walkę`);
    setIsFigthOver(true);

    checkIfWinnerInStats
      ? addWinnerToStats(winner)
      : addNewWinnerToStats(winner);

    checkIfLoserInStats ? addLoserToStats(loser) : addNewLoserToStats(loser);
  };

  return (
    <>
      <S.Header>Arena</S.Header>
      <S.Container>
        <S.PlaceholderContainer>
          <S.PokemonPlaceholder>
            {arena[0] ? (
              <ArenaCard
                handleDeletePokemon={handleDeletePokemon}
                pokemon={arena[0]}
                loser={loser}
              />
            ) : (
              <span>Miejsce na Pokemona</span>
            )}
          </S.PokemonPlaceholder>
          <S.PokemonPlaceholder>
            {arena[1] ? (
              <ArenaCard
                handleDeletePokemon={handleDeletePokemon}
                pokemon={arena[1]}
                loser={loser}
              />
            ) : (
              <span>Miejsce na Pokemona</span>
            )}
          </S.PokemonPlaceholder>
        </S.PlaceholderContainer>
      </S.Container>
      <S.ButtonContainer>
        <S.Button
          onClick={() => handleFight()}
          disabled={arena.length !== 2 || isFigthOver}
        >
          Walcz!
        </S.Button>
      </S.ButtonContainer>
      <S.ButtonContainer>
        {isFigthOver ? (
          <S.Button onClick={() => handleDeleteAllPokemons()}>
            <Link to="/">Opuść arenę</Link>
          </S.Button>
        ) : (
          <S.Button>
            <Link to="/">Powrót do strony głównej</Link>
          </S.Button>
        )}
      </S.ButtonContainer>
    </>
  );
};

export default Arena;

const S = {
  Header: styled.div`
    text-align: center;
    font-size: 2rem;
  `,
  Container: styled.div`
    width: 90%;
    margin: auto;
    padding-top: 20px;
  `,
  PlaceholderContainer: styled.div`
    display: flex;
    gap: 4rem;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  `,
  PokemonPlaceholder: styled.div`
    background-color: ${({ theme }) => theme.background};
    min-height: 60vh;
    min-width: 30vw;
    height: 500px;
    width: 400px;
    text-align: center;
    border-radius: 1rem;
    > img {
      max-height: 200px;
    }
  `,
  ButtonContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Button: styled(Button)`
    && {
      font-size: 2rem;
      color: ${({ theme }) => theme.text};
    }
    && > a {
      color: ${({ theme }) => theme.text};
      font-size: 1rem;
    }
  `,
};
