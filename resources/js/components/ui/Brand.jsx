import { Link } from "@inertiajs/react";

export default function Brand({ className, ...restProps }) {
  return (
    <div className={className} {...restProps}>
      <Link href="/" className="max-w-[32px]">
        <img
          src="/logo/infinitycustoms.webp"
          width={32}
          height={32}
          alt="menulogo.webp"
        />
      </Link>
    </div>
  );
}
