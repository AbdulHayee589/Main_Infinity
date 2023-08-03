import { useState } from "react";
import { Switch } from "@headlessui/react";
import { HiMoon, HiSun } from "react-icons/hi2";
import clsx from "clsx";

const Toggle = ({
  className,
  label,
  onToggleOn = () => { },
  onToggleOff = () => { },
  ...restProps
}) => {
  const [enabled, setEnabled] = useState(false);

  const onChangeHandler = () => {
    !enabled ? onToggleOn() : onToggleOff();
    setEnabled(!enabled);
  };

  return (
    <Switch
      checked={enabled}
      onChange={onChangeHandler}
      className={clsx(
        enabled ? "bg-gold-main" : "bg-slate-200",
        "w-12 relative inline-flex h-6 items-center rounded-full"
      )}
      {...restProps}
    >
      <span
        className={clsx(
          enabled ? "translate-x-6" : "-translate-x-2",
          "text-xl grid items-center p-1.5 transform rounded-full bg-white transition border border-slate-200"
        )}
      >
        {!enabled ? <HiSun /> : <HiMoon /> }
      </span>
    </Switch>
  );
};
export default Toggle;
