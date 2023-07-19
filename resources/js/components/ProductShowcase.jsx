import { Link } from "@inertiajs/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import clsx from "clsx";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useState } from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";

export default function ProductShowcase({ product, className, ...restProps }) {
  const [isFav, setIsFav] = useState(false);

  const onFavBtnClick = () => setIsFav(!isFav);

  return (
    <div
      key={product.bp_id}
      className={clsx(
        "relative group grid gap-2 w-full h-full sm:max-w-[320px] lg:max-w-[200px] xl:max-w-[256px] rounded-md overflow-hidden",
        className
      )}
      {...restProps}
    >
      <button
        onClick={onFavBtnClick}
        className={clsx(
          "hidden group-hover:grid absolute top-2 right-2 z-10 text-xl items-center p-1.5 bg-white shadow-md rounded-md transition-all",
          isFav ? "text-error-main" : "text-gray-300"
        )}
      >
        {isFav ? <HiHeart /> : <HiOutlineHeart />}
      </button>

      <Link href={`/shop/products/${product.id}`} className="group">
        <div className="relative overflow-hidden h-[256px] xxs:h-[325px] xs:h-[350px] sm:h-[280px] md:h-[210px] lg:h-[190px] xl:h-[256px]">
          {product.images.length > 1 ? (
            <>
              <LazyLoadImage
                src={product.images[0]}
                alt={product.images[0]}
                width={256}
                height={256}
                className="absolute top-0 left-0 z-0 transition-all duration-300 group-hover:scale-[120%] w-full"
              />
              <LazyLoadImage
                src={product.images[1]}
                alt={product.images[1]}
                width={256}
                height={256}
                className="absolute top-0 left-0 z-0 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-[120%] w-full"
              />
            </>
          ) : (
            <LazyLoadImage
              src={product.images[0]}
              alt={product.images[0]}
              width={256}
              height={256}
              className="absolute top-0 left-0 transition-all duration-300 group-hover:scale-[120%] w-full"
            />
          )}
        </div>

        <div className="w-full px-4 py-2 text-sm sm:text-base group-hover:bg-[#f7f6f6]">
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
}
