import Label from "./Label";
import ErrorMessage from "./ErrorMessage";
import { Listbox } from "@headlessui/react";
import clsx from "clsx";
import { HiChevronDown } from "react-icons/hi2";

const SelectField = ({
  label = "",
  sublabel = "",
  fullWidth = false,
  className,
  field,
  form: { errors, touched, setFieldValue },
  options,
}) => {
  return (
    <div className={clsx("mb-4", fullWidth ? "w-full" : "w-fit")}>
      <Label label={label} sublabel={sublabel} />

      <Listbox
        value={field.value}
        onChange={(option) => setFieldValue(field.name, option)}
        className=""
      >
        {({ open }) => (
          <>
            <div
              className={clsx(
                "relative outline-none rounded-md w-full",
                className
              )}
            >
              <Listbox.Button
                className={clsx(
                  "border outline-none -outline-offset-1 relative rounded-md w-full flex items-center text-left cursor-pointer px-4 py-2.5",
                  errors[field.name] && touched[field.name]
                    ? " border-error-main focus:outline-error-main"
                    : "border-slate-200",
                  open && " outline-gold-main"
                )}
              >
                <span className="grow">{field.value}</span>
                <HiChevronDown
                  className={clsx(
                    "absolute top-3.5 right-3 transition-all min-w-fit text-lg text-slate-500",
                    open && "rotate-180"
                  )}
                />
              </Listbox.Button>

              <Listbox.Options className="z-10 mt-2 absolute w-full rounded-md bg-white shadow-lg ">
                {options.map((option) => (
                  <Listbox.Option
                    key={option}
                    className={({ active }) =>
                      clsx(
                        "px-4 py-2.5 cursor-pointer hover:bg-slate-100",
                        active && "bg-slate-100"
                      )
                    }
                    value={option}
                  >
                    {({ active }) => <span>{option}</span>}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </>
        )}
      </Listbox>

      {errors[field.name] && touched[field.name] && (
        <ErrorMessage msg={errors[field.name]} />
      )}
    </div>
  );
};
export default SelectField;
