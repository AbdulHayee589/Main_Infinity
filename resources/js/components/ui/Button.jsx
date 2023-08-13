import { cva } from "class-variance-authority";
import { rounded } from "../../utils/cva/rounded";
import clsx from "clsx";
import Spinner from "./Spinner";

const button = cva("button", {
  variants: {
    intent: {
      primary: ["bg-gold-main", "text-black", "border-transparent"],
      outlined: [
        "bg-white",
        "text-black/80",
        "border-slate-200",
        "hover:text-gold-main",
      ],
    },
    size: {
      sm: ["py-1.5", "px-4"],
      md: ["py-2", "px-4"],
      lg: ["py-3", "px-4"],
    },
    rounded: rounded,
  },
  defaultVariants: {
    intent: "primary",
    size: "md",
    rounded: "sm",
  },
});

const Button = ({
  variant,
  size,
  className,
  fullWidth = false,
  children,
  loading,
  ...restProps
}) => {
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
      {loading ? (
        <Spinner className="w-fit h-fit mx-auto text-black" />
      ) : (
        children
      )}
    </button>
  );
};
export default Button;
