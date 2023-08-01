import { useState } from "react";
import { Link } from "@inertiajs/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import clsx from "clsx";

const ProductShowcase = ({ product, className, ...restProps }) => {
  const [isFav, setIsFav] = useState(false);
  const onFavBtnClick = () => setIsFav(!isFav);

  return (
    <div
      key={product.bp_id}
      className={clsx(
        "relative group grid gap-2 w-full h-full sm:max-w-[320px] lg:max-w-[200px] xl:max-w-[256px] rounded-sm overflow-hidden",
        className
      )}
      {...restProps}
    >
      <button
        onClick={onFavBtnClick}
        className={clsx(
          "rounded-full absolute top-2 right-2 z-10 text-xl p-1.5 bg-white shadow-md transition-all",
          isFav ? "text-error-main" : "text-gray-300 hidden group-hover:block"
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
          <p title={product.title} className="w-full break-words">
            {product.title}
          </p>
          <span className="w-full break-words text-sm text-gray-500">
            By {product.brand}
          </span>
        </div>
      </Link>
    </div>
  );
};
export default ProductShowcase;
