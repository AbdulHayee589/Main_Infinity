import * as Yup from "yup";

const nameRegex = /^[a-z ,.'-]+$/i;
const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
const emailRegex =
    /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)*|\[((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|IPv6:((((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){6}|::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){5}|[0-9A-Fa-f]{0,4}::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){4}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):)?(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){3}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,2}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){2}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,3}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,4}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,5}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,6}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)|(?!IPv6:)[0-9A-Za-z-]*[0-9A-Za-z]:[!-Z^-~]+)])/;

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
    password_confirmation: Yup.string()
        .oneOf([Yup.ref("password"), null], "Both passwords must match")
        .max(20, "Maximum length of 20 symbols is exceeded")
        .required("Field is required"),
    gender: Yup.string().oneOf(
        ["Male", "Female", "Other", "Decline to state"],
        "Please specify your gender"
    ),
});

export const reviewSchema = Yup.object().shape({
    message: Yup.string()
        .required("Field is required")
        .max(100, "Maximum length is exceeded"),
});
