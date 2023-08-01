import { useEffect, useRef, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { router } from "@inertiajs/react";
import { HiMagnifyingGlass, HiXMark } from "react-icons/hi2";
import clsx from "clsx";

const SearchField = ({ value = null, className, ...restProps }) => {
  const searchFieldRef = useRef(null);
  const [focus, setFocus] = useState(false);
  const [searchValue, setSearchValue] = useState(value || "");
  const [prevSearchValue, setPrevSearchValue] = useState(null);
  const debounceState = useDebounce(searchValue, 250);

  const onContainerClickHandler = () => searchFieldRef.current.focus();
  const onFocusHandler = () => setFocus(true);
  const onBlurHandler = () => setFocus(false);
  const onMouseDownHandler = () => setSearchValue("");
  const onChangeHandler = (e) => {
    setPrevSearchValue(searchValue);
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    if (searchValue === prevSearchValue) return;

    router.reload({
      method: "get",
      data: { search: searchValue },
      only: ["blueprints"],
      preserveState: true,
    });
  }, [debounceState]);

  return (
    <div
      onClick={onContainerClickHandler}
      onFocus={onFocusHandler}
      onBlur={onBlurHandler}
      className={clsx(
        "cursor-pointer w-full group px-4 py-3 rounded-full transition-all flex items-center gap-3 border border-gray-300 bg-gray-100 focus-within:border-blue-500 group-hover:bg-white focus-within:bg-white",
        className
      )}
    >
      <HiMagnifyingGlass className="text-2xl text-gray-500 min-w-fit" />
      <input
        onChange={onChangeHandler}
        ref={searchFieldRef}
        value={searchValue}
        className="w-[135px] xxs:grow bg-transparent outline-none"
        type="text"
        name="searchValue"
        id="searchValue"
        placeholder="Search for products, brands, categories, and print providers"
        {...restProps}
      />

      {focus && (
        <HiXMark
          className="text-2xl text-gray-500 min-w-fit"
          onMouseDown={onMouseDownHandler}
        />
      )}
    </div>
  );
};
export default SearchField;
