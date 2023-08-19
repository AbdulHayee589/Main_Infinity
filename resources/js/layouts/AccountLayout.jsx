import { usePage } from "@inertiajs/react"
import Container from "../components/ui/Container"

const AccountLayout = ({ children }) => {
  const { props} = usePage();
  console.log(props);
  return (
    <Container className="py-12">
      AccountLayout
      {children}</Container>
  )
}
export default AccountLayout