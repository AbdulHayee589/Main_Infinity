import { useEffect } from "react";
import ProductProvider from "./ProductProvider";

const ProductProvidersListing = ({
  onMoreDetailsClickHandler = () => { },
  providers = [],
}) => {
  useEffect(() => {
    try {
      providers.forEach((el) => (el.variants = JSON.parse(el.variants)));
    } catch (err) { }
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Available print providers</h1>
      <div className="grid gap-6">
        {providers.map((provider) => (
          <ProductProvider
            key={provider.id}
            provider={provider}
            onMoreDetailsClickHandler={onMoreDetailsClickHandler}
          />
        ))}
      </div>
    </div>
  );
};
export default ProductProvidersListing;
