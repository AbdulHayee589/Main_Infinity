import { useEffect } from "react";
import ProductProvider from "./ProductProvider";
import { useTranslation } from "react-i18next";

const ProductProvidersListing = ({
  onMoreDetailsClickHandler,
  providers = [],
}) => {
  const { t } = useTranslation();
  
  useEffect(() => {
    try {
      providers.forEach((el) => (el.variants = JSON.parse(el.variants)));
    } catch (err) { }
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{t("productDetailsPage.providers.title")}</h1>
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
