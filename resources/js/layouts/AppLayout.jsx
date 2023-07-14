import HeaderNavigation from "../components/navigation/HeaderNavigation";
import FooterNavigation from "../components/navigation/FooterNavigation";

export default function AppLayout({ children }) {
  return (
    <>
      <HeaderNavigation />

      <main className="min-h-[800px]">
        {children}
      </main>
      <FooterNavigation />
    </>
  )
}