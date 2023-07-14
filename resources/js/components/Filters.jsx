import clsx from "clsx";
import DisclouseContainer from "./ui/DisclouseContainer";
import { useRemember } from "@inertiajs/react";
import { useEffect } from "react";

export default function Filters({ filters, className, handleFilterSearch, ...restProps }) {
  const [activeFilters, setActiveFilters] = useRemember({}, 'ProductsPage');

  const onFilterClick = (event) => {
    const getPair = event.target.id.split("_");
    const pair = { key: getPair[0], value: getPair[1] };
    let modState = { ...activeFilters };
    console.log(pair);

    if (event.target.checked) {
      if (modState[pair.key]) {
        if(modState[pair.key].indexOf(pair.value) === -1)
          modState[pair.key] = [...modState[pair.key], pair.value];
      }
      else modState[pair.key] = [pair.value];

      setActiveFilters(modState);
    } else {
      if (modState[pair.key]?.length > 1) {
        const elToDelete = modState[pair.key].indexOf(pair.value);

        if (elToDelete !== -1) modState[pair.key].splice(elToDelete, 1);

        setActiveFilters(modState);
      } else {
        delete modState[pair.key];
        setActiveFilters(modState);
      }
    }
  };

  useEffect(() => {
    console.log({ ...activeFilters });
    handleFilterSearch(activeFilters);
  }, [activeFilters]);

  //useEffect(() => setActiveFilters(), []);

  return (
    <div className={clsx("grid gap-2", className)} {...restProps}>
      {Object.keys(filters).map((key) => (
        <DisclouseContainer
          key={key}
          btnClassName="capitalize"
          className="border-b border-b-red-500"
          title={key}
          open={true}
        >
          {filters[key].map((value) => (
            <div
              key={`${key}_${value}`}
              className="flex items-center gap-2"
            >
              <input
                type="checkbox"
                name={`${key}_${value}`}
                id={`${key}_${value}`}
                onClick={onFilterClick}
              />
              <label
                htmlFor={`${key}_${value}`}
                className="capitalize"
              >
                {value}
              </label>
            </div>
          ))}
        </DisclouseContainer>
      ))}
    </div>
  );
}
