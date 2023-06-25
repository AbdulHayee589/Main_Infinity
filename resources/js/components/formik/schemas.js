import * as Yup from "yup";
import { emailRegex, nameRegex, passwordRegex } from "./regex";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid field")
    .matches(emailRegex)
    .max(60, "Maximum length of 60 symbols is exceeded")
    .required("Field is required"),
  password: Yup.string()
    .max(20, "Maximum length of 20 symbols is exceeded")
    .required("Field is required"),
});

export const registerSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(nameRegex, "Invalid field")
    .max(20, "Maximum length of 20 symbols is exceeded")
    .required("Field is required"),
  lastName: Yup.string()
    .matches(nameRegex, "Invalid field")
    .max(20, "Maximum length of 20 symbols is exceeded")
    .required("Field is required"),
  email: Yup.string()
    .email("Invalid field")
    .max(60, "Maximum length of 60 symbols is exceeded")
    .required("Field is required"),
  password: Yup.string()
    .matches(
      passwordRegex,
      "Required minimum 8 symbol, from which one must be a number and special symbol"
    )
    .max(20, "Maximum length of 20 symbols is exceeded")
    .required("Field is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Both passwords must match")
    .max(20, "Maximum length of 20 symbols is exceeded")
    .required("Field is required"),
});
