import clsx from "clsx";

const Label = ({ label = "", sublabel = "", className, ...restProps }) => {
  return (
    <div className={clsx("min-w-fit pb-1", className)} {...restProps}>
      {label && (
        <div className="min-w-fit text-sm font-semibold">{label}</div>
      )}

      {sublabel && (
        <div className="min-w-fit text-sm text-slate-400">
          {sublabel}
        </div>
      )}
    </div>
  );
};
export default Label;
