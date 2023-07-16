import { usePage } from "@inertiajs/react";

export default function CartPage() {
  const { props } = usePage();

  return (
    <div>
      <pre>{JSON.stringify(props, null, 4)}</pre>
    </div>
  );
}
