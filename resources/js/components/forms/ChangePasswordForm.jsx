import { Field, Form, Formik } from "formik";
import Button from "../ui/Button";
import PasswordField from "../ui/formik/PasswordField";
import useFormState from "../hooks/useFormState";
import { useTranslation } from "react-i18next";

const ChangePasswordForm = () => {
  const { t } = useTranslation();
  const [formState, setFormState] = useFormState();

  const onFormSubmitHandler = async (values, { setErrors }) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={{
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      }}
      onSubmit={onFormSubmitHandler}
    >
      <Form>
        <Field
          id="currentPassword"
          name="currentPassword"
          type="password"
          label={t("forms.signIn.password")}
          placeholder="••••••••••"
          disabled={formState.loading}
          maxLength={32}
          component={PasswordField}
          fullWidth
        />

        <Field
          id="newPassword"
          name="newPassword"
          type="password"
          label={t("forms.signIn.password")}
          placeholder="••••••••••"
          disabled={formState.loading}
          maxLength={32}
          component={PasswordField}
          fullWidth
        />

        <Field
          id="confirmNewPassword"
          name="confirmNewPassword"
          type="password"
          label={t("forms.signIn.password")}
          placeholder="••••••••••"
          disabled={formState.loading}
          maxLength={32}
          component={PasswordField}
          fullWidth
        />

        <Button
          type="submit"
          className={"flex justify-center mt-8"}
          disabled={formState.loading}
          loading={formState.loading}
          title={t("forms.signIn.submitBtn")}
          fullWidth
        >
          change
        </Button>
      </Form>
    </Formik>
  );
};
export default ChangePasswordForm;
