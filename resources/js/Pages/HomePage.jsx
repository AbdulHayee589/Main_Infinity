import { useEffect, useRef } from "react";
import Container from "../components/ui/Container";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { register } from "swiper/element/bundle";
import "swiper/css";
import { HiOutlineShoppingBag, HiChevronRight, HiMiniChatBubbleLeftEllipsis } from "react-icons/hi2";
import { Link } from "@inertiajs/react";

const HomePage = () => {
  return (
    <>
      <div className="grid items-center w-full h-screen landing-page-gr">
        <Container className="py-12 grid gap-6 font-semibold">
          <h1 className="text-white text-8xl leading-tight">
            We print custom
            <br />
            Tshirt & More
          </h1>

          <p className="text-white">
            We guaranteethe highest quality of shirts and printing
            for you needs
          </p>

          <div className="flex items-center gap-10">
            <Link
              href="/shop/products"
              className="flex items-center gap-4 px-8 py-4 border border-gold-main bg-gold-main rounded-full shadow-lg"
            >
              Get Started
              <HiOutlineShoppingBag className="text-2xl" />
            </Link>

            <Link
              href="/shop/products"
              className="flex items-center gap-2 text-gold-main"
            >
              Contact Us
              <HiChevronRight className="text-xl" />
            </Link>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        <div className="grid gap-6 mb-6">
          <h1 className="text-2xl font-semibold">Recommended Products</h1>
          asdad
        </div>

        <div className="grid gap-6 mb-6">
          <h1 className="text-2xl font-semibold">Currently On-Sale</h1>
          asdad
        </div>
      </Container>
    </>
  );
};
export default HomePage;
