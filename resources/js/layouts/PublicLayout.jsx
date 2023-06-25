import HeaderNavigation from "../components/navigation/HeaderNavigation";
import FooterNavigation from "../components/navigation/FooterNavigation";

export default function PublicLayout({ children }) {
  return (
    <>
      <HeaderNavigation />

      <main className="min-h-[800px] bg-blue-50">
        {children}
      </main>

      <FooterNavigation />
    </>
  )
}