import NavLink from "../ui/NavLink";
import DisclouseContainer from "../ui/DisclouseContainer";
import SideBar from "../ui/SideBar";

const NavSideBar = ({
  navLinks = [],
  open,
  onNavLinkClick,
  onClose,
  ...restProps
}) => {
  return (
    <SideBar open={open} onClose={onClose} className="p-4" {...restProps}>
      <nav className="grid">
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
              className="font-semibold px-2"
            >
              {title}
            </NavLink>
          )
        )}
      </nav>
    </SideBar>
  );
};
export default NavSideBar;
