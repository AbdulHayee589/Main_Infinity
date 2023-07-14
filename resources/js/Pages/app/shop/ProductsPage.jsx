import { router, usePage, useRemember } from "@inertiajs/react";
import { useEffect } from "react";
import FilterSideBar from "../../../components/sidebar/FilterSideBar";
import { FaFilter } from "react-icons/fa";
import useOpenState from "../../../components/hooks/useOpenState";
import Pagination from "../../../components/Pagination";
import ProductShowcase from "../../../components/ProductShowcase";
import Filters from "../../../components/Filters";
import Container from "../../../components/ui/Container";

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

      <Container className="py-8 flex items-start justify-between gap-8">
        <div className="hidden lg:block border border-blue-500 col-span-1 min-h-full max-h-[400px] w-full max-w-[320px]">
          <Filters filters={props.filters} handleFilterSearch={handleFilters} />
        </div>

        <div className="w-full flex flex-col gap-8 border border-red-500">

          {props?.blueprints.data && (
            <>
              <div className="w-full grid items-start grid-cols-1 md:grid-cols-3 gap-8">
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
      </Container>
    </>
  );
}
