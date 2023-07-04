import { usePage } from "@inertiajs/inertia-react"
import { useState } from "react";
import FilterSideBar from "../../../components/sidebar/FilterSideBar";
import { FaFilter } from "react-icons/fa";
import useOpenState from "../../../components/hooks/useOpenState";

export default function ProductsPage() {
  const { open, setOpen, toggleOpen} = useOpenState(false);
  const { props } = usePage();

  const toggleFiltersSideBar = () => toggleOpen();
  const closeFiltersSideBar = () => setOpen(false);

  console.log(props.blueprints);

  return (
    <>
      <FilterSideBar open={open} onClose={closeFiltersSideBar} />

      <div className="container grid gap-6 grid-cols-2 md:grid-cols-6 lg:grid-cols-6 py-8 px-6">
        <div className="flex gap-4 justify-between items-center col-span-6">
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
            />
          </div>
        </div>

        <div className="hidden lg:block border border-blue-500 col-span-1 max-h-[400px]">
          Filters
        </div>
        <div className="w-full border border-red-500 col-span-6 lg:col-span-5 min-h-[1000px]">
          <div>SearchBar</div>
          <div>Listing</div>
        </div>
      </div>
    </>
  );
}