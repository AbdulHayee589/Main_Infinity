import { Link } from "@inertiajs/react";
import clsx from "clsx";

export default function NavLink({
  href = "/",
  size = "base",
  hoverEffect = true,
  className,
  children,
  ...restProps
}) {
  return (
    <Link
      href={href}
      className={clsx(
        "w-fit",
        size === "lg" ? "text-lg" : size === "sm" ? "text-sm" : "",
        hoverEffect && "hover:text-gold-main",
        className
      )}
      {...restProps}
    >
      {children}
    </Link>
  );
}
