import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import LoginContext from "../../Context/LoginContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { Button } from "@mui/material";
import styled from "styled-components";

const API_URL = "http://localhost:3500/users";
const getUsers = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};
const Login = () => {
  const { isLoggedIn, loginUser } = useContext(LoginContext);
  const { data } = useQuery(["users"], getUsers);
  const { enqueueSnackbar } = useSnackbar();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  const handleLogin = (values, actions) => {
    users?.some(
      (item) => item.email === values.email && item.password === values.password
    )
      ? handleSuccessfulLogin(actions, values)
      : handleUnsuccessfulLogin();
  };
  const handleSuccessfulLogin = (values) => {
    const newUserData = [{ email: values?.email, password: values?.password }];
    enqueueSnackbar("Jesteś zalogowana/y");
    loginUser(newUserData);
  };
  const handleUnsuccessfulLogin = () => {
    enqueueSnackbar("Nie udało się zalogować");
  };

  return (
    <div>
      {isLoggedIn ? (
        <S.Button>
          <Link to="/edit">
            Jesteś zalogowana/y.Możesz przejść do edycji pokemonów
          </Link>
        </S.Button>
      ) : (
        <S.Container>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={handleLogin}
            onKeyPress={(e) => {
              e.which === 13 && e.preventDefault();
            }}
          >
            <S.Form>
              <S.Field
                type="email"
                name="email"
                placeholder="Email..."
                autoComplete="on"
              />
              <ErrorMessage name="email" />
              <S.Field
                type="password"
                name="password"
                placeholder="Hasło..."
                autoComplete="on"
              />
              <ErrorMessage name="password" />
              <S.Button type="submit">Login</S.Button>
            </S.Form>
          </Formik>

          <S.ButtonContainer>
            <S.Button>
              <Link to="/register">Nie masz konta? Zarejestruj się tutaj</Link>
            </S.Button>
          </S.ButtonContainer>
        </S.Container>
      )}
    </div>
  );
};

export default Login;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: ${({ theme }) => theme.text};
    max-width: 25vw;
    margin: 1rem auto;
    padding: 1rem;
    border-radius: 0.5rem;
  `,

  Form: styled(Form)`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-size: 1rem;
  `,
  Field: styled(Field)`
    &&& {
      font-size: 1.5rem;
      border-radius: 0.5rem;
    }
  `,
  Button: styled(Button)`
    && {
      font-size: 1rem;
      color: ${({ theme }) => theme.text};
      background-color: ${({ theme }) => theme.background};
    }
    && > a {
      color: ${({ theme }) => theme.text};
      font-size: 1rem;
      background-color: ${({ theme }) => theme.background};
    }
  `,
  ButtonContainer: styled.div`
    display: flex;
    justify-content: center;
  `,
};
