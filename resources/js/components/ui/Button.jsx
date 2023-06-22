import { cva } from "class-variance-authority";
import { rounded } from "./cvaStatics";
import clsx from "clsx";

const button = cva("button", {
  variants: {
    intent: {
      primary: [
        "bg-gold-main",
        "hover:bg-gold-dark",
        "text-black-main",
        "border-transparent",
      ],
      outline: [
        "bg-transparent",
        "hover:bg-gold-main",
        "text-gold-main",
        "border-gold-main",
      ],
    },
    size: {
      sm: ["text-sm", "py-1.5", "px-2"],
      md: ["text-base", "py-2.5", "px-4"],
      lg: ["text-lg", "py-4", "py-5"],
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
  children,
  ...restProps
}) {
  return (
    <button
      className={clsx("font-semibold", className, button(variant, size))}
      {...restProps}
    >
      {children}
    </button>
  );
}
