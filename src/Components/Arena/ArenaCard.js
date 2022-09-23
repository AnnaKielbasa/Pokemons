import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";

const ArenaCard = ({ handleDeletePokemon, pokemon, loser }) => {
  const checkifloser = loser.id === pokemon.id;

  return (
    <S.PokemonPlaceholder key={pokemon.name} checkifloser={checkifloser}>
      <S.DeleteIcon onClick={() => handleDeletePokemon(pokemon)} />
      <h2>{pokemon.name.slice(0, 1).toUpperCase() + pokemon.name.slice(1)}</h2>
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
  );
};

export default ArenaCard;

const S = {
  PokemonPlaceholder: styled.div`
    background-color: #ffef96;
    min-height: 60vh;
    min-width: 30vw;
    height: 500px;
    width: 400px;
    text-align: center;
    border-radius: 1rem;
    opacity: ${({ checkifloser }) => (checkifloser ? 0.2 : 1)};
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
