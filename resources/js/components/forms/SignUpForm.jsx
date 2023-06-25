import { useState } from "react";
import { Field, Form, Formik } from "formik";
import { registerSchema } from "../formik/schemas";
import NavLink from "../ui/NavLink";
import TextField from "../formik/TextField";
import PasswordField from "../formik/PasswordField";
import Button from "../ui/Button";

export default function SignUpForm() {
  const [formState, setFormState] = useState({
    loading: false,
    error: "",
  });

  const onFormSubmitHandler = async (values) => { setFormState({ ...formState, loading: true }) };
  // setFormState({ loading: true, error: "" });
  // const { email, password } = values;
  // await signIn("sign-in", {
  //   email,
  //   password,
  //   redirect: false,
  // }).then(({ ok, error }) => {
  //   if (error) {
  //     setFormState({
  //       loading: false,
  //       error: error || "Something went wrong. Please try again later",
  //     });
  //     values.password = "";
  //   } else if (ok) router.replace("/");
  // });

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={registerSchema}
      onSubmit={onFormSubmitHandler}
    >
      <Form>
        {formState.error && (
          <Alert variant="error">{formState.error}</Alert>
        )}

        <div className="md:flex gap-2 justify-between">
          <Field
            id="firstName"
            name="firstName"
            label="First Name"
            placeholder="e.g. Daniel"
            disabled={formState.loading}
            maxLength={60}
            component={TextField}
            fullWidth
          />
          <Field
            id="lastName"
            name="lastName"
            label="Last Name"
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

        <Field
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="••••••••••"
          disabled={formState.loading}
          maxLength={20}
          component={PasswordField}
          fullWidth
        />

        <div className="w-full flex mt-1 space-x-2 text-sm text-gray-400">
          <span>Already have an account?</span>
          {!formState.loading ? (
            <NavLink
              href="/sign-in"
              className="font-semibold"
              size="small"
              hoverEffect={false}
            >
              Sign In
            </NavLink>
          ) : (
            <span
              className="font-semibold cursor-wait"
              size="small"
            >
              Sign In
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
          Sign Up
        </Button>
      </Form>
    </Formik>
  );
}
