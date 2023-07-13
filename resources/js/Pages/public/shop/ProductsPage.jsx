import { router, usePage, useRemember } from "@inertiajs/react";
import { useEffect } from "react";
import FilterSideBar from "../../../components/sidebar/FilterSideBar";
import { FaFilter } from "react-icons/fa";
import useOpenState from "../../../components/hooks/useOpenState";
import Pagination from "../../../components/Pagination";
import ProductShowcase from "../../../components/ProductShowcase";
import Filters from "../../../components/Filters";

export default function ProductsPage() {
  const { open, setOpen, toggleOpen } = useOpenState(false);
  const { props, url } = usePage();

  const toggleFiltersSideBar = () => toggleOpen();
  const closeFiltersSideBar = () => setOpen(false);

    const handleSearch = (e) => {
        router.visit(url, {
          data: { search: e.target.value },
          only: ["blueprints"],
          preserveState: true,
        });
    };

    const handleFilters = (filters) => {
        console.log("yes")
        router.reload({
            method: 'post',
            data: { filters },
            only: ["blueprints"],
            preserveState: true,
            preserveScroll: true,
            onSuccess() {
                console.log(props.blueprints);
            },
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
        handleFilterSearch={handleFilters}
      />

      <div className="container py-8 flex items-start justify-between gap-8">
        <div className="hidden lg:block border border-blue-500 col-span-1 min-h-full max-h-[400px] w-full max-w-[320px]">
          <Filters filters={props.filters} handleFilterSearch={handleFilters} />
        </div>

        <div className="w-full flex flex-col gap-8">
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

          {props?.blueprints.data && (
            <>
              <div className="flex justify-between items-start flex-wrap gap-6">
                {props?.blueprints.data.map((blueprint) => (
                  <ProductShowcase
                    key={blueprint.bp_id}
                    product={blueprint}
                  />
                ))}
              </div>
              <Pagination
                className="my-8"
                links={props?.blueprints?.links}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
