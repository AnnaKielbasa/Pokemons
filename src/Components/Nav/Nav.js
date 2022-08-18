import { Link, Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import styled from "styled-components";

// import { css } from "styled-components";
const S = {
  Pokedex: styled.div`
    width: 100px;
    height: 20px;
    background-color: red;
  `,
};
const Nav = () => {
  return (
    <div>
      <nav>
        <S.Pokedex>Pokedex</S.Pokedex>
        <div>
          <Link to="/favs">Ulubione</Link>
          <Link to="/arena">Arena</Link>
          <Link to="/login">Logowanie</Link>
          <Link to="/register">Rejestracja</Link>
        </div>
        <div>
          <Link to="/edit">Edit</Link>
          <Link to="/">Logout</Link>
        </div>
      </nav>
      <section>
        <Outlet />
      </section>
    </div>
  );
};

export default Nav;
