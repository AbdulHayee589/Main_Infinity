import { useState } from "react";
import { BsStarFill } from "react-icons/bs";
import useFormState from "../hooks/useFormState";
import { Field, Form, Formik } from "formik";
import { reviewSchema } from "../../utils/schemas";
import Alert from "../ui/Alert";
import Label from "../ui/formik/Label";
import TextArea from "../ui/formik/TextArea";
import { usePage } from "@inertiajs/react";

const ratingNames = ["Terrible", "Poor", "Average", "Good", "Excellent"];

const WriteAReviewForm = () => {
  const { props } = usePage();
  console.log(props);
  
  const { formState, setFormState } = useFormState();
  const [rating, setRating] = useState(0);

  const onStarClickHandler = (rate) => setRating(rate);

  const onFormSubmitHandler = async (values) => {
    setFormState({ ...formState, loading: true });
  };

  return (
    <div className="my-8">
      <Formik
        initialValues={{
          message: "",
        }}
        validationSchema={reviewSchema}
        onSubmit={onFormSubmitHandler}
      >
        <Form>
          {formState.error && (
            <Alert variant="error">{formState.error}</Alert>
          )}
          <div className="mb-4" disabled={formState.loading}>
            <Label ignoreResponsiveStyle={false} labelFor="rating" label="Rate the product" />

            <div id="rating" className="flex items-center gap-2">
              <div className="flex items-center text-4xl">
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

              <span className="text-slate-400">
                {ratingNames[rating]}
              </span>
            </div>
          </div>

          <Label ignoreResponsiveStyle={false} labelFor="message" label="Message" />

          <Field
            id="message"
            name="message"
            label=""
            component={TextArea}
            rows={8}
            disabled={formState.loading}
            fullWidth
          />
        </Form>
      </Formik>
    </div>
  );
};
export default WriteAReviewForm;
