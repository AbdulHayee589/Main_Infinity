import { Link } from "@inertiajs/inertia-react";
import clsx from "clsx";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export default function Pagination({ links, className, ...restProps }) {
  return (
    <div
      className={clsx("flex items-center justify-end gap-1", className)}
      {...restProps}
    >
      {links &&
        links.map(({ url, label, active }, index) =>
          label.startsWith("&laquo;") ? (
            <Link
              key={index}
              href={url}
              disabled={url === null}
              className={clsx(
                "text-gray-400 w-10 h-10 grid items-center justify-center rounded-md border border-gray-100 hover:bg-gray-50",
                active &&
                "bg-gold-light hover:bg-gold-light text-black hover:text-black font-semibold border-gold-light"
              )}
            >
              <FaChevronLeft />
            </Link>
          ) : label.endsWith("&raquo;") ? (
            <Link
              key={index}
              href={url}
              disabled={url === null}
              className={clsx(
                "text-gray-400 w-10 h-10 grid items-center justify-center rounded-md border border-gray-100 hover:bg-gray-50",
                active &&
                "bg-gold-light hover:bg-gold-light text-black hover:text-black font-semibold border-gold-light"
              )}
            >
              <FaChevronRight />
            </Link>
          ) : (
            <Link
              key={index}
              href={url}
              disabled={url === null}
              className={clsx(
                "w-10 h-10 grid items-center justify-center rounded-md border border-gray-100 hover:bg-gray-50",
                active &&
                "bg-gold-light hover:bg-gold-light text-black hover:text-black font-semibold border-gold-light"
              )}
            >
              {label}
            </Link>
          )
        )}
    </div>
  );
}