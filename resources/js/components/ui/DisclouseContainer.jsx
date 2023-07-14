import { Disclosure } from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi2";
import clsx from "clsx";
import { FaChevronDown } from "react-icons/fa6";

export default function DisclouseContainer({
  title = "",
  className,
  btnClassName,
  panelClassName,
  onChildrenElementClick,
  children,
  open = false,
  ...restProps
}) {
  return (
    <Disclosure className={clsx("", className)} {...restProps} defaultOpen={open}>
      {({ open }) => (
        <>
          <Disclosure.Button
            className={clsx(
              "group flex justify-between items-center font-semibold transition-all hover:text-gold-main",
              btnClassName
            )}
          >
            {title}
            <div
              className={clsx(
                "text-sm transition-all text-black/80 group-hover:text-gold-main",
                open && "rotate-180"
              )}
            >
              <FaChevronDown />
            </div>
          </Disclosure.Button>

          <Disclosure.Panel
            className={clsx(
              "grid gap-2 text-gray-500 transition-all",
              panelClassName
            )}
          >
            {children}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
