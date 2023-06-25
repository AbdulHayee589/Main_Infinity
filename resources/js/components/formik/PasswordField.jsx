import { useEffect, useRef, useState } from "react";
import Label from "./Label";
import ErrorMessage from "./ErrorMessage";
import { FiEye, FiEyeOff } from "react-icons/fi";
import clsx from "clsx";

export default function PasswordField({
  label = "",
  sublabel = "",
  fullWidth = false,
  type = "password",
  className,
  field,
  disabled,
  form: { errors, touched },
  ...restProps
}) {
  const inputRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const setEndOfInput = () => {
    const length = inputRef.current.value.length;

    if (length > 0)
      setTimeout(() => {
        inputRef.current.selectionStart = inputRef.current.selectionEnd =
          length;
      });
  };

  const PasswordIconClickHandler = () => {
    setIsVisible(!isVisible);
    inputRef.current.focus();
  };

  useEffect(() => {
    if (disabled && isVisible) setIsVisible(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled]);

  useEffect(() => {
    if (inputRef.current)
      inputRef.current.addEventListener("focus", () => setEndOfInput(), false);

    return () => {
      if (inputRef.current)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        inputRef.current.removeEventListener(
          "focus",
          () => setEndOfInput(),
          false
        );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={clsx("mb-4", fullWidth ? "w-full" : "w-fit")}>
      <Label label={label} sublabel={sublabel} />

      <div className="relative">
        <button
          tabIndex={-1}
          type="button"
          disabled={disabled}
          className="hover:text-gold-main transition-all bg-transparent absolute top-2 right-2 px-1.5 py-1.5 text-xl text-secondary-dark cursor-pointer rounded-lg select-none"
          onClick={PasswordIconClickHandler}
        >
          {isVisible ? <FiEyeOff /> : <FiEye />}
        </button>

        <input
          ref={inputRef}
          disabled={disabled}
          type={isVisible && !disabled ? "text" : "password"}
          className={clsx(
            "px-4 py-2.5 border rounded-lg w-full",
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
    </div>
  );
}
