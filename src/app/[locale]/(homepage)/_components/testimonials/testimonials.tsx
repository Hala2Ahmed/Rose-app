import React from 'react';
import Title from '../../../../../components/shared/title';
import { getTestimonialsService } from '../../services/testimonial.service';
import TestimonialsCarousel from './testimonial-carousel';
import { getTranslations } from 'next-intl/server';

const Testimonials = async () => {
    const data = await getTestimonialsService();
    const t = await getTranslations("testimonials");


    return (
        <section className='flex flex-col gap-10 -mx-20'>
            {/* //TODO: Using Title Component that done by Sarah */}
            {/* Title */}
            <Title title={t("title")} heading={t("heading")} />

            {/* Carousel */}
            <TestimonialsCarousel items={data.testimonials} />
        </section>
    )
}

export default Testimonials;
