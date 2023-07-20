import DisclouseContainer from "./ui/DisclouseContainer";
import { useRemember } from "@inertiajs/react";
import { useEffect } from "react";
import useDebounce from "./hooks/useDebounce";
import clsx from "clsx";

export default function Filters({
  filters,
  className,
  handleFilterSearch,
  ...restProps
}) {
  const [activeFilters, setActiveFilters] = useRemember({}, "ProductsPage");
  const debounceState = useDebounce(activeFilters, 1000);

  const onChangeHandler = (event) => {
    const getPair = event.target.id.split("_");
    const pair = { key: getPair[0], value: getPair[1] };
    let modState = { ...activeFilters };

    if (event.target.checked) {
      if (modState[pair.key]) {
        if (modState[pair.key].indexOf(pair.value) === -1)
          modState[pair.key] = [...modState[pair.key], pair.value];
      } else modState[pair.key] = [pair.value];

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
    handleFilterSearch(activeFilters);
  }, [debounceState]);

  useEffect(() => {
    console.log(activeFilters);
    handleFilterSearch(activeFilters);
  }, []);

  const isFilterChecked = (key, value) =>
    Object.keys(activeFilters).includes(key) &&
    activeFilters[key].includes(value);

  return (
    <div className={clsx("grid", className)} {...restProps}>
      {Object.keys(filters).map((key) => (
        <DisclouseContainer
          key={key}
          boxHoverEffect={true}
          btnClassName="capitalize"
          panelClassName="border-b border-b-gray-200"
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
                onChange={onChangeHandler}
                className="w-5 h-5 outline-none border border-red-500"
                checked={isFilterChecked(key, value)}
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
