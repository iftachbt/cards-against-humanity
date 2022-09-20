import * as yup from "yup";

export const validationSchema = yup.object().shape({
  email: yup.string().email("invaild email").required("email require"),
  password: yup
    .string()
    .matches(/^[^!@#$%^&*()\-_=+{};:,<.>]+$/, "only numbers and letters")
    .required("password require")
    .min(6, "password should be of minimum 6 characters"),
});
