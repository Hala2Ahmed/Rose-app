'use client'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper } from 'swiper/react';
import { useState, useRef } from 'react';
import OccasionCard from './occasion-card';
import { SwiperSlide } from 'swiper/react';
import ControlSlider from './control-slider';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { occasionsSliderData } from '@/lib/constants/homepage.constant';

const OccasionsSlider = () => {
  // states
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const swiperRef = useRef<any>(null);

  return (
    <div className="relative">
      {/* slider */}
      <Swiper
        loop
        speed={1200}
        slidesPerView={1}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: '.swiper-next',
          prevEl: '.swiper-prev',
        }}
        pagination={{
          clickable: true,
          el: '.swiper-pagination-custom',
        }}
        modules={[Navigation, Pagination, Autoplay]}
        className="w-full rounded-md overflow-hidden"
      >
        {/* slider items */}
        {occasionsSliderData.map((occasion, index) => (
          <SwiperSlide key={index}>
            {/* slider item */}
            <OccasionCard occasion={occasion} height={440} >
              {/* button */}
              <button className='bg-maroon-50 rounded-md p-2 text-maroon-600 mt-2'>I'm buying!</button>
            </OccasionCard>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* control slider */}
      <ControlSlider activeIndex={activeIndex} swiper={swiperRef.current} />
    </div>
  );
};

export default OccasionsSlider;





