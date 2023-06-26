import { LazyLoadImage } from "react-lazy-load-image-component";
import Button from "../ui/Button";
import NavLink from "../ui/NavLink";
import {
  paymentMethods,
  socials,
  stockServices,
  userServices,
  websiteRoadmap,
} from "../../statics";

export default function FooterNavigation() {
  return (
    <footer className="container bg-white px-4 lg:px-8">
      <div className="grid space-y-12 pt-8 pb-16">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {stockServices.map(({ id, title, description, img }) => (
            <div
              key={id}
              className="col-span-1 flex items-start gap-4"
            >
              <LazyLoadImage
                key={id}
                src={`/${img}`}
                width="64px"
                height="64px"
                className="min-w-fit min-h-fit max-w-[48px] max-h-[48px] lg:max-w-[64px] lg:max-h-[64px]"
                alt={img}
              />
              <div className="grid gap-2">
                <h4 className="font-semibold">{title}</h4>
                <p className="text-gray-500 text-sm">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-200 min-h-[2px] w-full rounded-full"></div>

        <div className="w-full grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="grid gap-4 col-span-1 md:pl-16 lg:pl-0">
            <div className="grid gap-2">
              <h4 className="font-semibold">
                Subscribe to InfinityCustoms!
              </h4>
              <p className="text-sm text-gray-500 max-w-[300px]">
                Register your email to get updates about
                promotions and attractive offers from us
              </p>
            </div>

            <Button size="sm" className="h-fit">
              Subscribe
            </Button>
          </div>
          <div className="grid gap-2 col-span-1 md:pl-16 lg:pl-0 xl:pl-20">
            <h4 className="font-semibold">InfinityCustoms</h4>
            <div className="grid gap-1">
              {websiteRoadmap.map(({ id, title, href }) => (
                <NavLink
                  key={id}
                  href={href}
                  size="sm"
                  title={title}
                  className="text-gray-500"
                >
                  {title}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="grid gap-2 col-span-1 md:pl-16 lg:pl-0 xl:pl-20">
            <h4 className="font-semibold">Services</h4>
            <div className="grid gap-1">
              {userServices.map(({ id, title, href }) => (
                <NavLink
                  key={id}
                  href={href}
                  size="sm"
                  title={title}
                  className="text-gray-500"
                >
                  {title}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="grid gap-6 w-full col-span-1 md:pl-16 lg:pl-0 xl:pl-20">
            <div className="grid gap-2">
              <h4 className="font-semibold h-fit">Follow us</h4>
              <div className="flex flex-wrap gap-1">
                {socials.map(({ id, title, href, icon }) => (
                  <a
                    key={id}
                    href={href}
                    title={title}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 text-gray-500 hover:text-gold-main"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <h4 className="font-semibold h-fit">
                Payment methods
              </h4>
              <div className="flex flex-wrap gap-2">
                {paymentMethods.map(({ id, img }) => (
                  <LazyLoadImage
                    key={id}
                    src={`/${img}`}
                    className="w-8 h-8"
                    width="32px"
                    height="32px"
                    alt={img}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-4 w-full">
        <p className="text-gray-500 text-xs md:text-sm">
          &copy; 2023 InfinityCustoms. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
