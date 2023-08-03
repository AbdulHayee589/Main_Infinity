import { BsStarFill, BsStarHalf } from "react-icons/bs";

export default function ProductRating({ rating = 0.0 }) {

  // const rt = ((Math.random() * (5.0 - 0 + 1)) + 0).toFixed(1);

  const starsMap = rating < 0.5 ? (
    Array.from({ length: 5 }, (_, index) => index).map((index) => <BsStarFill key={index} className="text-slate-200" />)
  ) : (
    Array.from({ length: (rating >= 0.5 && rating < 1 ? 1 : rating) }, (_, index) => index).map((index) => <BsStarFill key={index} className="text-gold-light" />)
  )

  return (
    <div className="flex items-center">
      {starsMap}
      {rating > 0.0 && parseInt(rating.toString().split('.')[1].charAt(0), 10) >= 5 && <BsStarHalf className="text-gold-light"/>}
      {rating}
    </div>
  )
}