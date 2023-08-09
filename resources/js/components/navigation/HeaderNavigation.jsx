import Brand from "../ui/Brand";
import NavLink from "../ui/NavLink";
import { headerNavLinks } from "../../utils/statics";
import NavSideBar from "../sidebar/NavSideBar";
import useOpenState from "../hooks/useOpenState";
import Container from "../ui/Container";
import Button from "../ui/Button";
import {
  HiBars3CenterLeft,
  HiOutlineHeart,
  HiShoppingCart,
} from "react-icons/hi2";
import { usePage } from "@inertiajs/react";
import { changeLanguage } from "i18next";

const HeaderNavigation = () => {
  const { open, setOpen, toggleOpen } = useOpenState(false);
  const closeMobileMenu = () => setOpen(false);
  const { props } = usePage();

  const changeLanguageHandler = (lng) => {
    localStorage.setItem("selected-language", lng);
    changeLanguage(lng);
  }

  return (
    <>
      <NavSideBar
        navLinks={headerNavLinks}
        open={open}
        onNavLinkClick={closeMobileMenu}
        onClose={toggleOpen}
      />

      <header className="bg-white shadow flex justify-between items-center transition-all py-4 lg:py-2">
      <div className="flex items-center gap-2">
        <button onClick={() => changeLanguageHandler('en')}>EN</button>
        <button onClick={() => changeLanguageHandler('bg')}>BG</button>
      </div>
    
        <Container className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <button
              className="lg:hidden text-3xl cursor-pointer text-slate-500 hover:text-gold-main"
              onClick={toggleOpen}
            >
              <HiBars3CenterLeft />
            </button>

            <Brand />
          </div>

          <div className="z-20 hidden lg:flex items-center text-black">
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
                            className="text-slate-500 hover:text-gold-main"
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

          <div className="flex text-2xl items-center gap-2">
            <NavLink className="text-slate-500 hover:text-gold-main">
              <HiOutlineHeart />
            </NavLink>

            <NavLink
              href="/shop/cart"
              className="text-slate-500 hover:text-gold-main"
            >
              <HiShoppingCart />
            </NavLink>

            {props.auth.user?.id ? (
              <NavLink
                href="/logout"
                className="flex gap-2 items-center text-slate-500"
              >
                <Button
                  size="sm"
                  variant="outlined"
                  className="px-6 text-base text-black/80"
                >
                  Logout
                </Button>
              </NavLink>
            ) : (
              <NavLink
                href="/sign-in"
                className="flex gap-2 items-center text-slate-500"
              >
                <Button
                  size="sm"
                  variant="outlined"
                  className="px-6 text-base text-black/80"
                >
                  Sign In
                </Button>
              </NavLink>
            )}
          </div>
        </Container>
      </header>
    </>
  );
};
export default HeaderNavigation;
