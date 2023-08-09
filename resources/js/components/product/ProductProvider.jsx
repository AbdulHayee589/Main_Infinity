import { useEffect, useState } from "react";
import Button from "../ui/Button";
import colorsJson from "../../utils/colors.json";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useTranslation } from "react-i18next";

const ProductProvider = ({
  onMoreDetailsClickHandler,
  provider = null,
}) => {
  const { t } = useTranslation();
  const [printAreas, setPrintAreas] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);

  const onClickHandler = (provider) =>
    onMoreDetailsClickHandler({ provider, sizes, colors });

  useEffect(() => {
    setTimeout(() => {
      let pa = new Set();
      let sz = new Set();
      let col = new Set();

      provider?.variants?.variants
        ?.map((el) => ({
          placeholders: el.placeholders.map((e) => e.position),
          size: el.options.size,
          color: el.options.color,
        }))
        ?.forEach((el) => {
          el?.placeholders.forEach((e) =>
            pa.add(e.replace("_", " "))
          );
          sz.add(el?.size);
          col.add(el?.color);
        });

      setPrintAreas([...pa]);
      setSizes([...sz]);
      setColors([...col]);
    }, 100);
  }, [provider]);

  return (
    <div className="flex flex-col-reverse lg:flex-col bg-slate-50 rounded-md border border-slate-200">
      <div className="flex flex-col lg:flex-row justify-end gap-2 items-center py-3 px-4 md:px-6 lg:border-b border-slate-200">
        <Button
          onClick={() => onClickHandler(provider)}
          variant="outlined"
          className="w-full lg:w-fit"
        >
          {t("productDetailsPage.providers.moreDetailsBtn")}
        </Button>
        <Button className="break-words w-full lg:w-fit">
          {t("productDetailsPage.providers.startDesigningBtn")}
        </Button>
      </div>

      <div className="py-4 px-4 md:px-6 flex flex-col lg:flex-row items-start gap-4">
        <div className="grow grid gap-2">
          <span className="text-sm text-slate-500">
            {t("productDetailsPage.providers.table.location")}
          </span>

          <div className="flex flex-wrap gap-2 lg:max-w-[110px]">
            <LazyLoadImage
              src="https://hatscripts.github.io/circle-flags/flags/bg.svg"
              width="24"
              effect="blur"
            />
          </div>
        </div>
        <div className="grow grid gap-2 lg:max-w-[140px]">
          <span className="text-sm text-slate-500">
            {t("productDetailsPage.providers.table.price")}
          </span>
          <span>
            {provider.price} {t("priceSymbol")}
          </span>
        </div>
        <div className="grow grid gap-2">
          <span className="text-sm text-slate-500">
            {t("productDetailsPage.providers.table.shipping")}
          </span>
          <span>
            4.75 {provider.price} {t("priceSymbol")}
          </span>
        </div>
        <div className="grow grid gap-2">
          <span className="text-sm text-slate-500">
            {t(
              "productDetailsPage.providers.table.avgProdTime.title"
            )}
          </span>
          <span>
            2.13{" "}
            {t(
              "productDetailsPage.providers.table.avgProdTime.text"
            )}
          </span>
        </div>
        <div className="grow grid gap-2 lg:max-w-[200px]">
          <span className="text-sm text-slate-500">
            {t("productDetailsPage.providers.table.printAreas")} •{" "}
            {printAreas.length}
          </span>
          <div className="grid">
            <span key={print} className="">
              {printAreas
                .map(
                  (str) =>
                    `${str.charAt(0).toUpperCase() +
                    str.slice(1)
                    } side`
                )
                .join(", ")}
            </span>
          </div>
        </div>
        <div className="grow grid gap-2">
          <span className="text-sm text-slate-500">
            {t("productDetailsPage.providers.table.sizes")} •{" "}
            {sizes.length}
          </span>
          <span>
            {sizes[0]} - {sizes[sizes.length - 1]}
          </span>
        </div>
        {colors && (
          <div className="grow grid gap-2 lg:w-full lg:max-w-[200px]">
            <span className="text-sm text-slate-500">
              {t("productDetailsPage.providers.table.colors")} •{" "}
              {colors.length}
            </span>
            <div className="flex justify-start flex-wrap gap-2">
              {colors.map((color) => (
                <div
                  key={color}
                  className="w-4 h-4 rounded-full border border-slate-200"
                  style={{
                    backgroundColor: colorsJson[color],
                  }}
                ></div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProductProvider;
