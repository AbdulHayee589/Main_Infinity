import { useEffect, useState } from "react";
import Button from "../ui/Button";
import colorsJson from "../../colors.json";

const ProductProvider = ({ provider = null }) => {
  const [printAreas, setPrintAreas] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);

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
    <div className="bg-gray-50 border border-gray-200">
      <div className="flex justify-end gap-4 items-center py-3 px-6 border-b border-gray-200">
        <Button size="sm" variant="outlined">
          More details
        </Button>
        <Button size="sm">Start designing</Button>
      </div>

      <div className="py-4 px-6 flex flex-wrap items-start gap-x-4">
        <div className="grow grid gap-2">
          <span className="text-sm text-slate-500">Location</span>

          <div className="flex flex-wrap gap-2 max-w-[110px]">
            <img
              src="https://hatscripts.github.io/circle-flags/flags/br.svg"
              width="24"
            />
          </div>
        </div>
        <div className="grow grid gap-2 max-w-[140px]">
          <span className="text-sm text-slate-500">Price</span>
          <span>From USD 999.33</span>
        </div>
        <div className="grow grid gap-2">
          <span className="text-sm text-slate-500">Shipping</span>
          <span>Standard from USD 4.75</span>
        </div>
        <div className="grow grid gap-2">
          <span className="text-sm text-slate-500">
            Avg. prod. time
          </span>
          <span>2.13 business days</span>
        </div>
        <div className="grow grid gap-2 max-w-[200px]">
          <span className="text-sm text-slate-500">
            Print areas • {printAreas.length}
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
            Sizes • {sizes.length}
          </span>
          <span>
            {sizes[0]} - {sizes[sizes.length - 1]}
          </span>
        </div>
        {colors && (
          <div className="grow grid gap-2 min-w-[200px] max-w-[200px]">
            <span className="text-sm text-slate-500">
              Colors • {colors.length}
            </span>
            <div className="flex justify-start flex-wrap gap-2">
              {colors.map((color) => (
                <div
                  key={color}
                  className="w-4 h-4 rounded-full border border-gray-200"
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
