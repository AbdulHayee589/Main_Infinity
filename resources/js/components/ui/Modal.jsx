import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { HiXMark } from "react-icons/hi2";
import HeaderText from "./HeaderText";
import clsx from "clsx";

const Modal = ({
  open,
  setOpen,
  closeBtn = true,
  title = "",
  className,
  bodyClassName,
  children,
}) => {
  const modalCloseBtnClickHandler = () => {
    setOpen(false);
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        open={open}
        onClose={() => { }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={clsx(
                  "w-full p-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-sm",
                  className
                )}
              >
                <Dialog.Title
                  as="div"
                  className="flex justify-between"
                >
                  <h1 className="text-2xl font-semibold">{title}</h1>
                  {closeBtn && (
                    <button
                      tabIndex={0}
                      onClick={modalCloseBtnClickHandler}
                      className="outline-none text-2xl text-slate-400 hover:text-gold-main transition-all"
                    >
                      <HiXMark />
                    </button>
                  )}
                </Dialog.Title>
                <div className={clsx("mt-1", bodyClassName)}>
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default Modal;
