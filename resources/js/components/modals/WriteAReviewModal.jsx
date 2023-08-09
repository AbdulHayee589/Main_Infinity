import Modal from "../ui/Modal";
import WriteAReviewForm from "../forms/WriteAReviewForm";
import { useTranslation } from "react-i18next";

const WriteAReviewModal = ({ open, setOpen }) => {
  const { t } = useTranslation();
  
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title=""
      className="max-w-3xl lg:max-w-5xl"
      bodyClassName="px-2 md:px-8 md:py-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-y-4 gap-x-6">
        <div className="col-span-1">
          <h1 className="text-2xl md:text-3xl font-semibold">
            {t("modals.writeAReview.title")}
          </h1>
          <WriteAReviewForm
            closeOnSubmit={() => setOpen(false)}
          />
        </div>

        <div className="grid gap-4 col-span-1 border border-slate-200 rounded-md p-4 sm:p-6">
          <h1 className="text-xl font-semibold">
            {t("modals.writeAReview.info.title")}
          </h1>
          <p>{t("modals.writeAReview.info.description")}</p>
          {t("modals.writeAReview.info.steps", {
            returnObjects: true,
          }).map((text, index) => (
            <div key={index} className="flex gap-4 items-start">
              <span className="text-gold-dark font-semibold">
                {index + 1}
              </span>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
export default WriteAReviewModal;
