import { HiHandThumbUp, HiUser } from "react-icons/hi2";
import StarRating from "../StarRating";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import timeAgo from "../../utils/timeAgo";

const ProductRating = ({ rating, className }) => {
  const { t } = useTranslation();
  console.log(rating);

  return (
    <div className={clsx("grid gap-4 py-8", className)}>
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center gap-3">
          <div className="text-2xl rounded-full border border-slate-200 p-3">
            <HiUser className="text-slate-500" />
          </div>

          <div className="grid">
            <span className="font-semibold max-w-[150px] xxs:max-w-[200px] xs:max-w-[300px] truncate ...">
              {rating.user}
            </span>
            <StarRating
              rating={rating.star_rating}
              className="text-lg"
            />
          </div>
        </div>

        <span className="text-sm text-slate-500 min-w-fit">{timeAgo(rating.created_at)} ago</span>
      </div>

      <p className="text-black">
        {rating.message}
      </p>

      {!!rating.isApproved && (
        <div className="max-w-fit p-1.5 border border-slate-200 bg-slate-100 rounded-md flex items-center gap-2">
          <div className="text-xl text-gold-main">
            <HiHandThumbUp />
          </div>
          <span className="text-sm text-slate-500">{t('productDetailsPage.ratings.approved')}</span>
        </div>
      )}
    </div>
  );
};
export default ProductRating;
