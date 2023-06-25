import { cva } from "class-variance-authority";
import { rounded } from "./cvaStatics";
import clsx from "clsx";
import Spinner from "./Spinner";

const button = cva("button", {
  variants: {
    intent: {
      primary: [
        "bg-gold-light",
        "text-black",
        "border-transparent",
      ],
      outlined: [
        "bg-white",
        "text-black",
        "border-gray-200",
        "hover:border-gold-main",
      ],
    },
    size: {
      sm: ["text-sm", "py-1.5", "px-2"],
      md: ["text-base", "py-2.5", "px-4"],
      lg: ["text-lg", "py-3", "py-5"],
    },
    rounded: rounded,
  },
  defaultVariants: {
    intent: "primary",
    size: "md",
    rounded: "lg",
  },
});

export default function Button({
  variant,
  size,
  className,
  fullWidth = false,
  children,
  loading,
  ...restProps
}) {
  return (
    <button
      className={clsx(
        "transition-all font-semibold border",
        className,
        fullWidth ? "w-full" : "w-fit",
        button({ intent: variant, size: size })
      )}
      {...restProps}
    >
      {loading ? <Spinner className="w-fit h-fit mx-auto text-black" /> : children}
    </button>
  );
}
