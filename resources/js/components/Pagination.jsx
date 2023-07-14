import { Link } from "@inertiajs/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import clsx from "clsx";

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
                "text-gray-400 w-10 h-10 grid items-center justify-center rounded-sm border border-gray-100 hover:bg-gray-100",
                active &&
                "bg-gray-100 text-black hover:text-black font-semibold"
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
                "text-gray-400 w-10 h-10 grid items-center justify-center rounded-sm border border-gray-100 hover:bg-gray-100",
                active &&
                "bg-gray-100 text-black hover:text-black font-semibold"
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
                "w-10 h-10 grid items-center justify-center rounded-sm border border-gray-100 hover:bg-gray-100",
                active &&
                "bg-gray-100 text-black hover:text-black font-semibold"
              )}
            >
              {label}
            </Link>
          )
        )}
    </div>
  );
}
