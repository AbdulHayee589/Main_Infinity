import ProductShowcase from "../product/ProductShowcase";

const ProductsListing = ({ products = [] }) => {
  return (
    <div className="max-w-fit ml-auto grid items-start grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((blueprint) => (
        <ProductShowcase key={blueprint.bp_id} product={blueprint} />
      ))}
    </div>
  );
};
export default ProductsListing;
