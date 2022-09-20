import * as yup from "yup";

export const validationSchema = yup.object().shape({
  userName: yup
    .string()
    .required("username require")
    .matches(/^[aA1-zZ9]+$/, "only numbers and letters"),
  password: yup
    .string()
    .required("password require")
    .matches(/^[aA1-zZ9]+$/, "only numbers and letters")
    .min(6, "password should be of minimum 6 characters"),
  email: yup.string().email("invaild email").required("email require"),
});
