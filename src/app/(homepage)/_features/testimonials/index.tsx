import React from 'react';
import { getTestimonialsService } from './services/testimonial.service';
import TestimonialsCarousel from './_components/testimonial-carousel';
import Title from '../../../../components/shared/title';

const Index = async () => {
    const data = await getTestimonialsService();

    return (
        <section className='w-full flex flex-col gap-10'>
            {/* Title */}
            <Title title='Testimonials' heading='Real Words from Happy Customers'/>

            {/* Carousel */}
            <TestimonialsCarousel items={data.testimonials} />
        </section>
    )
}

export default Index;
