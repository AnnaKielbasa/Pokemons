import axios from "axios";
import { userSchema } from "../../Validations/UserValidation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { v1 } from "uuid";
import { useSnackbar } from "notistack";
import { Button } from "@mui/material";
import styled from "styled-components";

const Register = () => {
  const API_URL = "http://localhost:3500/users";
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (values, actions) => {
    const response = await axios
      .post(API_URL, {
        id: v1(),
        name: values.name,
        email: values.email,
        password: values.password,
        confirmedPassword: values.confirmedPassword,
      })
      .catch((err) => {
        console.log(err);
      });
    if (response && response.data) {
      enqueueSnackbar("Zostałaś/eś zarejestrowana/y");
    }

    actions.resetForm({
      values: { name: "", email: "", password: "", confirmedPassword: "" },
    });
  };
  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmedPassword: "",
        }}
        validationSchema={userSchema}
        onSubmit={handleSubmit}
        onKeyPress={(e) => {
          e.which === 13 && e.preventDefault();
        }}
      >
        <S.Form>
          <S.Field type="text" name="name" placeholder="Imię..." />
          <ErrorMessage name="name" />
          <S.Field type="email" name="email" placeholder="Email..." />
          <ErrorMessage name="email" />
          <S.Field type="password" name="password" placeholder="Hasło..." />
          <ErrorMessage name="password" />
          <S.Field
            type="password"
            name="confirmedPassword"
            placeholder="Powtórz hasło..."
          />
          <ErrorMessage name="confirmedPassword" />
          <S.Button type="submit">Zarejestruj się</S.Button>
        </S.Form>
      </Formik>

      <Button>
        <Link to="/login">Masz już konto? Zaloguj się tutaj</Link>
      </Button>
    </div>
  );
};

export default Register;

const S = {
  Form: styled(Form)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  `,
  Field: styled(Field)`
    max-width: 300px;
    font-size: 1.5rem;
  `,
  Button: styled(Button)`
    max-width: 300px;
  `,
};
