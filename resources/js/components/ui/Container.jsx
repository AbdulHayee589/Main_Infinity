import clsx from "clsx";

const Container = ({ className, children, ...restProps }) => {
  return (
    <div
      className={clsx("container max-w-[1200px]", className)}
      {...restProps}
    >
      {children}
    </div>
  );
};
export default Container;
