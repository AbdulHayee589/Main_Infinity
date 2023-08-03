import { useEffect, useState } from "react";
import useSearchParams from "../hooks/useSearchParams";
import { Link } from "@inertiajs/react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import clsx from "clsx";

const Pagination = ({ links, className, ...restProps }) => {
  const [pages, setPages] = useState([]);
  const { searchParams } = useSearchParams();

  const prevPage = links[0];
  const nextPage = links[links.length - 1];

  useEffect(() => {
    const strippedPages = links
      .slice(1, links.length - 1)
      .filter((el) => el.label != "...");

    const activeIndex = strippedPages.findIndex((l) => l.active);

    if (strippedPages.length > 5) {
      if (activeIndex === 0) setPages(strippedPages.slice(0, 5));
      else if (activeIndex === strippedPages.length - 1)
        setPages(strippedPages.slice(activeIndex - 4, activeIndex + 1));
      else if (activeIndex === strippedPages.length - 2)
        setPages(strippedPages.slice(activeIndex - 3, activeIndex + 2));
      else
        setPages(strippedPages.slice(activeIndex - 2, activeIndex + 3));
    } else {
      setPages(strippedPages);
    }
  }, [links]);

  return (
    <div
      className={clsx(
        "flex items-center justify-center sm:justify-end gap-2",
        className
      )}
      {...restProps}
    >
      {prevPage?.url && (
        <Link
          key={prevPage?.label}
          href={
            searchParams["search"]
              ? `${prevPage?.url}&search=${searchParams["search"]}`
              : prevPage?.url
          }
          className="w-9 h-9 grid items-center justify-center rounded-sm font-semibold text-gray-400"
        >
          <HiChevronLeft />
        </Link>
      )}

      {pages.map(({ active, label, url }) => (
        <Link
          key={label}
          href={
            searchParams["search"]
              ? `${url}&search=${searchParams["search"]}`
              : url
          }
          className={clsx(
            "w-9 h-9 grid items-center justify-center rounded-sm font-semibold",
            active ? "bg-gold-light text-white" : "hover:bg-gray-100"
          )}
        >
          {label}
        </Link>
      ))}

      {nextPage?.url && (
        <Link
          key={nextPage?.label}
          href={
            searchParams["search"]
              ? `${nextPage?.url}&search=${searchParams["search"]}`
              : nextPage?.url
          }
          className="w-9 h-9 grid items-center justify-center rounded-sm font-semibold text-gray-400"
        >
          <HiChevronRight />
        </Link>
      )}
    </div>
  );
};
export default Pagination;
