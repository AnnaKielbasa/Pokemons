import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "@mui/material";
import { useContext } from "react";
import ArenaContext from "../../ArenaContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useSnackbar } from "notistack";
import ModifiedPokemonsContext from "../../ModifiedPokemonsContext";

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
      <h1>Arena</h1>
      <S.Container>
        {arena.length === 0 ? (
          <S.PlaceholderContainer>
            <S.PokemonPlaceholder>Miejsce na Pokemona</S.PokemonPlaceholder>
            <S.PokemonPlaceholder>Miejsce na Pokemona</S.PokemonPlaceholder>
          </S.PlaceholderContainer>
        ) : (
          <S.PlaceholderContainer>
            {arena?.map((pokemon) => (
              <S.PokemonPlaceholder key={pokemon.name}>
                <S.DeleteIcon onClick={() => handleDeletePokemon(pokemon)} />
                <h2>
                  {pokemon.name.slice(0, 1).toUpperCase() +
                    pokemon.name.slice(1)}
                </h2>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                  alt="img"
                ></img>

                <S.StatsContainer>
                  <S.InfoContainer>
                    <span>{pokemon.base_experience} </span>
                    <h3> Base experience</h3>
                  </S.InfoContainer>
                  <S.InfoContainer>
                    <span>{pokemon.weight} </span>
                    <h3>Weight</h3>
                  </S.InfoContainer>
                </S.StatsContainer>
              </S.PokemonPlaceholder>
            ))}
          </S.PlaceholderContainer>
        )}
      </S.Container>
      <Button
        onClick={() => handleFight()}
        disabled={arena.length !== 2 || isFigthOver}
      >
        Walcz!
      </Button>
      {isFigthOver ? (
        <Button onClick={() => handleDeleteAllPokemons()}>
          <Link to="/">Opuść arenę</Link>
        </Button>
      ) : (
        <Button>
          <Link to="/">Powrót do strony głównej</Link>
        </Button>
      )}
    </>
  );
};

export default Arena;

const S = {
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
    background-color: #ffef96;
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
  StatsContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  `,
  InfoContainer: styled.div`
    display: flex;
    flex-direction: column;
    > span {
      color: #50394c;
    }
  `,
  DeleteIcon: styled(DeleteIcon)`
    color: #50394c;
    &:hover {
      transform: scale(1.5);
    }
  `,
};
