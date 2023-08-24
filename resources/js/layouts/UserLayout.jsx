import { Link, usePage } from "@inertiajs/react";
import Container from "../components/ui/Container";
import { v4 as uuidv4 } from "uuid";
import clsx from "clsx";

const links = [
  {
    id: uuidv4(),
    href: "/",
    name: "Account Details",
    description: "View and edit your account information",
  },
  {
    id: uuidv4(),
    href: "/change-password",
    name: "Change Password",
    description: "Change your password",
  },
  {
    id: uuidv4(),
    href: "/purchase-history",
    name: "Purchase History",
    description: "Check your purchase history",
  },
  {
    id: uuidv4(),
    href: "/referal-links",
    name: "Referal Links",
    description: "Check your Referal links",
  },
  {
    id: uuidv4(),
    href: "/shipping-addresses",
    name: "Shipping Addresses",
    description: "View and manage your shipping addresses",
  },
];

const UserLayout = ({ children }) => {
  const { url } = usePage();
  const { props } = usePage();
  console.log(props);
  return (
    <Container className="py-12 grid gap-y-4 lg:gap-x-4 grid-cols-1 lg:grid-cols-3">
      <div className="h-fit flex flex-row gap-2 lg:gap-0 min-w-full overflow-auto lg:grid col-span-1 lg:border lg:border-slate-200 rounded-md">
        <div className="hidden px-4 py-6 lg:grid gap-1 border-b border-b-slate-200">
          <h1 className="font-semibold text-2xl">Account</h1>
          <p className="text-slate-500 text-sm">
            View and edit your account information.
          </p>
        </div>

        {links.map(({ id, href, name, description }) => (
          <Link
            key={id}
            href={`/user${href}`}
            className={clsx("py-1 px-2 lg:p-4 grid transition-all lg:hover:bg-slate-100",
            url.endsWith(href) && "border-b-2 border-b-gold-main lg:border-none lg:bg-slate-100")}
          >
            <h1 className="font-semibold w-full whitespace-nowrap">{name}</h1>
            <p className="hidden lg:block text-slate-500 text-sm">{description}</p>
          </Link>
        ))}
      </div>

      <div className="col-span-2 border border-red-500">{children}</div>
    </Container>
  );
};
export default UserLayout;
