import HeaderNavigation from "../components/navigation/HeaderNavigation";
import FooterNavigation from "../components/navigation/FooterNavigation";
import { usePage } from "@inertiajs/react";

const AppLayout = ({ children }) => {
  const { props } = usePage();
  console.log(props);

  return (
    <>
      <HeaderNavigation />
      <main>{children}</main>
      <FooterNavigation />
    </>
  );
};
export default AppLayout;
