import clsx from "clsx";

const AccountDetails = ({ user, className, ...restProps }) => {
  return (
    <div
      className={clsx("flex items-center gap-4", className)}
      {...restProps}
    >
      <div
        className={clsx(
          "w-14 h-14 flex text-xl border rounded-full items-center justify-center min-w-fit font-semibold",
          !user
            ? "bg-white border-gold-light text-gold-light"
            : "bg-slate-100 text-slate-500 border-slate-100"
        )}
      >
        {!user ? "D" : "G"}
      </div>
      <div className="truncate ...">
        {user && (
          <div className="text-slate-400 text-xs">Logged in as:</div>
        )}
        {!user ? (
          <>
            <div className="">Daniel Dimitrov</div>
            <div>ddimitrov1108@gmail.com</div>
          </>
        ) : (
          <div className="">Guest</div>
        )}
      </div>
    </div>
  );
};
export default AccountDetails;
