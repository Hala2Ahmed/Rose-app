import React from 'react';
import { getTestimonialsService } from './services/testimonial.service';
import TestimonialsCarousel from './_components/testimonial-carousel';
import Title from '../../../../../components/shared/title';

const Testimonial = async () => {
    const data = await getTestimonialsService();

    return (
        <section className='flex flex-col gap-10 -mx-20'>
            {/* //TODO: Using Title Component that done by Sarah */}
            {/* Title */}
            <Title title='Testimonials' heading='Real Words from Happy Customers' />

            {/* Carousel */}
            <TestimonialsCarousel items={data.testimonials} />
        </section>
    )
}

export default Testimonial;
