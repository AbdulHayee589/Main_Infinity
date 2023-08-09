import clsx from "clsx";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";

const TextArea = ({
  label = "",
  fullWidth = false,
  className,
  field,
  form: { errors, touched },
  ...restProps
}) => {
  return (
    <div className={clsx("py-3.5", fullWidth ? "w-full" : "w-fit")}>
      {label && <Label label={label}/>}

      <textarea
        className={clsx(
          "p-4 focus:outline-gold-main border w-full rounded-md max-h-[200px] bg-white",
          className,
          errors[field.name] && touched[field.name]
            ? " border-error-main focus:outline-error-main"
            : "border-slate-200 focus:outline-gold-main"
        )}
        {...field}
        {...restProps}
      ></textarea>

      {errors[field.name] && touched[field.name] && (
        <ErrorMessage msg={errors[field.name]} />
      )}
    </div>
  );
};
export default TextArea;
