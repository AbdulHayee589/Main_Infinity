import { Link, usePage, router } from "@inertiajs/react";
import {useEffect, useState} from "react";
import FilterSideBar from "../../../components/sidebar/FilterSideBar";
import { FaFilter } from "react-icons/fa";
import useOpenState from "../../../components/hooks/useOpenState";
import Pagination from "../../../components/Pagination";
import {
  LazyLoadComponent,
  LazyLoadImage,
} from "react-lazy-load-image-component";

export default function ProductsPage() {
  const { open, setOpen, toggleOpen } = useOpenState(false);
  const { props, url} = usePage();
  const toggleFiltersSideBar = () => toggleOpen();
  const closeFiltersSideBar = () => setOpen(false);

  const handleSearch = (event) => {
      router.visit(url,
          {
          data: { search: event.target.value},
          only: ['blueprints'],
          preserveState: true
      })
  };

  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <>
      <FilterSideBar filters={props.filters} open={open} onClose={closeFiltersSideBar} />

      <div className="container py-8 px-6 grid gap-6 grid-cols-2 md:grid-cols-6 lg:grid-cols-6">
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
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="hidden lg:block border border-blue-500 col-span-1 max-h-[400px]">
          Filters
        </div>
        <div className="w-full border border-red-500 col-span-6 lg:col-span-5 min-h-[1000px]">
          <div>SearchBar</div>
          {props?.blueprints.data && (
            <>
              <div className="flex justify-center lg:justify-between items-start flex-wrap gap-6">
                {props?.blueprints.data.map((blueprint) => (
                  <Link
                    href={`/shop/products/${blueprint.id}`}
                    key={blueprint.bp_id}
                    className="group grid gap-2 w-full max-w-[180px] md:max-w-[220px] rounded-lg hover:bg-gray-50 transition-all duration-300"
                  >
                    <div className="w-[220px] h-[220px] relative rounded-lg overflow-hidden">
                      <div className="absolute top-2 left-2 text-sm py-0.5 px-2 rounded-lg border border-yellow-700 bg-yellow-50 text-yellow-700 z-30">Bestseller</div>
                      <LazyLoadImage
                        src={blueprint.images[0]}
                        alt={blueprint.images[0]}
                        width={220}
                        height={220}
                        className="absolute top-0 left-0 bottom-0 right-0 transition-all group-hover:opacity-0 group-hover:-z-10 group-hover:scale-110"
                      />
                      <LazyLoadImage
                        src={blueprint.images[1]}
                        alt={blueprint.images[1]}
                        width={220}
                        height={220}
                        className="absolute top-0 left-0 bottom-0 right-0 transition-all -z-10 group-hover:opacity-1 group-hover:z-10 group-hover:scale-110"
                      />
                    </div>

                    <div className="grid gap-1 w-full px-4 py-2">
                      <div>
                        <p
                          title={blueprint.title}
                          className="w-full break-words"
                        >
                          {blueprint.title}
                        </p>
                        <span className="w-full truncate ... text-sm text-gray-400">
                          By {blueprint.brand}
                        </span>
                      </div>

                      <p>From GBP 16.92</p>
                      <p className="text-green-500 text-sm break-words">
                        From GBP 13.03 with Printify
                        Premium
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <Pagination links={props?.blueprints?.links} />
            </>
          )}
        </div>
      </div>
    </>
  );
}
