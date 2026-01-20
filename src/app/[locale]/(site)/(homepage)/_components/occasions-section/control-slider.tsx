'use client';

import Swiper from 'swiper';
import { cn } from '@/lib/utils/tailwind-merge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { occasionsSliderData } from '@/lib/constants/homepage.constant';

function ControlSlider({ activeIndex, swiper }: { activeIndex: number | null, swiper?: Swiper }) {
    // verify first and last item
    const firstItem = activeIndex === 0;
    const lastItem = activeIndex === occasionsSliderData.length - 1;

    // styles
    const styleBtn = "size-8 flex items-center justify-center"
    const styleBtnDisabled = "opacity-50 cursor-not-allowed ";

    return (
        <div className="absolute inset-0 z-10 ">
            {/* controls container */}
            <div className="absolute top-0 p-6 right-0 flex flex-col h-full justify-between items-end gap-4 pointer-events-auto">
                {/* pagination dots */}
                <div className="swiper-pagination-custom flex gap-1" />
                {/* arrows */}
                <div className="bg-maroon-50 h-9 w-[4.6rem] flex items-center justify-between rounded-full text-maroon-600 py-1">
                    {/* left arrow */}
                    <button
                        onClick={() => swiper?.slidePrev()}
                        disabled={firstItem || !swiper}
                        className={cn("swiper-prev", firstItem || !swiper ? styleBtnDisabled : styleBtn)}
                    >
                        <ChevronLeft />
                    </button>
                    {/* right arrow */}
                    <button
                        onClick={() => swiper?.slideNext()}
                        disabled={lastItem || !swiper}
                        className={cn("swiper-next", lastItem || !swiper ? styleBtnDisabled : styleBtn)}
                    >
                        <ChevronRight />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ControlSlider;


