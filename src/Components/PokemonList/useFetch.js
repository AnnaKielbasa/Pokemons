import axios from "axios";
import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    const res = await axios.get(url);
    getPokemon(res.data.results);
    setLoading(false);
  };
  const getPokemon = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);
      setPokeData((state) => {
        state = [...state, result.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    });
  };
  useEffect(() => {
    getData();
  }, [url]);
  return { pokeData, loading };
};

export default useFetch;
