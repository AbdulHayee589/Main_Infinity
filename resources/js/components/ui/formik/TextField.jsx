import Label from "./Label";
import ErrorMessage from "./ErrorMessage";
import clsx from "clsx";

const TextField = ({
  label = "",
  sublabel = "",
  fullWidth = false,
  className,
  field,
  type = "text",
  disabled,
  form: { errors, touched },
  ...restProps
}) => {
  return (
    <div className={clsx("mb-4", fullWidth ? "w-full" : "w-fit")}>
      <Label label={label} sublabel={sublabel} />

      <input
        disabled={disabled}
        type={type || "text"}
        className={clsx(
          "px-4 py-2.5 border rounded-md w-full",
          className,
          errors[field.name] && touched[field.name]
            ? " border-error-main focus:outline-error-main"
            : "border-slate-200 focus:outline-gold-main"
        )}
        {...field}
        {...restProps}
      />

      {errors[field.name] && touched[field.name] && (
        <ErrorMessage msg={errors[field.name]} />
      )}
    </div>
  );
};
export default TextField;
