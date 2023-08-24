import ProductShowcase from "./ProductShowcase";
import ProductsPagination from "./ProductsPagination";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ProductShowcasesListing = ({ products = [], showPagination = true }) => {
  return products.data.length > 0 ? (
    <div className="w-full flex flex-col gap-8">
      <div className="max-w-fit ml-auto grid items-start grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.data.map((product) => (
          <ProductShowcase key={product.id} product={product} />
        ))}
      </div>
      {!!showPagination && <ProductsPagination pages={products.links} />}
    </div>
  ) : (
    <div className="w-full min-h-[400px] lg:min-h-[500px] grid justify-center items-center">
      <div>
        <div className="flex items-center justify-center">
          <LazyLoadImage
            src="/no-results.webp"
            width={102}
            height={102}
            alt="no-results.webp"
            effect="blur"
          />
        </div>

        <div className="text-slate-500 py-12">
          Nothing to be showned here...
        </div>
      </div>
    </div>
  );
};
export default ProductShowcasesListing;
