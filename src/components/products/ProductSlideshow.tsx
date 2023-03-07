import { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { Navigation, Pagination } from 'swiper'
import Image from 'next/image'

interface Props {
  images: string[]
}

export const ProductSlideshow: FC<Props> = ({ images }) => {
  return (
    <Swiper navigation={true} pagination={{ clickable: true }} modules={[Navigation, Pagination]}>
      {images.map((image) => (
        <SwiperSlide key={image}>
          <div style={{ position: 'relative', width: '100%', height: 'auto', aspectRatio: '1 / 1' }}>
            <Image src={`/products/${image}`} alt={image} fill sizes="(max-width: 600px) 100vh, 66vw" priority />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
