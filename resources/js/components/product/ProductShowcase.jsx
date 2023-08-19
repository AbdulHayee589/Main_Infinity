import { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import { LazyLoadImage } from "react-lazy-load-image-component";
import StarRating from "../StarRating";
import clsx from "clsx";

const ProductShowcase = ({ product, className, ...restProps }) => {
  const [isFav, setIsFav] = useState(false);

  const onFavBtnClick = () => {
    const favProducts = JSON.parse(
      localStorage.getItem("fav-products") || "[]"
    );
    const newState = !isFav;

    if (newState) {
      if (favProducts.find((p) => p.id === product.id)) return;

      localStorage.setItem(
        "fav-products",
        JSON.stringify([...favProducts, product])
      );
    } else {
      localStorage.setItem(
        "fav-products",
        JSON.stringify(favProducts.filter((p) => p.id != product.id))
      );
    }

    setIsFav(newState);
  };

  useEffect(() => {
    const favProducts = JSON.parse(
      localStorage.getItem("fav-products") || "[]"
    );
    if (favProducts.find((p) => p.id === product.id)) setIsFav(true);
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
      <button
        onClick={onFavBtnClick}
        className={clsx(
          "rounded-full absolute top-2 right-2 z-10 text-2xl p-2 bg-white shadow-md transition-all",
          isFav
            ? "text-error-main"
            : "text-slate-300 lg:hidden lg:group-hover:block"
        )}
      >
        {isFav ? <HiHeart /> : <HiOutlineHeart />}
      </button>

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
