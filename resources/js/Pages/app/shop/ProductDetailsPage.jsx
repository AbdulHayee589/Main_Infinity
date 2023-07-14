import { usePage } from "@inertiajs/react";
import { useEffect } from "react";

export default function ProductDetailsPage() {
  const { props } = usePage();

  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <div>ProductDetailsPage</div>
  )
}
