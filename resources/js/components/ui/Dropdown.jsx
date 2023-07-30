import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { HiChevronDown } from "react-icons/hi2";
import clsx from "clsx";

export default function Dropdown({
  title = "Dropdown",
  className,
  menuBtnClassName,
  menuItemsClassName,
  chevronDown = true,
  children,
}) {
  return (
    <Menu as="div" className={clsx("relative", className)}>
      {({ open }) => (
        <>
          <div>
            <Menu.Button
              className={clsx(
                "rounded-sm border border-gray-200 px-4 py-2 w-full items-center flex justify-between gap-6 outline-none",
                menuBtnClassName
              )}
            >
              {title}
              {chevronDown && (
                <HiChevronDown
                  className={clsx(
                    "transition-all",
                    open && "rotate-180"
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
                "z-30 absolute right-0 mt-2 w-52 origin-top-right rounded-sm bg-white shadow-lg ring-1 ring-secondary-light focus:outline-none outline-none select-none",
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
}
