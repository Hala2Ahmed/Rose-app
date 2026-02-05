import React from 'react';
import { getTestimonialsService } from '../../_services/testimonial.service';
import Content from './carousel-content';

export default async function TestimonialsContent() {
    // services
    const data = await getTestimonialsService();
console.log("datadata",data)
    return (
        <Content items={data.testimonials} />
    )
}