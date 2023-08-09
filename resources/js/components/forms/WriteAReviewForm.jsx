import { useState } from "react";
import { BsStarFill } from "react-icons/bs";
import useFormState from "../hooks/useFormState";
import { Field, Form, Formik } from "formik";
import Alert from "../ui/Alert";
import Label from "../ui/formik/Label";
import TextArea from "../ui/formik/TextArea";
import { router, usePage } from "@inertiajs/react";
import Button from "../ui/Button";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

const WriteAReviewForm = ({ closeOnSubmit }) => {
  const [formState, setFormState] = useFormState();
  const [rating, setRating] = useState(0);
  const { props } = usePage();
  const { t } = useTranslation();

  const onStarClickHandler = (rate) => setRating(rate);

  const onFormSubmitHandler = async (values, { setErrors }) => {
    if (!productId) return;

    router.post(`shop/products/${props.blueprints.id}/rate`, {
      method: "post",
      preserveState: true,
      data: {
        rating: rating + 1,
        message: values.message,
      },
      onBefore: () => {
        setFormState({ ...formState, loading: true });
      },
      onError: (errors) => {
        console.log(errors);
        setErrors(errors);
      },
      onSuccess: () => {
        closeOnSubmit();
      },
      onFinish: () => {
        setFormState({ ...formState, loading: false });
      },
    });
  };

  return (
    <div className="my-6">
      <Formik
        initialValues={{
          message: "",
        }}
        validationSchema={Yup.object().shape({
          message: Yup.string()
              .required(t("forms.errors.fieldRequired"))
              .max(100, t("forms.errors.maxSymbolsExceeded")),
      })}
        onSubmit={onFormSubmitHandler}
      >
        <Form>
          {formState.error && (
            <Alert variant="error">{formState.error}</Alert>
          )}
          <div className="mb-4" disabled={formState.loading}>
            <Label label={t("forms.writeAReview.rate")} />

            <div id="rating" className="flex items-center gap-2">
              <div className="flex items-center text-3xl xxs:text-4xl sm:text-5xl">
                {Array.from(
                  { length: 5 },
                  (_, index) => index
                ).map((index) => (
                  <BsStarFill
                    key={index}
                    onClick={() =>
                      onStarClickHandler(index)
                    }
                    className={
                      index <= rating
                        ? "text-gold-main"
                        : "text-slate-200"
                    }
                  />
                ))}
              </div>

              <span className="text-slate-500">
                {
                  t("forms.writeAReview.rateText", {
                    returnObjects: true,
                  })[rating]
                }
              </span>
            </div>
          </div>

          <Field
            id="message"
            name="message"
            label={t("forms.writeAReview.message")}
            component={TextArea}
            style={{ resize: "none" }}
            rows={8}
            disabled={formState.loading}
            fullWidth
          />

          <div className="grid lg:flex items-center gap-2">
            <Button
              type="submit"
              className={
                "flex justify-center w-full lg:w-fit lg:disabled:px-8"
              }
              disabled={formState.loading}
              loading={formState.loading}
            >
              {t("forms.writeAReview.submitBtn")}
            </Button>
            <Button
              variant="outlined"
              className={"flex justify-center w-full lg:w-fit"}
              disabled={formState.loading}
              loading={formState.loading}
              onClick={closeOnSubmit}
            >
              {t("forms.writeAReview.cancelBtn")}
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
export default WriteAReviewForm;
