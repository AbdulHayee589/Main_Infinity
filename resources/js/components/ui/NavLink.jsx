import { Link } from "@inertiajs/react";
import clsx from "clsx";

export default function NavLink({
  size = "base",
  hoverEffect = true,
  className,
  children,
  ...restProps
}) {
  return (
    <Link
      className={clsx(
        "w-fit",
        size === "lg"
          ? "text-lg"
          : size === "sm"
            ? "text-sm"
            : "text-base",
        hoverEffect && "hover:text-gold-main",
        className
      )}
      {...restProps}
    >
      {children}
    </Link>
  );
}
