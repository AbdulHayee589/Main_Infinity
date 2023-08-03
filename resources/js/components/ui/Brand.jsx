import { Link } from "@inertiajs/react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Brand = ({ className, ...restProps }) => {
  return (
    <div className={className} {...restProps}>
      <Link href="/" className="max-w-[32px]">
        <LazyLoadImage
          src="/logo/infinitycustoms.webp"
          width={32}
          height={32}
          alt="menulogo.webp"
          effect="blur"
        />
      </Link>
    </div>
  );
};
export default Brand;
