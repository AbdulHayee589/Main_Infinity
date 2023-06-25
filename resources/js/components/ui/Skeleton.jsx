import clsx from "clsx";

export default function Skeleton({ className, rounded = "lg", ...restProps }) {
  return (
    <div
      className={clsx(`animate-pulse rounded-${rounded} bg-gray-200`, className)}
      {...restProps}
    ></div>
  );
}