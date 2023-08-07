import { Field, Form, Formik } from "formik";
import { loginSchema } from "../../utils/schemas";
import NavLink from "../ui/NavLink";
import TextField from "../ui/formik/TextField";
import PasswordField from "../ui/formik/PasswordField";
import Button from "../ui/Button";
import useFormState from "../hooks/useFormState";
import { router } from "@inertiajs/react";

const SignInForm = () => {
  const { formState, setFormState } = useFormState();

  const onFormSubmitHandler = async (
    values,
    { setSubmitting, setErrors }
  ) => {
    router.visit("/auth/login", {
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
        values.password = "";
        setErrors(errors);
      },
      onFinish: () => {
        setFormState({ ...formState, loading: false });
        setSubmitting(false);
      },
    });
  };

  return (
    <Formik
      initialValues={{ email: "", password: "", remember: true }}
      validationSchema={loginSchema}
      onSubmit={onFormSubmitHandler}
    >
      <Form>
        <Field
          id="email"
          name="email"
          type="email"
          label="Email Address"
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
          label="Password"
          placeholder="••••••••••"
          disabled={formState.loading}
          maxLength={20}
          component={PasswordField}
          fullWidth
        />

        <div className="w-full flex items-center mt-1 gap-2 text-sm text-slate-400">
          <span>Dont have an account?</span>
          {!formState.loading ? (
            <NavLink
              href="/sign-up"
              className="font-semibold text-slate-500"
              size="sm"
              title="Sign Up"
              hoverEffect={false}
            >
              Sign Up
            </NavLink>
          ) : (
            <span className="font-semibold cursor-wait text-sm">
              Sign Up
            </span>
          )}
        </div>

        <Button
          type="submit"
          className={"flex justify-center mt-8"}
          disabled={formState.loading}
          loading={formState.loading}
          fullWidth
        >
          Sign In
        </Button>
      </Form>
    </Formik>
  );
};

export default SignInForm;
