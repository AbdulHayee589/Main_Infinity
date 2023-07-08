import { Disclosure } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa6";
import clsx from "clsx";

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
    <Disclosure {...restProps} defaultOpen={open}>
      {({ open }) => (
        <>
          <Disclosure.Button
            className={clsx(
              "flex justify-between items-center font-semibold",
              btnClassName
            )}
          >
            {title}
            <div
              className={clsx(
                "transition-all text-lg",
                open
                  ? "rotate-180 text-gold-light"
                  : "text-gray-300"
              )}
            >
              <FaChevronDown />
            </div>
          </Disclosure.Button>

          <Disclosure.Panel
            className={clsx(
              "grid gap-2 text-gray-500",
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
