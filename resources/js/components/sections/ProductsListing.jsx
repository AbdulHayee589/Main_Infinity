import { LazyLoadImage } from "react-lazy-load-image-component";
import ProductShowcase from "../product/ProductShowcase";

const ProductsListing = ({ products = [] }) => {
  return products.length > 0 ? (
    <div className="max-w-fit ml-auto grid items-start grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((blueprint) => (
        <ProductShowcase key={blueprint.bp_id} product={blueprint} />
      ))}
    </div>
  ) : (
    <div className="w-full min-h-[400px] lg:min-h-[500px] grid justify-center items-center">
      <div>
        <div className="flex items-center justify-center">
          <LazyLoadImage
            src="/no-results.webp"
            width={128}
            height={128}
            alt="no-results.webp"
            effect="blur"
          />
        </div>

        <div className="text-slate-500 font-bold py-6">
          Nothing to be found here...
        </div>
      </div>
    </div>
  );
};
export default ProductsListing;
