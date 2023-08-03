import { Link } from "@inertiajs/react";

const details = [
  "100% Airlume combed and ringspun cotton (fiber content may vary for different colors)",
  "Light fabric (4.2 oz/yd² (142 g/m²))",
  "Retail fit",
  "Tear away label",
  "Runs true to size",
];

const ProductInformation = ({ blueprint = null }) => {
  return (
    <div className="grid gap-4">
      <div>
        <span className="text-gray-400 text-sm">t-shirt</span>
        <h1 className="text-2xl md:text-3xl font-semibold">
          {blueprint?.title}
        </h1>
      </div>

      <Link href="/" className="hover:text-gold-main">
        {blueprint?.brand} {blueprint?.model}
      </Link>

      <div className="grid">
        {details.map((detail) => (
          <div key={detail} className="flex gap-2">
            <span className="h-full">&#x2022;</span>
            <span>{detail}</span>
          </div>
        ))}
      </div>

      <Link href="/" className="text-slate-500">
        Read more
      </Link>
    </div>
  );
};
export default ProductInformation;
