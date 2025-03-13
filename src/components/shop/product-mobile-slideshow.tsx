"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./swiper-mobile.css";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import ImagePlaceholder from "../ui/image-placeholder";

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export default function ProductMobileSlideshow({
  images,
  title,
  className,
}: Props) {
  return (
    <div className={className}>
      <Swiper
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={false}
        modules={[Autoplay, FreeMode, Navigation, Pagination]}
        className="mySwiper2"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <ImagePlaceholder
              src={image}
              alt={title}
              width={1080}
              height={1080}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
