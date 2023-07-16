import { useEffect, useRef, useState } from "react";
import { HiMagnifyingGlass, HiXMark } from "react-icons/hi2";
import useDebounce from "./hooks/useDebounce";
import clsx from "clsx";

export default function SearchField({ handleSearch, className, ...restProps }) {
  const searchFieldRef = useRef(null);
  const [focus, setFocus] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [prevSearchValue, setPrevSearchValue] = useState(null);
  const debounceState = useDebounce(searchValue, 500);

  const onFocusHandler = () => setFocus(true);
  const onBlurHandler = () => setFocus(false);
  const onMouseDownHandler = () => setSearchValue("");
  const onChangeHandler = (e) => {
    setPrevSearchValue(searchValue);
    setSearchValue(e.target.value); 
  }
  const onContainerClickHandler = () => searchFieldRef.current.focus();

  useEffect(() => {
    if(searchValue === prevSearchValue)
      return;
      
    handleSearch(searchValue);
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
      />

      {focus && (
        <HiXMark
          className="text-2xl text-gray-500 min-w-fit"
          onMouseDown={onMouseDownHandler}
        />
      )}
    </div>
  );
}
