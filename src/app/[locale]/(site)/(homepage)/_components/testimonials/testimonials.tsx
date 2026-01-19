import React, { Suspense } from 'react';
import Title from '@/components/shared/title';
import TestimonialsCarousel from './testimonials-carousel';
import TestimonialsContent from './testimonials-content';
import TestimonialsContentSkeleton from '@/components/skeletons/testimonials/testimonials-content.skeleton';
import { useTranslations } from 'next-intl';

export default function Testimonials() {
    // translation
    const t = useTranslations("testimonials");

    return (
        <section className='flex flex-col gap-10 -mx-20 my-36'>
            {/* Title */}
            <Title title={t("title")} heading={t("heading")} />

            {/* Carousel */}
            <TestimonialsCarousel>
                <Suspense fallback={<TestimonialsContentSkeleton />}>
                    <TestimonialsContent />
                </Suspense>
            </TestimonialsCarousel>
        </section>
    )
}
