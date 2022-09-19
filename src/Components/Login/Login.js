import { useContext } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import LoginContext from "../../LoginContext";

const API_URL = "http://localhost:3500/users";
const getUsers = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};
const Login = () => {
  const { isLoggedIn, loginUser } = useContext(LoginContext);
  const { data } = useQuery(["users"], getUsers);
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = (values, actions) => {
    data.some(
      (item) => item.email === values.email && item.password === values.password
    )
      ? handleSuccessfulLogin(actions, values)
      : handleUnsuccessfulLogin();
  };
  const handleSuccessfulLogin = (actions, values) => {
    const newUserData = [{ email: values?.email, password: values?.password }];
    enqueueSnackbar("Jesteś zalogowany");
    loginUser(newUserData);
    actions.resetForm({
      values: { email: "", password: "" },
    });
  };
  const handleUnsuccessfulLogin = () => {
    enqueueSnackbar("Nie udało się zalogować");
  };

  return (
    <div>
      {isLoggedIn ? (
        <Button>
          <Link to="/edit">Przejdź do edycji pokemonów</Link>
        </Button>
      ) : (
        <>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={handleLogin}
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
