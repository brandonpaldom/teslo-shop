import Image from 'next/image'
import { FC } from 'react'
import { Autoplay, Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'

interface Props {
  images: string[]
}

export const ProductSlideshow: FC<Props> = ({ images }) => {
  return (
    <Swiper
      navigation={true}
      pagination={{ clickable: true }}
      modules={[Autoplay, Navigation, Pagination]}
      autoplay={{ delay: 5000, disableOnInteraction: true }}
    >
      {images.map((image) => (
        <SwiperSlide key={image}>
          <div style={{ position: 'relative', width: '100%', height: 'auto', aspectRatio: '1 / 1' }}>
            <Image src={image} alt={image} fill sizes="(max-width: 600px) 100vh, 66vw" priority />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
