import { Field, Form, Formik } from "formik";
import { nameRegex, passwordRegex } from "../../utils/regex";
import NavLink from "../ui/NavLink";
import TextField from "../ui/formik/TextField";
import PasswordField from "../ui/formik/PasswordField";
import Button from "../ui/Button";
import useFormState from "../hooks/useFormState";
import SelectField from "../ui/formik/SelectField";
import { router } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useEffect } from "react";

const SignUpForm = () => {
  const { t } = useTranslation();
  const [formState, setFormState] = useFormState();
  const onFormSubmitHandler = async (values, { setErrors }) => {
    router.visit("/sign-up", {
      method: "post",
      preserveState: true,
      data: {
        name: `${values.firstName} ${values.lastName}`,
        email: values.email,
        password: values.password,
        password_confirmation: values.password_confirmation,
        gender: values.gender,
      },
      onBefore: () => {
        setFormState({ ...formState, loading: true });
      },
      onError: (errors) => {
        values.password = "";
        values.password_confirmation = "";
        setErrors(errors);
      },
      onFinish: () => {
        setFormState({ ...formState, loading: false });
      },
    });
  };

  useEffect(() => {
    console.log(1);
  }, [t]);

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        password_confirmation: "",
        gender: t("forms.signUp.gender.options", {
          returnObjects: true,
        })[0],
      }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string()
          .matches(nameRegex, t("forms.errors.invalidField"))
          .max(20, t("forms.errors.maxSymbolsExceeded"))
          .required(t("forms.errors.fieldRequired")),
        lastName: Yup.string()
          .matches(nameRegex, t("forms.errors.invalidField"))
          .max(20, t("forms.errors.maxSymbolsExceeded"))
          .required(t("forms.errors.fieldRequired")),
        email: Yup.string()
          .email(t("forms.errors.invalidField"))
          .max(60, t("forms.errors.maxSymbolsExceeded"))
          .required(t("forms.errors.fieldRequired")),
        password: Yup.string()
          .matches(passwordRegex, t("forms.errors.password"))
          .max(32, t("forms.errors.maxSymbolsExceeded"))
          .required(t("forms.errors.fieldRequired")),
        password_confirmation: Yup.string()
          .oneOf(
            [Yup.ref("password"), null],
            t("forms.errors.password_confirmation")
          )
          .max(32, t("forms.errors.maxSymbolsExceeded"))
          .required(t("forms.errors.fieldRequired")),
        gender: Yup.string()
          .oneOf(
            t("forms.signUp.gender.options", {
              returnObjects: true,
            }),
            t("forms.errors.fieldRequired")
          )
          .required(t("forms.errors.fieldRequired")),
      })}
      onSubmit={onFormSubmitHandler}
    >
      <Form>
        <Field
          id="gender"
          name="gender"
          label={t("forms.signUp.gender.title")}
          options={t("forms.signUp.gender.options", {
            returnObjects: true,
          })}
          disabled={formState.loading}
          component={SelectField}
          fullWidth
        />

        <div className="md:flex gap-4 items-center justify-between">
          <Field
            id="firstName"
            name="firstName"
            label={t("forms.signUp.firstName")}
            placeholder="e.g. Daniel"
            disabled={formState.loading}
            maxLength={60}
            component={TextField}
            fullWidth
          />
          <Field
            id="lastName"
            name="lastName"
            label={t("forms.signUp.lastName")}
            placeholder="e.g. Dimitrov"
            disabled={formState.loading}
            maxLength={60}
            component={TextField}
            fullWidth
          />
        </div>

        <Field
          id="email"
          name="email"
          type="email"
          label={t("forms.signUp.email")}
          placeholder="name@address.com"
          disabled={formState.loading}
          maxLength={60}
          component={TextField}
          fullWidth
        />

        <Field
          id="password"
          name="password"
          type="password"
          label={t("forms.signUp.password")}
          placeholder="••••••••••"
          disabled={formState.loading}
          maxLength={32}
          component={PasswordField}
          fullWidth
        />

        <Field
          id="password_confirmation"
          name="password_confirmation"
          type="password"
          label={t("forms.signUp.password_confirmation")}
          placeholder="••••••••••"
          disabled={formState.loading}
          maxLength={32}
          component={PasswordField}
          fullWidth
        />

        <div className="w-full flex items-center mt-1 gap-2 text-sm text-slate-500">
          <span>{t("forms.signUp.accMsg.text")}</span>
          {!formState.loading ? (
            <NavLink
              href="/sign-in"
              className="font-semibold text-slate-500"
              size="sm"
              title={t("forms.signUp.accMsg.link")}
              hoverEffect={false}
            >
              {t("forms.signUp.accMsg.link")}
            </NavLink>
          ) : (
            <span className="font-semibold cursor-wait text-sm">
              {t("forms.signUp.accMsg.link")}
            </span>
          )}
        </div>

        <Button
          type="submit"
          className={"flex justify-center mt-8"}
          disabled={formState.loading}
          loading={formState.loading}
          title={t("forms.signUp.submitBtn")}
          fullWidth
        >
          {t("forms.signUp.submitBtn")}
        </Button>
      </Form>
    </Formik>
  );
};

export default SignUpForm;
