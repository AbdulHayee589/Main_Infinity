import SideBar from "../ui/SideBar";
import Filters from "../product/Filters";

export default function FilterSideBar({
  filters,
  open,
  onClose,
  handleFilterSearch,
  ...restProps
}) {
  return (
    <SideBar
      headerComponent={<h1 className="font-semibold text-xl">Filters</h1>}
      open={open}
      onClose={onClose}
      showFrom="left"
      className="p-4"
      {...restProps}
    >
      <Filters
        filters={filters}
        handleFilterSearch={handleFilterSearch}
      />
    </SideBar>
  );
}
