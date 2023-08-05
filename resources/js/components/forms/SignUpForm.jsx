import { Field, Form, Formik } from "formik";
import { registerSchema } from "../../utils/schemas";
import NavLink from "../ui/NavLink";
import TextField from "../ui/formik/TextField";
import PasswordField from "../ui/formik/PasswordField";
import Button from "../ui/Button";
import useFormState from "../hooks/useFormState";
import Alert from "../ui/Alert";

const SignUpForm = () => {
  const { formState , setFormState} = useFormState();

  const onFormSubmitHandler = async (values) => {
    setFormState({ ...formState, loading: true });
  };
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

        <div className="md:flex gap-4 justify-between">
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

        <div className="w-full flex items-center mt-1 gap-2 text-sm text-slate-400">
          <span>Already have an account?</span>
          {!formState.loading ? (
            <NavLink
              href="/sign-in"
              className="font-semibold text-slate-500"
              size="sm"
              title="Sign In"
              hoverEffect={false}
            >
              Sign In
            </NavLink>
          ) : (
            <span className="font-semibold cursor-wait text-sm">
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
};

export default SignUpForm;
