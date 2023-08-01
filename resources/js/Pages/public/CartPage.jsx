import { usePage } from "@inertiajs/react";

const CartPage = () => {
  const { props } = usePage();

  return (
    <div>
      <pre>{JSON.stringify(props, null, 4)}</pre>
    </div>
  );
};
export default CartPage;
