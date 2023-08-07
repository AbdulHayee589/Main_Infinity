import HeaderNavigation from "../components/navigation/HeaderNavigation";
import FooterNavigation from "../components/navigation/FooterNavigation";

const AppLayout = ({ children }) => {
  return (
    <>
      <HeaderNavigation />
      <main>{children}</main>
      <FooterNavigation />
    </>
  );
};
export default AppLayout;
