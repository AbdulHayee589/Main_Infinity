import { useState } from "react";
import { Field, Form, Formik } from "formik";
import { loginSchema } from "../formik/schemas";
import NavLink from "../ui/NavLink";
import TextField from "../formik/TextField";
import PasswordField from "../formik/PasswordField";
import Button from "../ui/Button";

export default function SignInForm() {
  const [formState, setFormState] = useState({
    loading: false,
    error: "",
  });

  const onFormSubmitHandler = async (values) => { setFormState({ ...formState, loading: true }) };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginSchema}
      onSubmit={onFormSubmitHandler}
    >
      <Form>
        {formState.error && (
          <Alert variant="error">{formState.error}</Alert>
        )}

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

        <div className="w-full flex mt-1 space-x-2 text-sm text-gray-400">
          <span>Dont have an account?</span>
          {!formState.loading ? (
            <NavLink
              href="/sign-up"
              className="font-semibold"
              size="small"
              hoverEffect={false}
            >
              Sign Up
            </NavLink>
          ) : (
            <span
              className="font-semibold cursor-wait"
              size="small"
            >
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
}
