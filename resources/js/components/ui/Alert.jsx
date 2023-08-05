import {
  FiInfo,
  FiAlertOctagon,
  FiAlertTriangle,
  FiCheckCircle,
} from "react-icons/fi";
import clsx from "clsx";

const variants = {
  info: {
    className:
      "bg-white border-primary-light/40 border-l-primary-main text-primary-main",
    icon: <FiInfo />,
  },
  success: {
    className:
      "bg-success-light/20 border-success-light/40 border-l-success-main text-success-main",
    icon: <FiCheckCircle />,
  },
  error: {
    className:
      "bg-error-light/20 border-error-light/40 border-l-error-main text-error-main",
    icon: <FiAlertOctagon />,
  },
  warning: {
    className:
      "bg-warning-light/20 border-warning-light/40 border-l-warning-main text-warning-main",
    icon: <FiAlertTriangle />,
  },
};

const Alert = ({ variant = "info", children, ...restProps }) => {
  const pickedVariant = variants[variant];

  return (
    <div
      className={clsx(
        "flex gap-2 mb-4 items-center px-4 py-2 border-l-4 rounded-lg font-semibold",
        pickedVariant.className
      )}
      {...restProps}
    >
      <div className="text-2xl">{pickedVariant.icon}</div>

      <span className="text-sm">{children}</span>
    </div>
  );
};
export default Alert;
