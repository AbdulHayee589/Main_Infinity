import { Disclosure } from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi2";
import clsx from "clsx";

const DisclouseContainer = ({
  title = "",
  boxHoverEffect = false,
  className,
  btnClassName,
  panelClassName,
  onChildrenElementClick,
  children,
  open = false,
  ...restProps
}) => {
  return (
    <Disclosure
      className={clsx("", className)}
      {...restProps}
      defaultOpen={open}
    >
      {({ open }) => (
        <>
          <Disclosure.Button
            className={clsx(
              "p-2 group flex justify-between items-center font-semibold transition-all",
              boxHoverEffect
                ? "hover:bg-gray-100"
                : "hover:text-gold-main",
              btnClassName
            )}
          >
            {title}
            <div
              className={clsx(
                "transition-all text-black",
                !boxHoverEffect && "group-hover:text-gold-main",
                open && "rotate-180"
              )}
            >
              <HiChevronDown />
            </div>
          </Disclosure.Button>

          <Disclosure.Panel
            className={clsx(
              "grid gap-2 p-2 text-black transition-all",
              panelClassName
            )}
          >
            {children}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
export default DisclouseContainer;
