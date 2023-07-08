import clsx from "clsx";
import Brand from "./Brand";
import { FaXmark } from "react-icons/fa6";

export default function SideBar({
  title,
  open,
  onClose,
  headerComponent = null,
  footerComponent = null,
  showFrom = "right",
  children,
  className,
  ...restProps
}) {
  return (
    <div className={clsx("lg:hidden z-50 w-full h-full")} {...restProps}>
      <div
        onClick={onClose}
        className={clsx(
          "z-50 transition-all fixed top-0 right-0 left-0 bottom-0 sm:backdrop-blur-sm sm:bg-black/20",
          open ? "block" : "hidden"
        )}
      ></div>
      <div
        className={clsx(
          "bg-white z-50 fixed top-0 w-full sm:w-1/2 h-full transition-all ease-in-out duration-300",
          showFrom === "right" && "right-0",
          showFrom === "right"
            ? open
              ? "translate-x-0 "
              : "translate-x-full"
            : "right-0",
          showFrom === "left" ? (open ? "left-0" : "-left-full") : ""
        )}
      >
        <div className="h-[100%] pb-24 overflow-auto">
          <div className="relative px-6 py-4 grid gap-4">
            {headerComponent ? (
              headerComponent
            ) : (
              <div className="flex items-center justify-between">
                {title ? title : <Brand onClick={onClose} />}

                <button
                  aria-label="Close Menu"
                  className="text-2xl w-fit ml-auto text-gray-400 hover:text-gold-main transition-all"
                  onClick={onClose}
                >
                  <FaXmark />
                </button>
              </div>
            )}

            {children}
          </div>
        </div>

        {footerComponent}
      </div>
    </div>
  );
}
