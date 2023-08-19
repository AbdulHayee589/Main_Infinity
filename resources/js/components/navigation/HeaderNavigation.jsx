import Brand from "../ui/Brand";
import NavLink from "../ui/NavLink";
import { headerNavLinks, headerNavUserDropdownLinks } from "../../statics";
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
import { Menu } from "@headlessui/react";
import Dropdown from "../ui/Dropdown";
import LanguageSelectionModal from "../modals/LanguageSelectionModal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useTranslation } from "react-i18next";

const HeaderNavigation = () => {
  const {
    open: openLngModal,
    setOpen: setOpenLngModal,
    toggleOpen: toggleOpenLngModal,
  } = useOpenState(false);
  const {
    open: openNavSideBar,
    setOpen: setOpenNavSideBar,
    toggleOpen: toggleOpenNavSideBar,
  } = useOpenState(false);
  const { t } = useTranslation();

  const openNavSideBarHandler = () => toggleOpenNavSideBar();
  const closeNavSideBarHandler = () => setOpenNavSideBar(false);

  const { props } = usePage();
  const { user } = props.auth;

  return (
    <>
      <NavSideBar
        open={openNavSideBar}
        onNavLinkClick={closeNavSideBarHandler}
        onClose={toggleOpenNavSideBar}
      />

      <LanguageSelectionModal
        open={openLngModal}
        setOpen={setOpenLngModal}
      />

      <header className="bg-white shadow flex justify-between items-center transition-all py-4 lg:py-2">
        {/* <div className="flex items-center gap-2">
          <button onClick={() => changeLanguageHandler("en")}>
            EN
          </button>
          <button onClick={() => changeLanguageHandler("bg")}>
            BG
          </button>
        </div> */}

        <Container className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <button
              className="lg:hidden text-3xl cursor-pointer text-slate-500 hover:text-gold-main"
              onClick={openNavSideBarHandler}
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

          <div className="flex text-2xl items-center gap-3">
            <div className="flex gap-3">
              <NavLink
                href="/shop/favourites"
                className="text-slate-500 hover:text-gold-main"
              >
                <HiOutlineHeart />
              </NavLink>

              <NavLink
                href="/shop/cart"
                className="text-slate-500 hover:text-gold-main"
              >
                <HiShoppingCart />
              </NavLink>

              <button
                className="h-[24px]"
                onClick={toggleOpenLngModal}
              >
                <LazyLoadImage
                  src={`https://hatscripts.github.io/circle-flags/flags/${t(
                    "lngPrefix"
                  )}.svg`}
                  width="24"
                  effect="blur"
                />
              </button>
            </div>

            {user?.id ? (
              <Dropdown
                className="border-none"
                menuBtnClassName="border-none text-base px-0 py-0 gap-2"
                menuItemsClassName="text-base py-2"
                hideChevronOnSmallScreens={true}
                title={
                  <div className="flex items-center gap-2">
                    <div className="rounded-full grid items-center w-8 h-8 text-white font-semibold bg-gold-main">
                      {
                        user.name
                          .split(" ")[0]
                          .split("")[0]
                      }
                      {
                        user.name
                          .split(" ")[1]
                          .split("")[0]
                      }
                    </div>
                    <span className="hidden lg:block max-w-[100px] xl:max-w-[120px] truncate ...">
                      {user.name}
                    </span>
                  </div>
                }
              >
                {headerNavUserDropdownLinks.map(
                  ({ id, title, href }) => (
                    <Menu.Item
                      as="div"
                      key={id}
                      className="px-4 py-1 w-full"
                    >
                      <NavLink href={href}>
                        {title}
                      </NavLink>
                    </Menu.Item>
                  )
                )}
              </Dropdown>
            ) : (
              <NavLink
                href="/sign-in"
                className="flex gap-2 items-center text-slate-500"
              >
                <Button
                  size="sm"
                  variant="outlined"
                  className="px-4 text-base text-black/80"
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
