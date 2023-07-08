import { usePage, router } from "@inertiajs/react";
import { useEffect } from "react";
import FilterSideBar from "../../../components/sidebar/FilterSideBar";
import { FaFilter } from "react-icons/fa";
import useOpenState from "../../../components/hooks/useOpenState";
import Pagination from "../../../components/Pagination";
import ProductShowcase from "../../../components/ProductShowcase";

export default function ProductsPage() {
  const { open, setOpen, toggleOpen } = useOpenState(false);
  const { props, url } = usePage();
  const toggleFiltersSideBar = () => toggleOpen();
  const closeFiltersSideBar = () => setOpen(false);

  const handleSearch = (event) => {
    router.visit(url, {
      data: { з: event.target.value },
      only: ["blueprints"],
      preserveState: true,
    });
  };

  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <>
      <FilterSideBar
        filters={props.filters}
        open={open}
        onClose={closeFiltersSideBar}
      />

      <div className="container py-8 px-6 grid gap-6 grid-cols-2 md:grid-cols-5 lg:grid-cols-5">
        <div className="flex gap-4 justify-between items-center col-span-5">
          <div
            className="lg:hidden text-xl text-gray-400"
            onClick={toggleFiltersSideBar}
          >
            <FaFilter />
          </div>

          <div className="w-full">
            <input
              type="text"
              name="searchQuery"
              id="searchQuery"
              placeholder="Search something..."
              className="w-full border border-gray-200 rounded-lg px-4 py-2"
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="hidden lg:block border border-blue-500 col-span-1 max-h-[400px]">
          Filters
        </div>
        <div className="w-fullcol-span-5 lg:col-span-4">
          {props?.blueprints.data && (
            <>
              <div className="flex justify-center items-start flex-wrap gap-6">
                {props?.blueprints.data.map((blueprint) => (
                  <ProductShowcase key={blueprint.bp_id} product={blueprint} />
                ))}
              </div>
              <Pagination className="my-8" links={props?.blueprints?.links} />
            </>
          )}

        </div>
      </div>
    </>
  );
}
