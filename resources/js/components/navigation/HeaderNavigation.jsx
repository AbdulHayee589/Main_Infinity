import Brand from "../ui/Brand";
import NavLink from "../ui/NavLink";
import { headerNavLinks } from "../../statics";
import NavSideBar from "../sidebar/NavSideBar";
import useOpenState from "../hooks/useOpenState";
import Container from "../ui/Container";
import Button from "../ui/Button";
import {
  HiBars3CenterLeft,
  HiOutlineHeart,
  HiShoppingCart,
} from "react-icons/hi2";

const HeaderNavigation = () => {
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

      <header className="bg-white shadow flex justify-between items-center transition-all py-4 lg:py-2">
        <Container className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <button
              className="lg:hidden text-3xl cursor-pointer text-gray-500 hover:text-gold-main"
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

          <div className="flex text-2xl items-center gap-4">
            <NavLink className="text-gray-500 hover:text-gold-main">
              <HiOutlineHeart />
            </NavLink>

            <NavLink
              href="/shop/cart"
              className="text-gray-500 hover:text-gold-main"
            >
              <HiShoppingCart />
            </NavLink>

            <NavLink
              href="/sign-in"
              className="flex gap-2 items-center text-gray-500"
            >
              <Button
                size="sm"
                variant="outlined"
                className="px-6 text-base text-black/80"
              >
                Sign In
              </Button>
            </NavLink>
          </div>
        </Container>
      </header>
    </>
  );
};
export default HeaderNavigation;
