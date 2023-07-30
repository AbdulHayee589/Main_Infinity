import clsx from "clsx";

const Skeleton = ({ className, rounded = "lg", ...restProps }) => {
  return (
    <div
      className={clsx(
        `animate-pulse rounded-${rounded} bg-gray-200`,
        className
      )}
      {...restProps}
    ></div>
  );
};
export default Skeleton;
