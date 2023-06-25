import { useEffect, useState } from "react";
import clsx from "clsx";
import { headerNavLinks, testLinks } from "../../statics";
import { Link } from "@inertiajs/inertia-react";

export default function HeaderNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollDir, setScrollDir] = useState("scroll-up");
  const [yValue, setYValue] = useState(window.scrollY);

  const toggleMobileMenu = () => setIsOpen(!isOpen);
  const closeMobileMenu = () => setIsOpen(false);

  useEffect(() => {
    const threshold = 0;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }

      setScrollDir(scrollY > lastScrollY ? "scroll-down" : "scroll-up");
      setYValue(scrollY);
      setIsOpen(false);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDir]);

  return (
    <header className="bg-white shadow transition-all px-4">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/" className="max-w-[32px]">
            <img
              src="/menulogo.webp"
              width={32}
              height={32}
              alt="menulogo.webp"
            />
          </Link>
        </div>

        <div className="flex items-center">
          {headerNavLinks.map(({ id, name, links }) => (
            <div key={id} className="group p-4 cursor-pointer">
              <div className="group-hover:text-gold-main">{name}</div>
              <div className="shadow-lg hidden group-hover:flex absolute top-12 bg-white">
                <div className="container grid gap-4 p-4">
                  {links.map(n => (
                    <Link className="hover:text-gold-dark">
                      {n}
                    </Link>
                  ))}

                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
        <Link href="/sign-in">Sign In</Link>
          <Link href="/sign-up">Sign Up</Link>
        </div>
      </div>
    </header>
  );
}
