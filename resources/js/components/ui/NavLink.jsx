import { Link } from "@inertiajs/inertia-react";
import clsx from "clsx";

export default function NavLink({
  size = "normal",
  hoverEffect = true,
  className,
  children,
  ...restProps
}) {
  return (
    <Link
      className={clsx(
        "text-gray-500 w-fit",
        size === "large"
          ? "text-lg"
          : size === "small"
            ? "text-sm"
            : "text-base",
        hoverEffect && "transition-all hover:text-gold-main",
        className
      )}
      {...restProps}
    >
      {children}
    </Link>
  );
}
