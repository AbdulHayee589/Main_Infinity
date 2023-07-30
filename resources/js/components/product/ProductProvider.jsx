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
  }, []);

  return (
    <div className="bg-gray-50 border border-gray-200">
      <div className="flex items-center justify-between py-3 px-6 border-b border-gray-200">
        <h1 className="text-lg font-bold max-w-[340px] truncate ... ">
          {provider.title}
        </h1>
        <div className="flex gap-4">
          <Button variant="outline">More details</Button>
          <Button>Start designing</Button>
        </div>
      </div>

      <div className="py-4 px-6 flex flex-wrap items-start gap-x-2">
        <div className="grow grid gap-2">
          <span className="text-sm text-gray-500">Location</span>
          <img
            src="https://hatscripts.github.io/circle-flags/flags/br.svg"
            width="24"
          />
        </div>
        <div className="grow grid gap-2">
          <span className="text-sm text-gray-500">Price</span>
          <div className="grid text-sm max-w-[110px]">
            <span>From USD 9.33</span>
            <span className="text-sm text-gray-500">
              From USD 7.46 with Printify Premium
            </span>
          </div>
        </div>
        <div className="grow grid gap-2">
          <span className="text-sm text-gray-500">Shipping</span>
          <span>Standard from USD 4.75</span>
        </div>
        <div className="grow grid gap-2">
          <span className="text-sm text-gray-500">
            Avg. prod. time
          </span>
          <span>2.13 business days</span>
        </div>
        <div className="grow grid gap-2">
          <span className="text-sm text-gray-500">
            Print areas • {printAreas.length}
          </span>
          <div className="grid">
            {[...printAreas]?.map((print) => (
              <span key={print} className="capitalize">
                {print} side
              </span>
            ))}
          </div>
        </div>
        <div className="grow grid gap-2">
          <span className="text-sm text-gray-500">
            Sizes • {sizes.length}
          </span>
          <span>
            {sizes[0]} - {sizes[sizes.length - 1]}
          </span>
        </div>
        <div className="grow grid gap-2 min-w-[200px] max-w-[200px]">
          <span className="text-sm text-gray-500">Colors</span>
          <div className="flex justify-start flex-wrap gap-2">
            {colors.map((color) => (
              <div
                key={color}
                className="w-4 h-4 rounded-full border border-gray-200"
                style={{ backgroundColor: colorsJson[color] }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductProvider;
