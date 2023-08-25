import { useContext, useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import { LazyLoadImage } from "react-lazy-load-image-component";
import StarRating from "../StarRating";
import clsx from "clsx";
import { CartContext, FavouritesContext } from "../../Wrapper";
import { BsCartPlus, BsCartPlusFill } from "react-icons/bs";

const ProductShowcase = ({ product, className, ...restProps }) => {
  const [isFav, setIsFav] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const { favourites, setFavourites } = useContext(FavouritesContext);
  const { cart, setCart } = useContext(CartContext);

  const onSetFavHandler = () => {
    const newState = !isFav;

    if (newState) {
      if (favourites.find((p) => p.id === product.id)) return;
      setFavourites([...favourites, product]);
    } else setFavourites(favourites.filter((p) => p.id != product.id));

    setIsFav(newState);
  };

  const onAddToCartHandler = () => {
    const newState = !isAddedToCart;

    if (newState) {
      if (cart.find((p) => p.id === product.id)) return;
      setCart([...cart, { ...product, quantity: 1 }]);
    } else setCart(cart.filter((p) => p.id != product.id));

    setIsAddedToCart(newState);
  };

  useEffect(() => {
    setIsFav(!!favourites.find((p) => p.id === product.id));
    setIsAddedToCart(!!cart.find((p) => p.id === product.id));
  }, []);

  return (
    <div
      key={product.id}
      className={clsx(
        "relative group grid gap-2 w-full h-full sm:max-w-[320px] lg:max-w-[200px] xl:max-w-[256px] rounded-md overflow-hidden",
        className
      )}
      {...restProps}
    >
      <div className="absolute grid gap-2 top-2 right-2 z-10 text-2xl">
        <button
          onClick={onSetFavHandler}
          className={clsx(
            "rounded-full p-2 bg-white shadow-md transition-all",
            isFav
              ? "text-error-main"
              : "text-slate-300 lg:hidden lg:group-hover:block"
          )}
        >
          {isFav ? <HiHeart /> : <HiOutlineHeart />}
        </button>
        <button
          onClick={onAddToCartHandler}
          className={clsx(
            "rounded-full p-2 bg-white shadow-md transition-all",
            isAddedToCart
              ? "text-black"
              : "text-slate-300 lg:hidden lg:group-hover:block"
          )}
        >
          {isAddedToCart ? <BsCartPlusFill /> : <BsCartPlus />}
        </button>
      </div>

      <Link href={`/shop/products/${product.id}`} className="group">
        <div className="overflow-hidden w-full h-fit">
          <LazyLoadImage
            src={product.images[0]}
            alt={product.images[0]}
            width={256}
            height={256}
            className="transition-all duration-300 group-hover:scale-[120%] w-full"
          />
        </div>

        <div className="w-full px-4 py-2 text-base group-hover:bg-[#f7f6f6]">
          <StarRating rating={product.rating || 0.0} />
          <p title={product.title} className="w-full break-words">
            {product.title}
          </p>
          <span className="w-full break-words text-sm text-slate-500">
            By {product.brand}
          </span>
        </div>
      </Link>
    </div>
  );
};
export default ProductShowcase;
