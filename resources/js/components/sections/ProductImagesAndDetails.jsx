import ProductImagesContainer from "../product/ProductImagesContainer";
import ProductInformation from "../product/ProductInformation";

const ProductImagesAndDetails = ({ product = null }) => {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-y-6 gap-x-24">
      <ProductImagesContainer images={product.images} />
      <ProductInformation product={product} />
    </div>
  );
};
export default ProductImagesAndDetails;
