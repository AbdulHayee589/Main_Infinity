import { Field, Form, Formik } from "formik";
import NavLink from "../ui/NavLink";
import TextField from "../ui/formik/TextField";
import PasswordField from "../ui/formik/PasswordField";
import Button from "../ui/Button";
import useFormState from "../hooks/useFormState";
import { router } from "@inertiajs/react";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const SignInForm = () => {
  const { t } = useTranslation();
  const [formState, setFormState] = useFormState();

  const onFormSubmitHandler = async (values, { setErrors }) => {
    router.visit("/sign-in", {
      method: "post",
      preserveState: true,
      data: {
        email: values.email,
        password: values.password,
        remember: true,
      },
      onBefore: () => {
        setFormState({ ...formState, loading: true });
      },
      onError: (errors) => {
        console.log(errors);
        values.password = "";
        setErrors(errors);
      },
      onFinish: () => {
        setFormState({ ...formState, loading: false });
      },
    });
  };

  return (
    <Formik
      initialValues={{ email: "", password: "", remember: true }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email(t("forms.errors.invalidField"))
          .max(60, t("forms.errors.maxSymbolsExceeded"))
          .required(t("forms.errors.fieldRequired")),
        password: Yup.string()
          .max(32, t("forms.errors.maxSymbolsExceeded"))
          .required(t("forms.errors.fieldRequired")),
      })}
      onSubmit={onFormSubmitHandler}
    >
      <Form>
        <Field
          id="email"
          name="email"
          type="email"
          label={t("forms.signIn.email")}
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
          label={t("forms.signIn.password")}
          placeholder="••••••••••"
          disabled={formState.loading}
          maxLength={32}
          component={PasswordField}
          fullWidth
        />

        <div className="w-full flex items-center mt-1 gap-2 text-sm text-slate-500">
          <span>{t("forms.signIn.accMsg.text")}</span>
          {!formState.loading ? (
            <NavLink
              href="/sign-up"
              className="font-semibold text-slate-500"
              size="sm"
              title={t("forms.signIn.accMsg.link")}
              hoverEffect={false}
            >
              {t("forms.signIn.accMsg.link")}
            </NavLink>
          ) : (
            <span className="font-semibold cursor-wait text-sm">
              {t("forms.signIn.accMsg.link")}
            </span>
          )}
        </div>

        <Button
          type="submit"
          className={"flex justify-center mt-8"}
          disabled={formState.loading}
          loading={formState.loading}
          title={t("forms.signIn.submitBtn")}
          fullWidth
        >
          {t("forms.signIn.submitBtn")}
        </Button>
      </Form>
    </Formik>
  );
};

export default SignInForm;
