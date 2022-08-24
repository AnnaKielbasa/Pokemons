import { Link, Outlet } from "react-router-dom";

// import { Box } from "@mui/material";
import styled from "styled-components";

// import { css } from "styled-components";
const S = {
  Nav: styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1rem 0;
    padding: 1rem 2rem;
    background-color: #ffef96;
  `,
  Logo: styled.div`
    color: red;
  `,
  RightContainer: styled.div`
    display: flex;
    gap: 1rem;
  `,
  HidenContainer: styled.div`
    display: flex;
    gap: 1rem;
  `,
};
const Nav = () => {
  return (
    <div>
      <S.Nav>
        <S.Logo>Pokedex</S.Logo>
        <S.RightContainer>
          <Link to="/favs">Ulubione</Link>
          <Link to="/arena">Arena</Link>
          <Link to="/login">Logowanie</Link>
          <Link to="/register">Rejestracja</Link>
        </S.RightContainer>
        <S.HidenContainer>
          <Link to="/edit">Edit</Link>
          <Link to="/">Logout</Link>
        </S.HidenContainer>
      </S.Nav>
      <section>
        <Outlet />
      </section>
    </div>
  );
};

export default Nav;
