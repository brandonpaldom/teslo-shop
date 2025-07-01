'use client';

import type { Swiper as SwiperObject } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import './swiper.css';
import { useState } from 'react';
import {
  Autoplay,
  FreeMode,
  Navigation,
  Pagination,
  Thumbs,
} from 'swiper/modules';
import ImagePlaceholder from '../ui/image-placeholder';

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export default function ProductSlideshow({ images, title, className }: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  return (
    <div className={className}>
      <Swiper
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="mySwiper2"
        modules={[Autoplay, FreeMode, Navigation, Pagination, Thumbs]}
        navigation={true}
        pagination={{ clickable: true }}
        spaceBetween={10}
        style={
          {
            '--swiper-navigation-color': '#4869D9',
            '--swiper-pagination-color': '#4869D9',
          } as React.CSSProperties
        }
        thumbs={{ swiper: thumbsSwiper }}
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <ImagePlaceholder
              alt={title}
              height={1080}
              src={image}
              width={1080}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        className="mySwiper"
        freeMode={true}
        modules={[FreeMode, Navigation, Thumbs]}
        onSwiper={setThumbsSwiper}
        slidesPerView={5}
        spaceBetween={10}
        watchSlidesProgress={true}
      >
        {images.map((image) => (
          <SwiperSlide key={`thumb-${image}`}>
            <ImagePlaceholder
              alt={title}
              height={1080}
              src={image}
              width={1080}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
