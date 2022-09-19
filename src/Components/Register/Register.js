import { userSchema } from "../../Validations/UserValidation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { v1 } from "uuid";

const Register = () => {
  const API_URL = "http://localhost:3500/users";

  const handleSubmit = async (values, actions) => {
    try {
      const response = await axios.post(API_URL, {
        id: v1(),
        name: values.name,
        email: values.email,
        password: values.password,
        confirmedPassword: values.confirmedPassword,
      });
      const data = await response.data;
      console.log(data);
    } catch (error) {
      console.log(error);
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
      >
        <Form>
          <Field type="text" name="name" placeholder="Imię..." />
          <ErrorMessage name="name" />
          <Field type="email" name="email" placeholder="Email..." />
          <ErrorMessage name="email" />
          <Field type="password" name="password" placeholder="Hasło..." />
          <ErrorMessage name="password" />
          <Field
            type="password"
            name="confirmedPassword"
            placeholder="Powtórz hasło..."
          />
          <ErrorMessage name="repeatedPassword" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>

      <Button>
        <Link to="/login">Masz już konto? Zaloguj się tutaj</Link>
      </Button>
    </div>
  );
};

export default Register;
