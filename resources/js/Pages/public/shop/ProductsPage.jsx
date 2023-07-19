import { router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import FilterSideBar from "../../../components/sidebar/FilterSideBar";
import useOpenState from "../../../components/hooks/useOpenState";
import Pagination from "../../../components/Pagination";
import ProductShowcase from "../../../components/ProductShowcase";
import Filters from "../../../components/Filters";
import Container from "../../../components/ui/Container";
import SearchField from "../../../components/SearchField";
import Dropdown from "../../../components/ui/Dropdown";
import { Menu } from "@headlessui/react";
import { HiCheck, HiFunnel } from "react-icons/hi2";
import { v4 as uuidv4 } from "uuid";
import clsx from "clsx";

const sortBy = [
  { id: uuidv4(), sortId: 0, name: "Popularity" },
  { id: uuidv4(), sortId: 1, name: "Latest" },
  { id: uuidv4(), sortId: 2, name: "Lowest price" },
  { id: uuidv4(), sortId: 3, name: "Highest price" },
];

export default function ProductsPage() {
  const [activeSort, setActiveSort] = useState(sortBy[0]);
  const { open, setOpen, toggleOpen } = useOpenState(false);
  const { props } = usePage();

  const toggleFiltersSideBar = () => toggleOpen();
  const closeFiltersSideBar = () => setOpen(false);

  const handleSort = (sortId) => {
    setActiveSort(sortBy[sortId]);
  };

  const handleSearch = (searchValue) => {
    console.log(searchValue);

    router.reload({
      method: "get",
      data: { search: searchValue },
      only: ["blueprints"],
      preserveState: true,
    });
  };

  const handleFilters = (filters) => {
    router.reload({
      method: "post",
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

      <Container className="flex flex-col gap-8 py-6">

        <div className="flex items-center justify-between gap-2 w-full">
          <button className="lg:hidden p-1 outline-none text-2xl text-gray-500" onClick={toggleFiltersSideBar}><HiFunnel/></button>
          <SearchField className="grow" handleSearch={handleSearch} />
        </div>

        <div className="">
          <div className="flex gap-2"></div>

          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold text-2xl truncate ...">
                Hoodies
              </h1>
              <div className="flex items-center gap-2">
                <span className="min-w-fit text-sm">Sort by</span>
                <Dropdown title={activeSort.name}>
                  {sortBy.map(({ id, sortId, name }) => (
                    <Menu.Item key={id}>
                      <button
                        className="hover:bg-gray-100 w-full flex items-center justify-start gap-2 p-2"
                        onClick={(e) => {
                          handleSort(sortId);
                        }}
                      >
                        <HiCheck className={clsx("text-2xl text-gold-main", activeSort.sortId ===
                          sortId ? "opacity-100" : "opacity-0")} />
                        {name}
                      </button>
                    </Menu.Item>
                  ))}
                </Dropdown>
              </div>
            </div>

            <p className="text-sm text-gray-500">
              Hoodies are in-demand all year round without any
              sign of dropping in popularity. Choose between
              various styles, like pullover, zip-up, or cropped,
              and sell them worldwide.
            </p>
          </div>
        </div>

        <div className="flex items-start justify-between gap-10">
          <div className="hidden lg:block col-span-1 min-h-full max-h-[400px] w-full max-w-[320px]">
            <Filters
              filters={props.filters}
              handleFilterSearch={handleFilters}
            />
          </div>

          <div className="w-full flex flex-col gap-8">
            {props?.blueprints.data && (
              <>
                <div className="w-full grid items-start grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
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
      </Container>
    </>
  );
}
