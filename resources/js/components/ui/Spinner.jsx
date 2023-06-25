import clsx from "clsx";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Spinner({ className, ...restProps }) {
  return (
    <AiOutlineLoading3Quarters
      className={clsx("text-xl animate-spin", className)}
      {...restProps}
    />
  );
}
