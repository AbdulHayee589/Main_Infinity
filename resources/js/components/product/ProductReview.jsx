import { HiHandThumbUp, HiUser } from "react-icons/hi2";
import StarRating from "../StarRating";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

const ProductReview = ({ review, className }) => {
  const { t } = useTranslation();
  
  return (
    <div className={clsx("grid gap-4 py-8", className)}>
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center gap-3">
          <div className="text-2xl rounded-full border border-slate-200 p-3">
            <HiUser className="text-slate-500" />
          </div>

          <div className="grid">
            <span className="font-bold max-w-[150px] xxs:max-w-[200px] xs:max-w-[300px] truncate ...">
              asdadassd
            </span>
            <StarRating
              rating={review.star_rating}
              className="text-lg"
            />
          </div>
        </div>

        <span className="text-sm text-slate-500 min-w-fit">3h ago</span>
      </div>

      <p className="text-black">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum
        dignissimos ea, est quas et a consectetur eius labore cumque
        distinctio!
      </p>

      {review.isApproved && (
        <div className="max-w-fit p-1.5 border border-slate-200 bg-slate-50 rounded-md flex items-center gap-2">
          <div className="text-xl text-gold-main">
            <HiHandThumbUp />
          </div>
          <span className="text-sm text-slate-500">{t('productDetailsPage.reviews.approved')}</span>
        </div>
      )}
    </div>
  );
};
export default ProductReview;
