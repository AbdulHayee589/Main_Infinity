import { usePage } from "@inertiajs/react";
import { useState } from "react";
import FilterSideBar from "../../components/sidebar/FilterSideBar";
import useOpenState from "../../components/hooks/useOpenState";
import Container from "../../components/ui/Container";
import ProductFilters from "../../components/product/ProductFilters";
import ProductsSearchField from "../../components/product/ProductsSearchField";
import Dropdown from "../../components/ui/Dropdown";
import { Menu } from "@headlessui/react";
import { HiCheck, HiFunnel } from "react-icons/hi2";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import clsx from "clsx";
import ProductShowcasesListing from "../../components/product/ProductShowcasesListing";

const ProductsPage = () => {
  const { t } = useTranslation();
  const [activeSortIndex, setActiveSortIndex] = useState(0);
  const { open, setOpen, toggleOpen } = useOpenState(false);
  const { props } = usePage();

  const toggleFiltersSideBar = () => toggleOpen();
  const closeFiltersSideBar = () => setOpen(false);

  const handleSort = (sortIndex) => {
    setActiveSortIndex(sortIndex);
  };

  return (
    <>
      <FilterSideBar
        filters={props.filters}
        open={open}
        onClose={closeFiltersSideBar}
      />

      <Container className="flex flex-col gap-8 py-12">
        <div className="flex items-center justify-between gap-2 w-full">
          <button
            className="lg:hidden p-2 outline-none text-2xl text-slate-500"
            onClick={toggleFiltersSideBar}
          >
            <HiFunnel />
          </button>
          <ProductsSearchField className="grow" />
        </div>

        <div className="">
          <div className="flex gap-2"></div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-y-4 sm:flex-row justify-between sm:items-center">
              <h1 className="font-semibold text-3xl truncate ...">
                Hoodies
              </h1>
              <div className="flex items-center gap-2">
                <span className="min-w-fit">
                  {t("productsPage.sortBy.title")}
                </span>
                <Dropdown
                  menuBtnClassName="px-4 py-2"
                  title={
                    t("productsPage.sortBy.options", {
                      returnObjects: true,
                    })[activeSortIndex]
                  }
                >
                  {t("productsPage.sortBy.options", {
                    returnObjects: true,
                  }).map((sortBy, index) => (
                    <Menu.Item key={uuidv4()}>
                      <button
                        className="hover:bg-slate-100 w-full flex items-center justify-start gap-2 p-2"
                        onClick={(e) => {
                          handleSort(index);
                        }}
                      >
                        <HiCheck
                          className={clsx(
                            "text-2xl text-gold-main",
                            activeSortIndex ===
                              index
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {sortBy}
                      </button>
                    </Menu.Item>
                  ))}
                </Dropdown>
              </div>
            </div>

            <p className="text-base text-slate-500">
              Hoodies are in-demand all year round without any
              sign of dropping in popularity. Choose between
              various styles, like pullover, zip-up, or cropped,
              and sell them worldwide.
            </p>
          </div>
        </div>

        <div className="flex items-start justify-between">
          <div className="hidden lg:block w-full max-w-[320px]">
            <ProductFilters filters={props.filters} />
          </div>

          <ProductShowcasesListing
            products={props?.blueprints}
          />
        </div>
      </Container>
    </>
  );
};
export default ProductsPage;
