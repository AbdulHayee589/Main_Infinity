import FooterNavigation from "../components/navigation/FooterNavigation";

const LandingLayout = ({ children }) => {
  return (
    <>
      <main>{children}</main>
      <FooterNavigation />
    </>
  );
};
export default LandingLayout;
