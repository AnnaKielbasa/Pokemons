import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SportsMartialArtsIcon from "@mui/icons-material/SportsMartialArts";
import { useState, useEffect } from "react";

const S = {
  Header: styled.h1`
    text-align: center;
  `,
  PokeinfoContainer: styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0px 150px;
  `,
  Img: styled.div`
    max-width: 400px;
    max-height: 800px;
  `,
  AllInfoContainer: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Name: styled.h2`
    align-items: center;
    justify-content: center;
    color: #50394c;
    display: flex;
    gap: 20px;
  `,
  FavoriteIcon: styled(FavoriteIcon)`
    color: ${({ fav }) => (fav ? "#ff0000" : "#f0f0f5")};
    &:hover {
      transform: scale(1.5);
    }
  `,
  SportsMartialArtsIcon: styled(SportsMartialArtsIcon)`
    &:hover {
      transform: scale(1.5);
    }
  `,
  InfoContainer: styled.div`
    display: flex;
    justify-content: space-around;
    gap: 300px;
    align-items: center;
    text-align: center;
  `,
  Container: styled.div`
    > span {
      color: #50394c;
    }
  `,
};

const Pokeinfo = () => {
  const { state } = useLocation();
  const [fav, setFav] = useState(false);
  const [favs, setFavs] = useState([]);

  const handleSetFavs = () => {
    const newFavs = [...new Set([...favs, state])];
    localStorage.setItem("favs", JSON.stringify(newFavs));
    setFavs(newFavs);
  };
  useEffect(() => {
    const data = localStorage.getItem("favs");
    if (data) {
      setFavs(JSON.parse(data));
    }
  }, []);

  return (
    <>
      <S.Header>Pokedex</S.Header>
      <S.PokeinfoContainer>
        <S.Img>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${state.id}.svg`}
            alt="img"
          ></img>
        </S.Img>
        <S.AllInfoContainer>
          <S.Name>
            {state.name.slice(0, 1).toUpperCase() + state.name.slice(1)}
            <S.FavoriteIcon fav={+fav} onClick={() => handleSetFavs()} />
            <S.SportsMartialArtsIcon />
          </S.Name>
          <S.InfoContainer>
            <S.Container>
              <span>{state.height} </span>
              <h3>Height</h3>
              <span>{state.weight} </span>
              <h3>Weight</h3>
            </S.Container>
            <S.Container>
              <span>{state.base_experience} </span>
              <h3> Base experience</h3>
              <span>
                {state.abilities.map((state) => `${state.ability.name}, `)}
              </span>
              <h3>Abilities</h3>
            </S.Container>
          </S.InfoContainer>
        </S.AllInfoContainer>
      </S.PokeinfoContainer>
      <Button>
        <Link to="/">Powrót do strony głównej</Link>
      </Button>
    </>
  );
};
export default Pokeinfo;
