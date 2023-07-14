import clsx from "clsx";

export default function Container({ className, children, ...restProps }) {
  return (
    <div className={clsx("container max-w-screen-xl", className)} {...restProps}>
      {children}
    </div>
  );
}
