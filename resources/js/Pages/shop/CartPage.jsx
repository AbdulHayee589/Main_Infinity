import { usePage } from "@inertiajs/react";
import { useContext } from "react";
import { CartContext } from "../../Wrapper";
import CartForm from "../../components/forms/CartForm";
import { BsTrashFill } from "react-icons/bs";

const CartPage = () => {
  const { props } = usePage();
  const { cart, setCart } = useContext(CartContext);

  const removeFromCart = (id) => {
    setCart(cart.filter((p) => p.id != id));
  };

  const addQuantity = (id) => {
    const obj = cart.find((p) => p.id === id);
    console.log(obj);
    setCart([...cart.filter((p) => p.id != id), {...obj, quantity: obj.quantity + 1 }]);
  };

  const removeQuantity = (id) => {
    const obj = cart.find((p) => p.id === id);
    console.log(obj);

    if(obj.quantity - 1 <= 0)
      removeFromCart(id);
    else
      setCart([...cart.filter((p) => p.id != id), {...obj, quantity: obj.quantity - 1}]);
  };

  return (
    <div>
      {cart.map((product) => (
        <div key={product.id}>
          {product.title}<button onClick={() => removeFromCart(product.id)}><BsTrashFill/></button>
          <div className="flex gap-4 items-center">
            <button onClick={() => removeQuantity(product.id)}>
              -
            </button>
            {product.quantity}
            <button onClick={() => addQuantity(product.id)}>
              +
            </button>
          </div>
        </div>
      ))}

      <CartForm />
    </div>
  );
};
export default CartPage;
