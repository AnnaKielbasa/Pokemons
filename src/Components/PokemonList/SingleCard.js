import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ModifiedPokemonsContext from "../../ModifiedPokemonsContext";
import { useContext } from "react";
import { useEffect } from "react";

const SingleCard = ({ data }) => {
  const { id, height, weight, abilities, base_experience, name } = data;
  const navigate = useNavigate();
  const navigateToPokeinfo = (data) => {
    navigate("/pokeinfo", { state: data });
  };
  const { modifiedPokemons } = useContext(ModifiedPokemonsContext);

  // useEffect(() => {
  //   if (modifiedPokemons?.filter((item) => item.name === data.name)) {
  //     const base_experience = modifiedPokemons.map(
  //       (item) => item.base_experience

  //     );

  //   }
  // }, []);

  return (
    <S.SigleCard onClick={() => navigateToPokeinfo(data)}>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
        alt=""
      />
      <h2>{name.slice(0, 1).toUpperCase() + name.slice(1)}</h2>
      <S.AllInfoContainer>
        <S.InfoContainer>
          <span>{height} </span>
          <h3>Height</h3>
        </S.InfoContainer>
        <S.InfoContainer>
          <span>{weight} </span>
          <h3>Weight</h3>
        </S.InfoContainer>
        <S.InfoContainer>
          <span>{base_experience} </span>
          <h3> Base experience</h3>
        </S.InfoContainer>
        <S.InfoContainer>
          <span>{abilities.map((data) => `${data.ability.name}, `)}</span>
          <h3>Abilities</h3>
        </S.InfoContainer>
      </S.AllInfoContainer>
    </S.SigleCard>
  );
};

export default SingleCard;

const S = {
  SigleCard: styled.div`
    max-width: 400px;
    max-height: 800px;
    background-color: #ffef96;
    border-radius: 1rem;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
    flex-basis: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    font-size: 0.75rem;
    padding: 40px;
    text-align: center;
    > img {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
      max-height: 200px;
    }
    > h2 {
      color: #50394c;
    }
    &:hover {
      scale: 1.025;
    }
  `,

  AllInfoContainer: styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 3fr));
    grid-gap: 1rem;
  `,
  InfoContainer: styled.div`
    display: flex;
    flex-direction: column;
    > span {
      color: #50394c;
    }
  `,
};
