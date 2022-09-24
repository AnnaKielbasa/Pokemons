import SingleCard from "../PokemonList/SingleCard";
import { Link } from "react-router-dom";
import FavContext from "../../Context/FavContext";
import { useContext } from "react";
import styled from "styled-components";

const Favs = () => {
  const { favs } = useContext(FavContext);

  return (
    <div>
      <S.Container>
        {favs.length === 0 ? (
          <div>Nie dodano żadnego pokemona do ulubionych</div>
        ) : (
          favs?.map((pokemon) => (
            <SingleCard key={pokemon.name} data={pokemon} />
          ))
        )}
      </S.Container>
      <button>
        <Link to="/">Powrót do strony głównej</Link>
      </button>
    </div>
  );
};

export default Favs;

const S = {
  Container: styled.div`
    width: 90%;
    margin: auto;
    padding-top: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 0.5fr));
    grid-gap: 2rem;
  `,
};
