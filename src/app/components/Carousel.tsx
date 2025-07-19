'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { motion } from 'motion/react';

interface CarouselProps {
    items: any[];
    component: (data: T, index: number) => React.ReactNode;
}

export default function Carousel<T>({ items, component }: CarouselProps<T>) {
  return (
    <Swiper
    navigation={true}
    spaceBetween={20}
    modules={[Navigation]}
    breakpoints={{
      320: {
        slidesPerView: 1,
      },
      640: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 5,
      },
    }}
  >
    {items.map((item: any) => (
      <SwiperSlide key={item.id}>
        <motion.div
          whileHover={{
            scale: 0.9,
            transition: { duration: 1 },
          }}
          key={item.id}
        >
          {component(item, item.id)}
        </motion.div>
      </SwiperSlide>
    ))}
  </Swiper>
  )
}
