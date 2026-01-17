import React, { Suspense } from 'react';
import Title from '../../../../../components/shared/title';
import TestimonialsCarousel from './testimonials-carousel';
import TestimonialsContent from './testimonials-content';
import TestimonialsContentSkeleton from '../../../../../components/skeleton/testimonials/testimonials-content.skeleton';
import { useTranslations } from 'next-intl';

export default function Testimonials() {
    // translation
    const t = useTranslations("testimonials");

    return (
        <section className='flex flex-col gap-10 -mx-20'>
            {/* //TODO: Using Title Component that done by Sarah */}
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
