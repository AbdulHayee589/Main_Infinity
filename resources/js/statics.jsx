import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaTiktok,
  FaTwitter,
} from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

export const headerNavLinks = [
  {
    id: uuidv4(),
    title: "How it works?",
    type: "link",
    href: "/how-it-works",
  },
  {
    id: uuidv4(),
    title: "Men",
    type: "category",
    links: [
      { id: uuidv4(), title: "T-Shirt", href: "/" },
      { id: uuidv4(), title: "Hoodies", href: "/" },
      { id: uuidv4(), title: "Sweatshirts", href: "/" },
      { id: uuidv4(), title: "Long Sleeves", href: "/" },
      { id: uuidv4(), title: "Tank Top", href: "/" },
      { id: uuidv4(), title: "Sports Wear", href: "/" },
      { id: uuidv4(), title: "Bottoms", href: "/" },
      { id: uuidv4(), title: "Swimwear", href: "/" },
      { id: uuidv4(), title: "Shoes", href: "/" },
    ],
  },
  {
    id: uuidv4(),
    title: "Women",
    type: "category",
    links: [
      { id: uuidv4(), title: "T-Shirt", href: "/sign-in" },
      { id: uuidv4(), title: "Hoodies", href: "/how-it-works" },
      { id: uuidv4(), title: "Sweatshirts", href: "/" },
      { id: uuidv4(), title: "Long Sleeves", href: "/" },
      { id: uuidv4(), title: "Tank Top", href: "/" },
      {
        id: uuidv4(),
        title: "Skirts & dresses",
        href: "/",
      },
      { id: uuidv4(), title: "Sports Wear", href: "/" },
      { id: uuidv4(), title: "Bottoms", href: "/" },
      { id: uuidv4(), title: "Swimwear", href: "/" },
      { id: uuidv4(), title: "Shoes", href: "/" },
    ],
  },
  {
    id: uuidv4(),
    title: "Kids",
    type: "category",
    links: [
      { id: uuidv4(), title: "T-Shirt", href: "/" },
      { id: uuidv4(), title: "Sweatshirts", href: "/" },
      { id: uuidv4(), title: "Long Sleeves", href: "/" },
      { id: uuidv4(), title: "Baby clothing", href: "/" },
      { id: uuidv4(), title: "Sports Wear", href: "/" },
      { id: uuidv4(), title: "Bottoms", href: "/" },
      { id: uuidv4(), title: "Others", href: "/" },
    ],
  },
  {
    id: uuidv4(),
    title: "Accessories",
    type: "category",
    links: [
      { id: uuidv4(), title: "Face Masks", href: "/" },
      { id: uuidv4(), title: "Phone cases", href: "/" },
      { id: uuidv4(), title: "Bags", href: "/" },
      { id: uuidv4(), title: "Socks", href: "/" },
      { id: uuidv4(), title: "Underwear", href: "/" },
      { id: uuidv4(), title: "Hats", href: "/" },
      { id: uuidv4(), title: "Baby Accessories", href: "/" },
      { id: uuidv4(), title: "Mouse Pads", href: "/" },
      { id: uuidv4(), title: "Pets", href: "/" },
      { id: uuidv4(), title: "Kitchen Accessories", href: "/" },
      { id: uuidv4(), title: "Cat Accessories", href: "/" },
      { id: uuidv4(), title: "Tech Accessories", href: "/" },
      { id: uuidv4(), title: "Travel", href: "/" },
      { id: uuidv4(), title: "Stationery", href: "/" },
      { id: uuidv4(), title: "Others", href: "/" },
    ],
  },
  {
    id: uuidv4(),
    title: "Home & Living",
    type: "category",
    links: [
      { id: uuidv4(), title: "Face Masks", href: "/" },
      { id: uuidv4(), title: "Phone cases", href: "/" },
      { id: uuidv4(), title: "Bags", href: "/" },
      { id: uuidv4(), title: "Socks", href: "/" },
      { id: uuidv4(), title: "Underwear", href: "/" },
      { id: uuidv4(), title: "Hats", href: "/" },
      { id: uuidv4(), title: "Baby Accessories", href: "/" },
      { id: uuidv4(), title: "Mouse Pads", href: "/" },
      { id: uuidv4(), title: "Pets", href: "/" },
      { id: uuidv4(), title: "Kitchen Accessories", href: "/" },
      { id: uuidv4(), title: "Cat Accessories", href: "/" },
      { id: uuidv4(), title: "Tech Accessories", href: "/" },
      { id: uuidv4(), title: "Travel", href: "/" },
      { id: uuidv4(), title: "Stationery", href: "/" },
      { id: uuidv4(), title: "Others", href: "/" },
    ],
  },
  {
    id: uuidv4(),
    title: "More",
    type: "category",
    links: [
      { id: uuidv4(), title: "Anime", href: "/" },
      { id: uuidv4(), title: "Movies & TV Series", href: "/" },
      { id: uuidv4(), title: "Cartoons", href: "/" },
      { id: uuidv4(), title: "Sports", href: "/" },
      { id: uuidv4(), title: "Video Games", href: "/" },
      { id: uuidv4(), title: "Gym", href: "/" },
    ],
  },
];

export const socials = [
  {
    id: uuidv4(),
    title: "Facebook",
    href: "https://www.facebook.com/",
    icon: <FaFacebookF />,
  },
  {
    id: uuidv4(),
    title: "Instagram",
    href: "https://www.instagram.com/",
    icon: <FaInstagram />,
  },
  {
    id: uuidv4(),
    title: "Twitter",
    href: "https://twitter.com/home",
    icon: <FaTwitter />,
  },
  {
    id: uuidv4(),
    title: "TikTok",
    href: "https://www.tiktok.com/",
    icon: <FaTiktok />,
  },
  {
    id: uuidv4(),
    title: "Pinterest",
    href: "https://www.pinterest.com/",
    icon: <FaPinterestP />,
  },
];

export const stockServices = [
  {
    id: uuidv4(),
    title: "Absolutely Guaranteed",
    description:
      "We stand by everything we sell. So if you’re not satisfied, we’ll make it right.",
    img: "money-back.webp",
  },
  {
    id: uuidv4(),
    title: "Trusted Delivery",
    description:
      "We ensure reliable delivery of your orders by utilizing professional carriers and careful packaging to ensure that your products arrive in excellent condition and on time.",
    img: "delivery.webp",
  },
  {
    id: uuidv4(),
    title: "Customer Help Center",
    description:
      "Our customer help center is dedicated to providing exceptional support to our valued customers. Our knowledgeable and friendly team is ready to assist you with any inquiries or concerns you may have, ensuring a seamless shopping experience.",
    img: "online-chat.webp",
  },
  {
    id: uuidv4(),
    title: "Easy Design",
    description:
      "Our online tools make the process as simple and clear as possible, and we’re working to improve your experience all the time.",
    img: "idea.webp",
  },
];

export const websiteRoadmap = [
  { id: uuidv4(), title: "Home", href: "/" },
  { id: uuidv4(), title: "Most Popular", href: "/" },
  { id: uuidv4(), title: "Profile", href: "/" },
  {
    id: uuidv4(),
    title: "Terms and Conditions",
    href: "/policy/terms-and-conditions",
  },
  { id: uuidv4(), title: "FAQ", href: "/" },
];

export const userServices = [
  { id: uuidv4(), title: "How to order", href: "/" },
  { id: uuidv4(), title: "Payment method", href: "/" },
  { id: uuidv4(), title: "Shipping information", href: "/" },
  { id: uuidv4(), title: "Track orders", href: "/" },
  { id: uuidv4(), title: "Order cancellation", href: "/" },
];

export const paymentMethods = [
  { id: uuidv4(), title: "MasterCard", img: "paymethods/mastercard.svg" },
  { id: uuidv4(), title: "PayPal", img: "paymethods/paypal.svg" },
  { id: uuidv4(), title: "MaestroCard", img: "paymethods/maestrocard.svg" },
  { id: uuidv4(), title: "PaySafeCard", img: "paymethods/paysafecard.svg" },
  { id: uuidv4(), title: "Stripe", img: "paymethods/stripe.svg" },
  { id: uuidv4(), title: "AppleCard", img: "paymethods/applecard.svg" },
];
