import { Link } from "react-router-dom";
import FavContext from "../../FavContext";
import { useContext } from "react";

const Favs = () => {
  const { favs } = useContext(FavContext);

  return (
    <div>
      {favs.length > 0 ? (
        <div>{favs.length}</div>
      ) : (
        <div>Nie dodano żadnego pokemona do ulubionych</div>
      )}
      {favs?.map((item) => (
        <h2 key={item.name}>{item.name}</h2>
      ))}
      {/* <SingleCard key={favs.name} /> */}

      <button>
        <Link to="/">Powrót do strony głównej</Link>
      </button>
    </div>
  );
};

export default Favs;
