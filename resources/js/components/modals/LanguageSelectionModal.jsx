import { langs } from "../../statics";
import Modal from "../ui/Modal";
import { changeLanguage } from "i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";

const LanguageSelectionModal = ({ open, setOpen }) => {
  const changeLanguageHandler = (lng) => {
    localStorage.setItem("selected-lng", lng);
    changeLanguage(lng);
    setOpen(false);
  };

  return (
    <Modal open={open} setOpen={setOpen} className="max-w-4xl">
      <h1 className="mb-6 text-center text-xl sm:text-2xl md:text-3xl font-semibold">
        Select your language preference
      </h1>

      <div className="max-h-[400px] overflow-auto grid gap-x-4 gap-y-2 items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {langs.map(({ id, name, prefix, src }) => (
          <button
            key={id}
            className="p-4 flex items-center gap-3  transition-all rounded-md bg-slate-50 hover:bg-slate-100"
            onClick={() => changeLanguageHandler(prefix)}
          >
            <LazyLoadImage
              src={`https://hatscripts.github.io/circle-flags/flags/${src}.svg`}
              width="24"
              alt={src}
            />
            <span className="max-w-[200px] truncate ...">{name}</span>
          </button>
        ))}
      </div>
    </Modal>
  );
};
export default LanguageSelectionModal;
