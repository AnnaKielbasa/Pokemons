import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import LoginContext from "../../Context/LoginContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { Button } from "@mui/material";

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
        <Button>
          <Link to="/edit">
            Jesteś zalogowana/y.Możesz przejść do edycji pokemonów
          </Link>
        </Button>
      ) : (
        <>
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
            <Form>
              <Field type="email" name="email" placeholder="Email..." />
              <ErrorMessage name="email" />
              <Field type="password" name="password" placeholder="Hasło..." />
              <ErrorMessage name="password" />
              <button type="submit">Login</button>
            </Form>
          </Formik>
          <Button>
            <Link to="/register">Nie masz konta? Zarejestruj się tutaj</Link>
          </Button>
        </>
      )}
    </div>
  );
};

export default Login;
