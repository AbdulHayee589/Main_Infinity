import HeaderNavigation from "../components/navigation/HeaderNavigation";
import FooterNavigation from "../components/navigation/FooterNavigation";

export default function PublicLayout({ children }) {
  return (
    <>
      <HeaderNavigation />

      <main className="">
        {children}
      </main>

      <FooterNavigation />
    </>
  )
}