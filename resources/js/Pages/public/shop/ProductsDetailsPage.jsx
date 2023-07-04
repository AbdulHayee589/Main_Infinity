import { usePage } from "@inertiajs/inertia-react";
import { useEffect } from "react";

export default function ProductsDetailsPage() {
  const { props } = usePage();

  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <div>ProductsDetailsPage</div>
  )
}