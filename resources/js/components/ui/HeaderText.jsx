import clsx from "clsx";

const HeaderText = ({ children, className, ...restProps }) => {
  return (
    <h1
      className={clsx("text-xl md:text-2xl font-bold mb-4", className)}
      {...restProps}
    >
      {children}
    </h1>
  );
};
export default HeaderText;
