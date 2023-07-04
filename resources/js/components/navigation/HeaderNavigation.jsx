import {
  FaBarsStaggered,
  FaCartShopping,
  FaRegHeart,
  FaRightToBracket,
} from "react-icons/fa6";
import Brand from "../ui/Brand";
import NavLink from "../ui/NavLink";
import { headerNavLinks } from "../../statics";
import NavSideBar from "../sidebar/NavSideBar";
import useOpenState from "../hooks/useOpenState";

export default function HeaderNavigation({ }) {
  const { open, setOpen, toggleOpen } = useOpenState(false);

  const closeMobileMenu = () => setOpen(false);

  return (
    <>
      <NavSideBar
        navLinks={headerNavLinks}
        open={open}
        onNavLinkClick={closeMobileMenu}
        onClose={toggleOpen}
      />
      <header className="bg-white shadow flex justify-between items-center transition-all px-4 py-4 lg:py-2">
        <div className="container flex justify-between items-center">
          <Brand />

          <div className="hidden lg:flex items-center text-black">
            {headerNavLinks.map(({ id, title, type, ...rest }) =>
              type === "category" ? (
                <div
                  key={id}
                  className="p-4 group cursor-pointer"
                >
                  <div className="group-hover:text-gold-main">
                    {title}
                  </div>
                  <div className="shadow-lg rounded-b-lg hidden group-hover:flex absolute top-16 bg-white">
                    <div className="grid gap-3 p-4">
                      {rest?.links.map(
                        ({ id, title, href }) => (
                          <NavLink
                            key={id}
                            href={href}
                            className="text-gray-500 hover:text-gold-main"
                            title={title}
                          >
                            {title}
                          </NavLink>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink
                  key={id}
                  href={rest?.href}
                  title={title}
                  className="p-4"
                >
                  {title}
                </NavLink>
              )
            )}
          </div>

          <div className="flex text-2xl items-center gap-6">
            <button
              className="cursor-pointer text-gray-500 hover:text-gold-main"
              onClick={toggleOpen}
            >
              <FaRegHeart />
            </button>

            <button
              className="cursor-pointer text-gray-500 hover:text-gold-main"
              onClick={toggleOpen}
            >
              <FaCartShopping />
            </button>

            <button
              className="lg:hidden cursor-pointer text-gray-500 hover:text-gold-main"
              onClick={toggleOpen}
            >
              <FaBarsStaggered />
            </button>

            <NavLink
              href="/sign-in"
              className="hidden lg:flex gap-2 items-center text-gray-500"
            >
              <div className="text-xl ">
                <FaRightToBracket />
              </div>
              Sign In
            </NavLink>
          </div>
        </div>
      </header>
    </>
  );
}
