import { useEffect, useRef, useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";
import { register } from "swiper/element/bundle";
import "swiper/css";
import clsx from "clsx";

const params = {
  centeredSlides: false,
  slidesPerGroupSkip: 1,
  grabCursor: true,
  keyboard: {
    enabled: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    640: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
    992: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
  },
  spaceBetween: 16,
  loop: false,
};

const ImagesDisplayContainer = ({ images, className, ...restProps }) => {
  const swiperRef = useRef(null);
  const [activeImg, setActiveImg] = useState(images[0]);
  const onClickHandler = (img) => setActiveImg(img);

  useEffect(() => {
    register();
    Object.assign(swiperRef.current, params);
    swiperRef.current.initialize();
  }, []);

  return (
    <>
      <div className="lg:hidden w-full">
        <swiper-container
          ref={swiperRef}
          className="mySwiper"
          pagination="true"
          pagination-clickable="true"
        >
          {images.map((img) => (
            <swiper-slide key={img}>
              <img
                src={img}
                width={440}
                height={440}
                alt={img}
                className=""
              />
            </swiper-slide>
          ))}
        </swiper-container>
      </div>
      <div
        className={clsx(
          "hidden lg:flex gap-8 max-h-[440px]",
          className
        )}
        {...restProps}
      >
        <div className="grid-cols-1 flex flex-col gap-2">
          <div className="flex items-center justify-center text-lg text-gray-400">
            <HiChevronUp />
          </div>

          <div className="h-full max-h-[440px] overflow-auto overflow-x-hidden">
            <div className="flex flex-col gap-2 w-[72px]">
              {images.map((img) => (
                <img
                  key={img}
                  onClick={() => onClickHandler(img)}
                  src={img}
                  width={440}
                  height={440}
                  alt={img}
                  className={clsx(
                    "cursor-pointer",
                    activeImg === img &&
                    "border-2 border-gold-main"
                  )}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center text-lg text-gray-400">
            <HiChevronDown />
          </div>
        </div>

        <img
          src={activeImg}
          width={440}
          height={440}
          alt={activeImg}
          className="max-h-[440px] max-w-[440px] object-cover"
        />
      </div>
    </>
  );
};
export default ImagesDisplayContainer;
