import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaTiktok,
  FaTwitter,
} from "react-icons/fa";
import Button from "../ui/Button";
import NavLink from "../ui/NavLink";
import { v4 as uuidv4 } from "uuid";

const socials = [
  {
    id: uuidv4(),
    name: "Facebook",
    href: "https://www.facebook.com/",
    icon: <FaFacebookF />,
  },
  {
    id: uuidv4(),
    name: "Instagram",
    href: "https://www.instagram.com/",
    icon: <FaInstagram />,
  },
  {
    id: uuidv4(),
    name: "Twitter",
    href: "https://twitter.com/home",
    icon: <FaTwitter />,
  },
  {
    id: uuidv4(),
    name: "TikTok",
    href: "https://www.tiktok.com/",
    icon: <FaTiktok />,
  },
  {
    id: uuidv4(),
    name: "Pinterest",
    href: "https://www.pinterest.com/",
    icon: <FaPinterestP />,
  },
];

const stockServices = [
  {
    id: uuidv4(),
    name: "Absolutely Guaranteed",
    description:
      "We stand by everything we sell. So if you’re not satisfied, we’ll make it right.",
    img: "money-back.webp",
  },
  {
    id: uuidv4(),
    name: "Trusted Delivery",
    description:
      "We ensure reliable delivery of your orders by utilizing professional carriers and careful packaging to ensure that your products arrive in excellent condition and on time.",
    img: "delivery.webp",
  },
  {
    id: uuidv4(),
    name: "Customer Help Center",
    description:
      "Our customer help center is dedicated to providing exceptional support to our valued customers. Our knowledgeable and friendly team is ready to assist you with any inquiries or concerns you may have, ensuring a seamless shopping experience.",
    img: "online-chat.webp",
  },
  {
    id: uuidv4(),
    name: "Easy Design",
    description:
      "Our online tools make the process as simple and clear as possible, and we’re working to improve your experience all the time.",
    img: "idea.webp",
  },
];

const navLinks = [
  { id: uuidv4(), name: "Home", href: "/" },
  { id: uuidv4(), name: "Most Popular", href: "/" },
  { id: uuidv4(), name: "Profile", href: "/" },
  { id: uuidv4(), name: "Terms and Conditions", href: "/" },
  { id: uuidv4(), name: "FAQ", href: "/" },
];

const userServices = [
  { id: uuidv4(), name: "How to order", href: "/" },
  { id: uuidv4(), name: "Payment method", href: "/" },
  { id: uuidv4(), name: "Shipping information", href: "/" },
  { id: uuidv4(), name: "Track orders", href: "/" },
  { id: uuidv4(), name: "Order cancellation", href: "/" },
];

const paymentMethods = [
  { id: uuidv4(), img: "paymethods/mastercard.svg" },
  { id: uuidv4(), img: "paymethods/paypal.svg" },
  { id: uuidv4(), img: "paymethods/maestrocard.svg" },
  { id: uuidv4(), img: "paymethods/paysafecard.svg" },
  { id: uuidv4(), img: "paymethods/stripe.svg" },
  { id: uuidv4(), img: "paymethods/applecard.svg" },
];

export default function FooterNavigation() {
  return (
    <footer className="container bg-white px-4 lg:px-8">
      <div className="grid space-y-12 pt-8 pb-16">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {stockServices.map(({ id, name, description, img }) => (
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
                <h4 className="font-semibold">{name}</h4>
                <p className="text-gray-500 text-sm">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-200 min-h-[2px] w-full rounded-full"></div>

        <div className="w-full grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="grid gap-4 col-span-1">
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
          <div className="grid gap-2 col-span-1 xl:pl-20">
            <h4 className="font-semibold">InfinityCustoms</h4>
            <div className="grid gap-1">
              {navLinks.map(({ id, name, href }) => (
                <NavLink key={id} href={href} size="small">
                  {name}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="grid gap-2 col-span-1 xl:pl-20">
            <h4 className="font-semibold">Services</h4>
            <div className="grid gap-1">
              {userServices.map(({ id, name, href }) => (
                <NavLink key={id} href={href} size="small">
                  {name}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="grid gap-6 w-full col-span-1 xl:pl-20">
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
                    width="32"
                    height="32"
                    alt={img}
                  />
                ))}
              </div>
            </div>
            <div className="grid gap-2">
            <h4 className="font-semibold h-fit">
                Follow us
              </h4>
            <div className="flex flex-wrap gap-2">
              {socials.map(({ id, name, href, icon }) => (
                <a
                  key={id}
                  href={href}
                  title={name}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg text-lg text-gray-500 hover:text-gold-light transition-all duration-300"
                >
                  {icon}
                </a>
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
