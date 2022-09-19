import * as yup from "yup";
const passwordRules = /^(?=.*\d)(?=.*\W)(?=.*[A-Z]).{8,}$/;
export const userSchema = yup.object().shape({
  name: yup.string().required("Required"),
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    .min(8)
    .matches(passwordRules, {
      message:
        "Hasło musi zawierać jedną dużą literę, jeden znak specjalny ,jedną cyfrę i mieć minimum 8 znaków",
    })
    .required("Required"),
  confirmedPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Hasła muszą być takie same")
    .required("Required"),
});
