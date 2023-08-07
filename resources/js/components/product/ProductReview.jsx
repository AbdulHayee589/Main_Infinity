import { HiHandThumbUp, HiUser } from "react-icons/hi2";
import StarRating from "../StarRating";

const ProductReview = ({ review }) => {
  return (
    <div className="grid gap-4 py-8 border-b last:border-b-0 border-slate-100">
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center gap-3">
          <div className="text-2xl rounded-full border border-slate-200 p-3">
            <HiUser className="text-slate-300" />
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

        <span className="text-sm text-slate-400 min-w-fit">3h ago</span>
      </div>

      <p className="text-black/80">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum
        dignissimos ea, est quas et a consectetur eius labore cumque
        distinctio!
      </p>

      {review.isApproved && (
        <div className="max-w-fit p-1.5 border border-slate-200 bg-slate-50 rounded-sm flex items-center gap-2">
          <div className="text-xl text-gold-main">
            <HiHandThumbUp />
          </div>
          <span className="text-sm text-slate-500">Approved</span>
        </div>
      )}
    </div>
  );
};
export default ProductReview;
