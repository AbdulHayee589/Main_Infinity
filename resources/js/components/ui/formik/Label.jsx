import clsx from "clsx";

const Label = ({
  label = "",
  sublabel = "",
  className,
  ignoreResponsiveStyle = false,
  ...restProps
}) => {
  return (
    <div className={clsx("min-w-fit pb-2", className)} {...restProps}>
      {label && (
        <label
          className={clsx(
            "min-w-fit font-semibold",
            ignoreResponsiveStyle
              ? "text-sm sm:text-base"
              : "text-sm"
          )}
        >
          {label}
        </label>
      )}

      {sublabel && (
        <label
          className={clsx(
            "min-w-fit text-slate-500",
            ignoreResponsiveStyle
              ? "text-sm sm:text-base"
              : "text-sm"
          )}
        >
          {sublabel}
        </label>
      )}
    </div>
  );
};
export default Label;
