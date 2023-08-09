import ProductImagesContainer from "./ProductImagesContainer";
import StarRating from "../StarRating";
import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

const ProductImagesAndDetails = ({ product = null }) => {
  const { t } = useTranslation();
  const cleanDescription = product?.description
    .substring(product.description.indexOf(".:"))
    .replace(/<[^>]*>/g, "")
    .split(".:")
    .filter((el) => el != "");

  return (
    <div className="flex flex-col lg:flex-row items-center gap-y-6 gap-x-24">
      <ProductImagesContainer images={product?.images} />

      <div className="w-full grid gap-4">
        <div>
          {/* <span className="text-slate-500 text-sm">t-shirt</span> */}
          <h1 className="text-2xl md:text-3xl font-semibold">
            {product?.title}
          </h1>

          <StarRating
            rating={product.rating || 0.0}
            count={product.ratings.length}
            showCount={true}
            showLabel={true}
            className="text-xl"
          />
        </div>

        <Link href="/" className="hover:text-gold-main">
          {product?.brand} {product?.model}
        </Link>

        <div className="grid">
          {cleanDescription.map((el) => (
            <div key={el} className="flex gap-2">
              <span className="h-full">&#x2022;</span>
              <span>{el}</span>
            </div>
          ))}
        </div>

        <Link href="#description" className="text-slate-500" only={[]}>
          {t('productDetailsPage.readMore')}
        </Link>
      </div>
    </div>
  );
};
export default ProductImagesAndDetails;
