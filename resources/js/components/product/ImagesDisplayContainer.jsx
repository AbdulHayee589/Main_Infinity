import clsx from "clsx";

export default function ImagesDisplayContainer({
  images,
  className,
  ...restProps
}) {
  return (
    <div className={clsx("", className)} {...restProps}>
      ImagesDisplayContainer
    </div>
  );
}
