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
    <SideBar open={open} onClose={onClose} showFrom="left" {...restProps}>
      <Filters filters={filters} handleFilterSearch={handleFilterSearch} />
    </SideBar>
  );
}
