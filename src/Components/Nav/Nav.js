import { Link, Outlet } from "react-router-dom";
import LoginContext from "../../Context/LoginContext";
import { useContext } from "react";
import styled from "styled-components";

const Nav = ({ themeToggler }) => {
  const { isLoggedIn } = useContext(LoginContext);

  return (
    <div>
      <S.Nav>
        <S.Logo>
          <Link to="/">Pokedex</Link>
          <S.Button onClick={themeToggler}>Switch theme</S.Button>
        </S.Logo>
        <S.Container>
          <Link to="/favs">Ulubione</Link>
          <Link to="/arena">Arena</Link>
          <Link to="/login">Logowanie</Link>
          <Link to="/register">Rejestracja</Link>
        </S.Container>
        {isLoggedIn ? (
          <S.Container>
            <Link to="/edit">Edit</Link>
            <Link to="/logout">Logout</Link>
          </S.Container>
        ) : null}
      </S.Nav>
      <section>
        <Outlet />
      </section>
    </div>
  );
};

export default Nav;

const S = {
  Nav: styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1rem 0;
    padding: 1rem 2rem;
    background-color: ${({ theme }) => theme.backgroundDark};
    font-size: 1.25rem;
  `,
  Logo: styled.div`
  display:flex;
  justify-content:center:
  align-atems:center;
  gap:1rem;
       > a {
      text-decoration: none;
      color: ${({ theme }) => theme.textLight};
      &:hover {
        background-color: ${({ theme }) => theme.hover};
      }
  `,
  Button: styled.button`
    font-size: 1.25rem;
    border-radius: 0.8rem;
    background: ${({ theme }) => theme.background};
    border: 2px solid ${({ theme }) => theme.toggleBorder};
    color: ${({ theme }) => theme.text};
    cursor: pointer;
  `,
  Container: styled.div`
    display: flex;
    gap: 1rem;
    > a {
      text-decoration: none;
      color: ${({ theme }) => theme.textLight};

      &:hover {
        background-color: ${({ theme }) => theme.hover};
      }
    }
  `,
};
