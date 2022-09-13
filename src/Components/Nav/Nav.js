import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

const S = {
  Nav: styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1rem 0;
    padding: 1rem 2rem;
    background-color: #50394c;
  `,
  Logo: styled.div`
    color: #ffef96;
  `,
  Container: styled.div`
    display: flex;
    gap: 1rem;
    > a {
      text-decoration: none;
      color: #ffef96;

      &:hover {
        background-color: #b2b2b2;
      }
    }
  `,
};
const Nav = () => {
  return (
    <div>
      <S.Nav>
        <S.Logo>Pokedex</S.Logo>
        <S.Container>
          <Link to="/favs">Ulubione</Link>
          <Link to="/arena">Arena</Link>
          <Link to="/login">Logowanie</Link>
          <Link to="/register">Rejestracja</Link>
        </S.Container>
        <S.Container>
          <Link to="/edit">Edit</Link>
          <Link to="/">Logout</Link>
        </S.Container>
      </S.Nav>
      <section>
        <Outlet />
      </section>
    </div>
  );
};

export default Nav;
