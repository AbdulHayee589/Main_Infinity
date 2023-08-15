import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { HiChevronDown } from "react-icons/hi2";
import clsx from "clsx";

const Dropdown = ({
  title = "Dropdown",
  className,
  menuBtnClassName,
  menuItemsClassName,
  chevronDown = true,
  hideChevronOnSmallScreens = false,
  children,
}) => {
  return (
    <Menu as="div" className={clsx("relative", className)}>
      {({ open }) => (
        <>
          <div>
            <Menu.Button
              className={clsx(
                menuBtnClassName,
                "rounded-md border border-slate-200 w-full items-center flex gap-2 outline-none",
                
              )}
            >
              {title}
              {chevronDown && (
                <HiChevronDown
                  className={clsx(
                    "transition-all",
                    open && "rotate-180",
                    hideChevronOnSmallScreens && "hidden lg:block"
                  )}
                />
              )}
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              className={clsx(
                "z-30 overflow-hidden absolute right-0 mt-2 w-52 origin-top-right rounded-md border bg-white shadow-lg focus:outline-none outline-none select-none",
                menuItemsClassName
              )}
            >
              {children}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};
export default Dropdown;
