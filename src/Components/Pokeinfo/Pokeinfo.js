import { Link } from "react-router-dom";
import { Button } from "@mui/material";
const Pokeinfo = ({ pokemonData }) => {
  return (
    <>
      Pokeinfo
      <h1>{pokemonData.name}</h1>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonData.id}.svg`}
        alt=""
      />
      <div className="abilities">
        {pokemonData.abilities.map((poke) => {
          return (
            <>
              <div className="group">
                <h2>{poke.ability.name}</h2>
              </div>
            </>
          );
        })}
      </div>
      <Button>
        <Link to="/">Powrót do strony głównej</Link>
      </Button>
    </>
  );
};
export default Pokeinfo;
