import { Link } from "@inertiajs/react";

const ProductInformation = ({ product = null }) => {
  const cleanDescription = product?.description
    .substring(product.description.indexOf(".:"))
    .replace(/<[^>]*>/g, "")
    .split(".:")
    .filter((el) => el != "");

  return (
    <div className="w-full grid gap-4">
      <div>
        <span className="text-slate-400 text-sm">t-shirt</span>
        <h1 className="text-2xl md:text-3xl font-semibold">
          {product?.title}
        </h1>
        <Link href="/" className="hover:text-gold-main">
          {product?.brand} {product?.model}
        </Link>
      </div>

      <div className="grid">
        {cleanDescription.map((el) => (
          <div key={el} className="flex gap-2">
            <span className="h-full">&#x2022;</span>
            <span>{el}</span>
          </div>
        ))}
      </div>

      <Link href="#description" className="text-slate-500" only={[]}>
        Read more
      </Link>
    </div>
  );
};
export default ProductInformation;
