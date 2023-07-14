import { Link } from "@inertiajs/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import clsx from "clsx";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useState } from "react";

export default function ProductShowcase({ product, className, ...restProps }) {
  const [isFav, setIsFav] = useState(false);

  const onFavBtnClick = () => setIsFav(!isFav);

  return (
    <div
      key={product.bp_id}
      className={clsx(
        "relative grid gap-2 w-full h-full sm:max-w-[320px] lg:max-w-[200px] xl:max-w-[256px] rounded-sm overflow-hidden",
        className
      )}
      {...restProps}
    >
      <button
        onClick={onFavBtnClick}
        className={clsx(
          "absolute top-2 right-2 z-10 text-xl grid items-center p-1.5 bg-white shadow-md rounded-sm",
          isFav ? "text-error-main" : "text-gray-300"
        )}
      >
        {isFav ? <FaHeart /> : <FaRegHeart />}
      </button>

      <Link href={`/shop/products/${product.id}`} className="group">
        <div className="relative overflow-hidden h-[256px] lg:h-[200px] xl:h-[256px]">
          {product.images.length > 1 ? (
            <>
              <LazyLoadImage
                src={product.images[0]}
                alt={product.images[0]}
                width={256}
                height={256}
                className="absolute top-0 left-0 z-0 transition-all duration-300 group-hover:scale-110 w-full"
              />
              <LazyLoadImage
                src={product.images[1]}
                alt={product.images[1]}
                width={256}
                height={256}
                className="absolute top-0 left-0 z-0 opacity-0 transition-all  duration-300 group-hover:opacity-100 group-hover:scale-110 w-full"
              />
            </>
          ) : (
            <LazyLoadImage
              src={product.images[0]}
              alt={product.images[0]}
              width={256}
              height={256}
              className="absolute top-0 left-0 transition-all group-hover:scale-110 w-full"
            />
          )}
        </div>

        <div className="grid gap-2 w-full px-4 py-2 text-sm sm:text-base group-hover:bg-[#f7f6f6]">
          <div>
            <p title={product.title} className="w-full break-words">
              {product.title}
            </p>
            <span className="w-full break-words text-sm text-gray-500">
              By {product.brand}
            </span>
          </div>

          <div>
            <p className="w-full break-words">From USD 8.85</p>
            <p className="w-full break-words text-sm text-gold-main">
              From USD 8.97 with Printify Premium
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
