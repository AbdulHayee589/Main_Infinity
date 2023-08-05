import clsx from "clsx";

const Skeleton = ({ className, rounded = "lg", ...restProps }) => {
  return (
    <div
      className={clsx(
        `animate-pulse rounded-${rounded} bg-slate-200`,
        className
      )}
      {...restProps}
    ></div>
  );
};
export default Skeleton;
