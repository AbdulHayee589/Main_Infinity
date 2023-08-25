import { Field, Form, Formik } from "formik";
import Button from "../ui/Button";
import PasswordField from "../ui/formik/PasswordField";
import useFormState from "../hooks/useFormState";
import { useTranslation } from "react-i18next";
import TextField from "../ui/formik/TextField";
import SelectField from "../ui/formik/SelectField";
import TextArea from "../ui/formik/TextArea";

const CartForm = () => {
  const { t } = useTranslation();
  const [formState, setFormState] = useFormState();

  const onFormSubmitHandler = async (values, { setErrors }) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        shippingAddress: "",
        city: "",
        postalCode: "",
        country: "",
        promoCode: "",
        email: "",
        comment: "",
      }}
      onSubmit={onFormSubmitHandler}
    >
      <Form>
        <div className="md:flex gap-4 items-center justify-between">
          <Field
            id="firstName"
            name="firstName"
            label="first"
            placeholder="e.g. Daniel"
            disabled={formState.loading}
            maxLength={60}
            component={TextField}
            fullWidth
          />
          <Field
            id="lastName"
            name="lastName"
            label="last"
            placeholder="e.g. Dimitrov"
            disabled={formState.loading}
            maxLength={60}
            component={TextField}
            fullWidth
          />
        </div>

        <Field
          id="shippingAddress"
          name="shippingAddress"
          label="ship add"
          placeholder="e.g. Dimitrov"
          disabled={formState.loading}
          maxLength={60}
          component={TextField}
          fullWidth
        />

        <div className="md:flex gap-4 items-center justify-between">
          <Field
            id="city"
            name="city"
            label="city"
            placeholder="e.g. Daniel"
            disabled={formState.loading}
            maxLength={60}
            component={TextField}
            fullWidth
          />
          <Field
            id="postalCode"
            name="postalCode"
            label="postalCode"
            placeholder="e.g. Dimitrov"
            disabled={formState.loading}
            maxLength={60}
            component={TextField}
            fullWidth
          />
        </div>

        <Field
          id="country"
          name="country"
          label="durjava"
          options={["bg", "uk", "usa"]}
          disabled={formState.loading}
          component={SelectField}
          fullWidth
        />

        <div className="w-full">
          <Field
            id="promoCode"
            name="promoCode"
            label="last"
            placeholder="e.g. Dimitrov"
            disabled={formState.loading}
            maxLength={60}
            component={TextField}
            fullWidth
          />
          <Button
          type="text"
            className={"flex justify-center mt-8"}
            disabled={formState.loading}
            loading={formState.loading}
            title={t("forms.signUp.submitBtn")}
            fullWidth
          >
            priloji promo kod
          </Button>
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
          id="comment"
          name="comment"
          label={t("forms.writeAReview.message")}
          component={TextArea}
          style={{ resize: "none" }}
          rows={8}
          disabled={formState.loading}
          fullWidth
        />

        <Button
          type="submit"
          className={"flex justify-center mt-8"}
          disabled={formState.loading}
          loading={formState.loading}
          title={t("forms.signUp.submitBtn")}
          fullWidth
        >
          submit
        </Button>
      </Form>
    </Formik>
  );
};
export default CartForm;
