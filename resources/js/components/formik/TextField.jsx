import Label from "./Label";
import ErrorMessage from "./ErrorMessage";
import clsx from "clsx";

export default function TextField({
  label = "",
  sublabel = "",
  fullWidth = false,
  className,
  field,
  type = "text",
  disabled,
  form: { errors, touched },
  ...restProps
}) {
  return (
    <div className={clsx("mb-4", fullWidth ? "w-full" : "w-fit")}>
      <Label label={label} sublabel={sublabel} />

      <input
        disabled={disabled}
        type={type || "text"}
        className={clsx(
          "px-4 py-2.5 border rounded-sm w-full",
          className,
          errors[field.name] && touched[field.name]
            ? " border-error-main focus:outline-error-main"
            : "border-gray-200 hover:border-gray-300 focus:outline-gold-main"
        )}
        {...field}
        {...restProps}
      />

      {errors[field.name] && touched[field.name] && (
        <ErrorMessage msg={errors[field.name]} />
      )}
    </div>
  );
}
