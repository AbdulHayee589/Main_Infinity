import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import NavLink from "../ui/NavLink";
import DisclouseContainer from "../ui/DisclouseContainer";
import SideBar from "../ui/SideBar";

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
    <SideBar
      open={open}
      onClose={onClose}
      {...restProps}
    >
      <nav className="grid gap-3">
        {navLinks.map(({ id, title, type, ...rest }) =>
          type === "category" ? (
            <DisclouseContainer key={id} title={title}>
              {rest?.links.map(({ id, title, href }) => (
                <NavLink
                  key={id}
                  href={href}
                  title={title}
                  onClick={onClose}
                >
                  {title}
                </NavLink>
              ))}
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
    </SideBar>
  );
}
