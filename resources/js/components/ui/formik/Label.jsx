import clsx from "clsx";

const Label = ({
  label = "",
  sublabel = "",
  className,
  ignoreResponsiveStyle = true,
  ...restProps
}) => {
  return (
    <div className={clsx("min-w-fit pb-1", className)} {...restProps}>
      {label && (
        <div
          className={clsx(
            "min-w-fit font-semibold",
            !ignoreResponsiveStyle
              ? "text-sm sm:text-base"
              : "text-sm"
          )}
        >
          {label}
        </div>
      )}

      {sublabel && (
        <div
          className={clsx(
            "min-w-fit text-slate-400",
            !ignoreResponsiveStyle
              ? "text-sm sm:text-base"
              : "text-sm"
          )}
        >
          {sublabel}
        </div>
      )}
    </div>
  );
};
export default Label;
