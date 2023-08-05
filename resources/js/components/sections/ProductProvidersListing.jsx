import { useEffect } from "react";
import ProductProvider from "../product/ProductProvider";
import HeaderText from "../ui/HeaderText";

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
      <HeaderText>Available print providers</HeaderText>
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
