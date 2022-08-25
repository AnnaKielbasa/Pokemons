import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const S = {
  SigleCard: styled.div`
    max-width: 400px;
    max-height: 800px;
    background-color: #b2b2b2;
    border-radius: 1rem;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
    flex-basis: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    font-size: 0.75rem;
    > img,
    span {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    > h2 {
      text-align: center;
    }

    &:hover {
      transform: scale(1.025);
    }
  `,
  InfoContainer: styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 3fr));
    grid-gap: 1rem;
  `,
};

const SingleCard = ({ pokemonData, loading }) => {
  const navigate = useNavigate();
  const navigateToPokeinfo = () => {
    navigate("/pokeinfo");
  };
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : pokemonData.length === 0 ? (
        <h1>Nie znaleziono pokemona</h1>
      ) : (
        pokemonData.slice(0, 15).map((item) => {
          return (
            <S.SigleCard
              key={item.id}
              pokemonData={pokemonData}
              onClick={() => navigateToPokeinfo()}
            >
              <img src={item.sprites.front_default} alt="" />
              <h2>{item.name}</h2>
              <S.InfoContainer>
                <h2>{item.height} Height</h2>
                <h2>{item.weight} Weight</h2>
                <h2>{item.base_experience} Base experience </h2>
                <h2>
                  {item.abilities.map((item) => `${item.ability.name}, `)}
                  Ability
                </h2>
              </S.InfoContainer>
            </S.SigleCard>
          );
        })
      )}
    </>
  );
};
export default SingleCard;
