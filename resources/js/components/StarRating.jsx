import { BsStarFill, BsStarHalf } from "react-icons/bs";
import clsx from "clsx";

const StarRating = ({
  rating = 0.0,
  count = 0,
  showLabel = false,
  className
}) => {
  const starsMap =
    rating < 0.5
      ? Array.from({ length: 5 }, (_, index) => index).map((index) => (
        <BsStarFill key={index} className="text-slate-200" />
      ))
      : Array.from(
        { length: rating >= 0.5 && rating < 1 ? 1 : rating },
        (_, index) => index
      ).map((index) => (
        <BsStarFill key={index} className="text-gold-light" />
      ));

  return (
    <div className={clsx("flex items-center gap-2")}>
      <div className={clsx("flex items-center", className)}>
        {starsMap}
        {rating % 1 != 0 && <BsStarHalf className="text-gold-light" />}
      </div>

      {showLabel && (
        <div className="text-slate-400">
          {rating > 0 ? rating.toFixed(2) : rating} &#x2022; Total{" "}
          {count}
        </div>
      )}
    </div>
  );
};
export default StarRating;
