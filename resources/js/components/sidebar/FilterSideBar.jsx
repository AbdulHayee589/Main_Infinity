import SideBar from "../ui/SideBar";
import ProductFilters from "../product/ProductFilters";

const FilterSideBar = ({ filters, open, onClose, ...restProps }) => {
  return (
    <SideBar
      headerComponent={<h1 className="font-semibold text-xl">Filters</h1>}
      open={open}
      onClose={onClose}
      showFrom="left"
      headerClassName="px-6 py-4"
      {...restProps}
    >
      <ProductFilters filters={filters} />
    </SideBar>
  );
};
export default FilterSideBar;
