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
    <SideBar
      open={open}
      onClose={onClose}
      headerClassName="px-6 py-4"
      {...restProps}
    >
      <nav className="grid">
        {navLinks.map(({ id, title, type, ...rest }) =>
          type === "category" ? (
            <DisclouseContainer
              key={id}
              title={title}
              btnClassName="px-6 py-2"
              panelClassName="px-6"
            >
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
              className="font-semibold px-6 py-2"
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
