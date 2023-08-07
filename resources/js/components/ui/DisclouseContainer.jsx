import { Disclosure } from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi2";
import clsx from "clsx";

const DisclouseContainer = ({
  title = "",
  boxHoverEffect = false,
  hideChevron = false,
  className,
  btnClassName,
  panelClassName,
  onChildrenElementClick,
  children,
  open = false,
  ...restProps
}) => {
  return (
    <div className={clsx("", className)}>
      <Disclosure {...restProps} defaultOpen={open}>
        {({ open }) => (
          <>
            <Disclosure.Button
              as="div"
              className={clsx(
                "cursor-pointer group flex justify-between items-center font-semibold transition-all",
                boxHoverEffect
                  ? "hover:bg-slate-100"
                  : "hover:text-gold-main",
                btnClassName
              )}
            >
              {title}
              <div
                className={clsx(
                  "transition-all text-black",
                  !boxHoverEffect &&
                  "group-hover:text-gold-main",
                  open && "rotate-180"
                )}
              >
                {!hideChevron && <HiChevronDown />}
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
    </div>
  );
};
export default DisclouseContainer;
