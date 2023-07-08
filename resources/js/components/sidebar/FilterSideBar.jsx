import clsx from "clsx";
import { headerNavLinks as navLinks } from "../../statics";
import Brand from "../ui/Brand";
import { FaXmark } from "react-icons/fa6";
import DisclouseContainer from "../ui/DisclouseContainer";
import NavLink from "../ui/NavLink";
import Button from "../ui/Button";
import { useEffect, useState } from "react";

export default function FilterSideBar({
  filters,
  open,
  onClose,
  ...restProps
}) {
  const [aFilters, setAFilters] = useState([]);


  useEffect(() => {
    // //console.log(Object.keys(filters).map(f => ({name: Object.keys(filters[f]), v: filters[f].map(i => i)})));
    // const keys = Object.keys(filters);
    // console.log(keys.map(key => {
    //   const value = filters[key].map(i => i);
    //   return ({ name: key, filters,});
    // }));
    // Object.keys(filters).map(filter => )
  }, []);

  return (
    <div className={clsx("xl:hidden z-50 w-full h-full")} {...restProps}>
      <div
        onClick={onClose}
        className={clsx(
          "z-50 transition-all fixed top-0 right-0 left-0 bottom-0 sm:backdrop-blur-sm sm:bg-black/20",
          open ? "block" : "hidden"
        )}
      ></div>
      <div
        className={clsx(
          "bg-white z-50 fixed top-0 w-full sm:w-1/2 h-full transition-all ease-in-out duration-300",
          open ? "left-0" : "-left-full"
        )}
      >
        <div className="h-[100%] pb-24 overflow-auto">
          <div className="relative px-6 py-4 grid gap-4">
            <div className="flex items-center justify-between">
              <Brand onClick={onClose} />

              <button
                aria-label="Close Menu"
                className="text-2xl w-fit ml-auto text-gray-400 hover:text-gold-main transition-all"
                onClick={onClose}
              >
                <FaXmark />
              </button>
            </div>

            <nav className="grid gap-4">
              {Object.keys(filters).map((key) => (
                <DisclouseContainer btnClassName='capitalize' title={key} open={true}>
                  {filters[key].map((i) => (
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name={`${key}_${i}`}
                        id={`${key}_${i}`}
                      />
                      <label htmlFor={`${key}_${i}`} className="capitalize">
                        {i}
                      </label>

                    </div>
                  ))}
                </DisclouseContainer>
              ))}
            </nav>
          </div>
        </div>

        <div className="absolute bg-white py-4 px-6 left-0 right-0 bottom-0">
          <Button onClick={onClose} fullWidth>
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
