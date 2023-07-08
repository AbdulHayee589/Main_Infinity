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
        "relative group grid gap-2 w-full h-fit max-w-[120px] xs:max-w-[160px] lg:max-w-[170px] xl:max-w-[200px] rounded-lg overflow-hidden",
        className
      )}
      {...restProps}
    >
      <button
        onClick={onFavBtnClick}
        className={clsx(
          "absolute top-2 right-2 z-10 text-xl grid items-center p-1.5 bg-white shadow-md rounded-lg",
          isFav ? "text-error-main" : "text-gray-300"
        )}
      >
        {isFav ? <FaHeart /> : <FaRegHeart />}
      </button>

      <Link href={`/shop/products/${product.id}`}>
        <div className="relative w-[120px] xs:w-[160px] lg:w-[170px] xl:w-[200px] h-[120px] xs:h-[160px] lg:h-[170px] xl:h-[200px] overflow-hidden">
          {product.images.length > 1 ? (
            <>
              <LazyLoadImage
                src={product.images[0]}
                alt={product.images[0]}
                width={220}
                height={220}
                className="absolute top-0 left-0 bottom-0 right-0 transition-all group-hover:opacity-0 group-hover:-z-10 group-hover:scale-110"
              />
              <LazyLoadImage
                src={product.images[1]}
                alt={product.images[1]}
                width={220}
                height={220}
                className="absolute top-0 left-0 bottom-0 right-0 transition-all -z-10 group-hover:opacity-1 group-hover:z-0 group-hover:scale-110"
              />
            </>
          ) : (
            <LazyLoadImage
              src={product.images[0]}
              alt={product.images[0]}
              width={220}
              height={220}
              className="absolute top-0 left-0 bottom-0 right-0 transition-all group-hover:scale-110"
            />
          )}
        </div>

        <div className="grid gap-1 w-full px-4 py-2 text-sm sm:text-base group-hover:bg-[#f7f6f6]">
          <div>
            <p title={product.title} className="w-full break-words">
              {product.title}
            </p>
            <span className="w-full break-words text-sm text-gray-400">
              By {product.brand}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
