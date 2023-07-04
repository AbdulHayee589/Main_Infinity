import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { FaXmark, FaSearchengin } from "react-icons/fa6";
import NavLink from "../ui/NavLink";
import Brand from "../ui/Brand";
import DisclouseContainer from "../ui/DisclouseContainer";
import Button from "../ui/Button";
// import AccountDetails from "../AccountDetails";
import clsx from "clsx";

export default function NavSideBar({
  navLinks = [],
  open,
  onNavLinkClick,
  onClose,
  ...restProps
}) {
  const [searchValue, setSearchValue] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    Inertia.visit(`/how-it-works?test=${searchValue}`);
    setSearchValue("");
    onClose();
  };

  const onChangeHandler = (e) => setSearchValue(e.target.value);

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
          "bg-white z-50 fixed top-0 right-0 w-full sm:w-1/2 h-full transition-all ease-in-out duration-300",
          open ? "translate-x-0 " : "translate-x-full"
        )}
      >
        <div className="h-[85%] overflow-auto">
          <div className="px-6 py-4 grid gap-4">
            <div className="flex items-center justify-between">
              <Brand onClick={onClose} />

              <button
                aria-label="Close Menu"
                className="text-2xl w-fit ml-auto text-gray-400 hover:text-gold-main transition-all"
                onClick={onClose}
              >
                <FaXmark />
              </button>
            </div>

            {/* <AccountDetails /> */}

            <nav className="grid gap-4">
              {navLinks.map(({ id, title, type, ...rest }) =>
                type === "category" ? (
                  <DisclouseContainer key={id} title={title}>
                    {rest?.links.map(
                      ({ id, title, href }) => (
                        <NavLink
                          key={id}
                          href={href}
                          title={title}
                          onClick={onClose}
                        >
                          {title}
                        </NavLink>
                      )
                    )}
                  </DisclouseContainer>
                ) : (
                  <NavLink
                    key={id}
                    href={rest?.href}
                    title={title}
                    onClick={onClose}
                    className="font-semibold"
                  >
                    {title}
                  </NavLink>
                )
              )}
            </nav>
          </div>
        </div>

        <div className="absolute bottom-0 py-4 px-6 bg-white w-full">
          <NavLink href="/sign-in">
          <Button fullWidth>Sign In</Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
