import SideBar from "../ui/SideBar";
import Filters from "../Filters";

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
      {...restProps}
    >
      <Filters
        filters={filters}
        handleFilterSearch={handleFilterSearch}
      />
    </SideBar>
  );
}
